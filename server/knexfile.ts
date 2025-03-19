import type { Knex } from 'knex';
import { dbConfig } from './src/db/knex';

function isMigrateMake() {
    return !!process.argv.filter(x => x === 'migrate:make').length;
}

function isSeedMake() {
    return !!process.argv.filter(x => x === 'seed:make').length;
}

if (isMigrateMake()) {
    dbConfig.migrations.directory = './src/db/migrations';
}

if (isSeedMake()) {
    dbConfig.seeds.directory = './src/db/seeds';
}


const config: { [key: string]: Knex.Config } = {
    development: dbConfig
};


module.exports = config;