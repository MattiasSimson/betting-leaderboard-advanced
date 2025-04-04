import { db } from '../knex';

// export const getCustomers = () => db('customer').select('*');

export const getLeaderboardCustomers = (country?: string) => {
    const query = `
        SELECT 
            customer.id,
            customer.first_name,
            customer.last_name,
            customer.country,
            COUNT(CASE WHEN bet.status IN ('WON', 'LOST') THEN 1 END) AS total_bets,
            ROUND((COUNT(CASE WHEN bet.status = 'WON' THEN 1 END) * 100.0 / 
                NULLIF(COUNT(CASE WHEN bet.status IN ('WON', 'LOST') THEN 1 END), 0)), 0) AS win_percentage,
            (
                SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds) - bet.stake ELSE 0 END) - 
                SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END)
            ) AS profit
        FROM customer
        LEFT JOIN bet ON customer.id = bet.customer_id
        ${country ? 'WHERE LOWER(customer.country) = LOWER(?)' : ''}
        GROUP BY customer.id, customer.first_name, customer.last_name, customer.country
        HAVING (
            SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds) - bet.stake ELSE 0 END) - 
            SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END)
        ) > 0
        ORDER BY profit DESC
        LIMIT 10
    `;
    
    return db.raw(query, country ? [country] : []).then(result => result.rows);
};
