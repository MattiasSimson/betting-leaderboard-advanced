import type { LeaderboardCustomer } from "./types";

export async function fetchCustomers(): Promise<LeaderboardCustomer[]> {
    try {
        const customers = await fetch('http://localhost:3000/customers', { method: 'GET' })
        return customers.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function fetchByCountry(country: string): Promise<LeaderboardCustomer[]> {
    try {
        const customers = await fetch(`http://localhost:3000/customers/country/${country}`);
        return customers.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}