import { Router } from 'express';
import { getLeaderboardCustomers } from './db/queries/customer';

export const router = Router();

router.get('/customers', async (req, res) => {
    const customers = await getLeaderboardCustomers();
    res.json(customers);
});


// get by country

router.get('/customers/country/:country', async (req, res) => {
    const {country} = req.params;
    const customersByCountry = await getLeaderboardCustomers(country)
    res.json(customersByCountry);
});