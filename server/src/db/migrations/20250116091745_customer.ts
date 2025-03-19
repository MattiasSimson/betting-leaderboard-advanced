import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('customer', (table) => {
        table.uuid('id').primary().notNullable();
        table.text('first_name').notNullable();
        table.text('last_name').notNullable();
        table.text('country').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('customer');
}
