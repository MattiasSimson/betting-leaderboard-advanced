import type { CustomerCountry, LeaderboardCustomer } from "./types";

export async function fetchLeaderboard(countries?: (CustomerCountry | 'ALL')[]): Promise<LeaderboardCustomer[]> {
    try {
        let url = 'http://localhost:3001/leaderboard';
        
        // add country filter if provided and not 'ALL'
        if (countries && countries.length > 0 && !countries.includes('ALL')) {
            const countryParams = countries.map(c => `country=${encodeURIComponent(c)}`).join('&');
            url = `${url}?${countryParams}`;
        }
        
        console.log('Fetching from URL:', url);
        const response = await fetch(url, { method: 'GET' });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}