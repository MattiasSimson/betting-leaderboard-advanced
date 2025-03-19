import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('bet', (table) => {
        table.uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('customer_id').references('id').inTable('customer');
        table.integer('stake').notNullable();
        table.decimal('odds').notNullable();
        table.text('status').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('bet');
}

