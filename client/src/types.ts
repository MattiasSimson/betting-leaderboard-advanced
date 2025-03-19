export type CustomerCountry = 'Estonia' | 'Finland' | 'Norway' | 'Chile' | 'Canada';

export interface DatabaseCustomer {
    id: string;
    first_name: string;
    last_name: string;
    country: CustomerCountry;
    created_at: Date;
    updated_at: Date;
}

// type check for the leaderboard
export interface LeaderboardCustomer {
    id: string;
    name: string;
    country: string;
    totalBets: number;
    winPercentage: number;
    profit: number;
}