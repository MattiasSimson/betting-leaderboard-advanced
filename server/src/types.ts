type CustomerCountry = 'Estonia' | 'Finland' | 'Norway' | 'Chile' | 'Canada';

export interface DatabaseCustomer {
    id: string;
    first_name: string;
    last_name: string;
    country: CustomerCountry;
    created_at: Date;
    updated_at: Date;
}

type BetStatus = 'PENDING' | 'LOST' | 'WON';

export interface DatabaseBet {
    id: string;
    customer_id: string;
    stake: number;
    odds: number;
    status: BetStatus;
    created_at: Date;
    updated_at: Date;
}