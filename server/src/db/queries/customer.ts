import { db } from '../knex';
import { LeaderboardCustomer } from '../../types';

/**
 * 1) Gets the top 10 customers with positive profit, sorted by profit in descending order.
 * 2) Can be filtered by multiple countries.
 * 3) Additional "soft" filtering CAN be done in the UI (MUI X has built-in sorting for smaller tables)
 */

export async function getCustomers(country?: string | string[]): Promise<LeaderboardCustomer[]> {
    // query with calculations happening at database level
    let query = db('customer')
        .select(
            'customer.id',
            'customer.first_name',
            'customer.last_name',
            'customer.country',
            // count total completed bets
            // 1)
            db.raw('COUNT(CASE WHEN bet.status IN (\'WON\', \'LOST\') THEN 1 END) as total_bets'),
            // STEP 1) calculate win percentage
            // explanation: this calculates the percentage of bets that were won out of all completed bets (WON or LOST).
            // it multiplies the count of WON bets by 100 and divides by the total count of completed bets.
            db.raw(`
                ROUND(
                    COUNT(CASE WHEN bet.status = 'WON' THEN 1 END) * 100.0 /
                    NULLIF(COUNT(CASE WHEN bet.status IN ('WON', 'LOST') THEN 1 END), 0)
                ) as win_percentage`),
            // STEP 2) calculate profit 
            // explanation: this calculates the profit by summing the net wins from WON bets and subtracting the stakes of LOST bets.
            // net win for a WON bet is calculated as (stake * odds) - stake.
            db.raw(`
                SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds) - bet.stake ELSE 0 END) -
                SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END) as profit
            `)
        )
        .leftJoin('bet', 'customer.id', 'bet.customer_id')
        .groupBy('customer.id', 'customer.first_name', 'customer.last_name', 'customer.country')
        // STEP 3) filter customers with positive profit
        // explanation: this ensures only customers with a positive profit are included by checking if the calculated profit is greater than zero.
        .having(db.raw('SUM(CASE WHEN bet.status = \'WON\' THEN (bet.stake * bet.odds) - bet.stake ELSE 0 END) - ' +
                        'SUM(CASE WHEN bet.status = \'LOST\' THEN bet.stake ELSE 0 END) > 0'))
        // STEP 4) order customers by profit in descending order
        // explanation: this orders the results so that customers with the highest profit appear first.
        .orderBy('profit', 'desc')
        // STEP 5) limit the results to the top 10 customers
        // explanation: this limits the number of customers returned to the top 10 based on profit.
        .limit(10);

    // apply country filter if provided
    if (country) {
        if (Array.isArray(country)) {
            query = query.whereIn('customer.country', country);
        } else if (country !== 'ALL') {
            query = query.where('customer.country', country);
        }
    }

    // execute query
    const results = await query;

    // format results to match customer interface
    return results.map(row => ({
        id: row.id,
        name: `${row.first_name} ${row.last_name}`,
        country: row.country,
        totalBets: parseInt(row.total_bets) || 0,
        winPercentage: parseInt(row.win_percentage) || 0,
        profit: parseFloat(row.profit) || 0
    }));
}
