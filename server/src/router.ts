import { Router } from 'express';
import { getCustomers } from './db/queries/customer';

export const router = Router();

router.get('/customers', async (req, res) => {
    try {
        const customers = await getCustomers();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        // Get the country from query parameters (can be an array)
        const country = req.query.country;
        
        // Convert the query parameter to the expected type
        let countryParam: string | string[] | undefined = undefined;
        
        if (country) {
            if (Array.isArray(country)) {
                // If it's already an array, convert all items to strings
                countryParam = country.map(c => String(c));
            } else {
                // If it's a single value, convert to string
                countryParam = String(country);
            }
        }
        
        // Get the leaderboard data
        const leaderboard = await getCustomers(countryParam);
        
        // Send the response
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
});
