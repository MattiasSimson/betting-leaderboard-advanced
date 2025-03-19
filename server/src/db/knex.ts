import knex from 'knex';
import dotenv from 'dotenv';
import type { DatabaseBet, DatabaseCustomer } from '../types';

dotenv.config();

const dbConfig = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5433
    },
    migrations: {
        directory: './dist/db/migrations'
    },
    seeds: {
        directory: './dist/db/seeds'
    }
};

const db = knex(dbConfig);

// Run pending migrations on startup
(async () => {
    try {
        console.log('Checking for pending migrations...');
        await db.migrate.latest();
        console.log('Migrations completed successfully!');

        console.log('Applying seeds...');
        await db.seed.run();
        console.log('Seeds applied succesfully!');
    } catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1); // Exit the application if migrations fail
    }
})();

export { db, dbConfig };

declare module 'knex/types/tables' {
    interface Tables {
        customer: DatabaseCustomer;
        bet: DatabaseBet;
    }
}