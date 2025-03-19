import type { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
    // delete all existing bets
    await knex('bet').del();

    // delete all existing customers
    await knex('customer').del();

    // create all customers
    await knex('customer').insert([
        {
            id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            first_name: 'Pedro',
            last_name: 'Díaz',
            country: 'Chile',
        },
        {
            id: '9406c7a2-6188-4e94-859e-490d5433d06f',
            first_name: 'Matti',
            last_name: 'Nieminen',
            country: 'Finland',
        },
        {
            id: '323f773d-0922-469f-8082-c3d635f7375e',
            first_name: 'Petri',
            last_name: 'Korhonen',
            country: 'Finland',
        },
        {
            id: '7927218b-f1c5-468f-b533-32c367080076',
            first_name: 'Martin',
            last_name: 'Mets',
            country: 'Estonia',
        },
        {
            id: '19f0f513-90e8-469c-943b-88926c302662',
            first_name: 'Kjell',
            last_name: 'Larsen',
            country: 'Norway'
        },
        {
            id: 'f44ab30b-0c35-4f40-91f4-4260f207204b',
            first_name: 'John',
            last_name: 'Smith',
            country: 'Canada'
        },
        {
            id: '8285d82c-e8d1-4466-a087-956932455958',
            first_name: 'Juan',
            last_name: 'González',
            country: 'Chile'
        },
        {
            id: '27978787-5516-408c-a89a-876893742510',
            first_name: 'Miguel',
            last_name: 'Rojas',
            country: 'Chile'
        },
        {
            id: '989c6381-62f4-409c-874a-b348d0980721',
            first_name: 'Mika',
            last_name: 'Hämäläinen',
            country: 'Finland'
        },
        {
            id: '59831640-6c35-4982-96e9-0944b4499053',
            first_name: 'Toomas',
            last_name: 'Tamm',
            country: 'Estonia'
        },
        {
            id: '1e92694f-8a8d-4261-a602-30050954211c',
            first_name: 'José',
            last_name: 'Pérez',
            country: 'Chile'
        },
        {
            id: '90486891-1986-4890-a93c-354062532161',
            first_name: 'Per',
            last_name: 'Hansen',
            country: 'Norway'
        },
        {
            id: '5884e447-916c-49b7-8957-637651455975',
            first_name: 'Ole',
            last_name: 'Johansen',
            country: 'Norway'
        },
        {
            id: '65958627-c45f-4868-a53a-221757677460',
            first_name: 'Lars',
            last_name: 'Andersen',
            country: 'Norway'
        },
        {
            id: '9434757a-7658-439a-9874-203853160688',
            first_name: 'Timo',
            last_name: 'Virtanen',
            country: 'Finland'
        },
        {
            id: '73491870-8375-4719-a840-057262919836',
            first_name: 'Luis',
            last_name: 'Muñoz',
            country: 'Chile'
        },
        {
            id: '42361212-2887-4766-8695-774367764321',
            first_name: 'Juhani',
            last_name: 'Mäkinen',
            country: 'Finland'
        },
        {
            id: '10216099-3701-4288-b625-922389319095',
            first_name: 'Andres',
            last_name: 'Saar',
            country: 'Estonia'
        },
        {
            id: '82165555-8249-4349-8871-131342611202',
            first_name: 'Manuel',
            last_name: 'Hämäläinen',
            country: 'Finland'
        },
        {
            id: 'f9099946-9464-4598-a788-203856773275',
            first_name: 'Guillermo',
            last_name: 'Muñoz',
            country: 'Chile'
        }
    ]);

    // create all bets
    await knex('bet').insert([
    // Bets for Pedro Díaz (customer_id: a1b81167-e186-4f7a-986b-c1745632180c)
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 20,
            odds: 4.2,
            status: 'LOST'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 55,
            odds: 2.50,
            status: 'WON'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 15,
            odds: 1.80,
            status: 'PENDING'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 80,
            odds: 3.15,
            status: 'LOST'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 28,
            odds: 2.90,
            status: 'WON'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 62,
            odds: 1.55,
            status: 'PENDING'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 12,
            odds: 4.80,
            status: 'WON'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 48,
            odds: 2.10,
            status: 'WON'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 95,
            odds: 1.30,
            status: 'PENDING'
        },
        {
            customer_id: 'a1b81167-e186-4f7a-986b-c1745632180c',
            stake: 33,
            odds: 3.85,
            status: 'LOST'
        },

        // Bets for Matti Nieminen (customer_id: 9406c7a2-6188-4e94-859e-490d5433d06f)
        {
            customer_id: '9406c7a2-6188-4e94-859e-490d5433d06f',
            stake: 71,
            odds: 3.5,
            status: 'LOST'
        },
        {
            customer_id: '9406c7a2-6188-4e94-859e-490d5433d06f',
            stake: 30,
            odds: 2.20,
            status: 'WON'
        },
        {
            customer_id: '9406c7a2-6188-4e94-859e-490d5433d06f',
            stake: 18,
            odds: 4.10,
            status: 'PENDING'
        },
        {
            customer_id: '9406c7a2-6188-4e94-859e-490d5433d06f',
            stake: 45,
            odds: 1.95,
            status: 'LOST'
        },
        {
            customer_id: '9406c7a2-6188-4e94-859e-490d5433d06f',
            stake: 88,
            odds: 2.65,
            status: 'WON'
        },

        // Bets for Petri Korhonen (customer_id: 323f773d-0922-469f-8082-c3d635f7375e)
        {
            customer_id: '323f773d-0922-469f-8082-c3d635f7375e',
            stake: 10,
            odds: 5.77,
            status: 'LOST'
        },
        {
            customer_id: '323f773d-0922-469f-8082-c3d635f7375e',
            stake: 35,
            odds: 2.80,
            status: 'PENDING'
        },
        {
            customer_id: '323f773d-0922-469f-8082-c3d635f7375e',
            stake: 78,
            odds: 1.65,
            status: 'WON'
        },

        // Bets for Martin Mets (customer_id: 7927218b-f1c5-468f-b533-32c367080076)
        {
            customer_id: '7927218b-f1c5-468f-b533-32c367080076',
            stake: 50,
            odds: 3.25,
            status: 'PENDING'
        },
        {
            customer_id: '7927218b-f1c5-468f-b533-32c367080076',
            stake: 22,
            odds: 2.85,
            status: 'WON'
        },

        // Bets for Kjell Larsen (customer_id: 19f0f513-90e8-469c-943b-88926c302662)
        {
            customer_id: '19f0f513-90e8-469c-943b-88926c302662',
            stake: 85,
            odds: 2.75,
            status: 'WON'
        },
        {
            customer_id: '19f0f513-90e8-469c-943b-88926c302662',
            stake: 38,
            odds: 3.60,
            status: 'LOST'
        },
        {
            customer_id: '19f0f513-90e8-469c-943b-88926c302662',
            stake: 11,
            odds: 5.10,
            status: 'PENDING'
        },
        {
            customer_id: '19f0f513-90e8-469c-943b-88926c302662',
            stake: 66,
            odds: 2.35,
            status: 'WON'
        },

        // Bets for John Smith (customer_id: f44ab30b-0c35-4f40-91f4-4260f207204b)
        {
            customer_id: 'f44ab30b-0c35-4f40-91f4-4260f207204b',
            stake: 42,
            odds: 4.50,
            status: 'LOST'
        },
        {
            customer_id: 'f44ab30b-0c35-4f40-91f4-4260f207204b',
            stake: 91,
            odds: 1.85,
            status: 'PENDING'
        },

        // Bets for Juan González (customer_id: 8285d82c-e8d1-4466-a087-956932455958)
        {
            customer_id: '8285d82c-e8d1-4466-a087-956932455958',
            stake: 17,
            odds: 3.90,
            status: 'WON'
        },
        {
            customer_id: '8285d82c-e8d1-4466-a087-956932455958',
            stake: 73,
            odds: 2.45,
            status: 'LOST'
        },
        {
            customer_id: '8285d82c-e8d1-4466-a087-956932455958',
            stake: 58,
            odds: 1.70,
            status: 'PENDING'
        },

        // Bets for Miguel Rojas (customer_id: 27978787-5516-408c-a89a-876893742510)
        {
            customer_id: '27978787-5516-408c-a89a-876893742510',
            stake: 25,
            odds: 3.70,
            status: 'PENDING'
        },
        {
            customer_id: '27978787-5516-408c-a89a-876893742510',
            stake: 61,
            odds: 2.15,
            status: 'WON'
        },
        {
            customer_id: '27978787-5516-408c-a89a-876893742510',
            stake: 1,
            odds: 4.20,
            status: 'LOST'
        },

        // Bets for Mika Hämäläinen (customer_id: 989c6381-62f4-409c-874a-b348d0980721)
        {
            customer_id: '989c6381-62f4-409c-874a-b348d0980721',
            stake: 15,
            odds: 5.80,
            status: 'LOST'
        },
        {
            customer_id: '989c6381-62f4-409c-874a-b348d0980721',
            stake: 53,
            odds: 2.95,
            status: 'WON'
        },
        {
            customer_id: '989c6381-62f4-409c-874a-b348d0980721',
            stake: 31,
            odds: 3.30,
            status: 'WON'
        },

        // Bets for Toomas Tamm (customer_id: 59831640-6c35-4982-96e9-0944b4499053)
        {
            customer_id: '59831640-6c35-4982-96e9-0944b4499053',
            stake: 77,
            odds: 1.90,
            status: 'WON'
        },
        {
            customer_id: '59831640-6c35-4982-96e9-0944b4499053',
            stake: 29,
            odds: 4.60,
            status: 'PENDING'
        },

        // Bets for José Pérez (customer_id: 1e92694f-8a8d-4261-a602-30050954211c)
        {
            customer_id: '1e92694f-8a8d-4261-a602-30050954211c',
            stake: 48,
            odds: 2.65,
            status: 'WON'
        },
        {
            customer_id: '1e92694f-8a8d-4261-a602-30050954211c',
            stake: 19,
            odds: 4.15,
            status: 'LOST'
        },

        // Bets for Per Hansen (customer_id: 90486891-1986-4890-a93c-354062532161)
        {
            customer_id: '90486891-1986-4890-a93c-354062532161',
            stake: 92,
            odds: 3.05,
            status: 'WON'
        },
        {
            customer_id: '90486891-1986-4890-a93c-354062532161',
            stake: 63,
            odds: 1.75,
            status: 'LOST'
        },
        {
            customer_id: '90486891-1986-4890-a93c-354062532161',
            stake: 28,
            odds: 4.90,
            status: 'PENDING'
        },

        // Bets for Ole Johansen (customer_id: 5884e447-916c-49b7-8957-637651455975)
        {
            customer_id: '5884e447-916c-49b7-8957-637651455975',
            stake: 55,
            odds: 2.20,
            status: 'PENDING'
        },
        {
            customer_id: '5884e447-916c-49b7-8957-637651455975',
            stake: 12,
            odds: 3.55,
            status: 'LOST'
        },

        // Bets for Lars Andersen (customer_id: 65958627-c45f-4868-a53a-221757677460)
        {
            customer_id: '65958627-c45f-4868-a53a-221757677460',
            stake: 81,
            odds: 4.85,
            status: 'WON'
        },
        {
            customer_id: '65958627-c45f-4868-a53a-221757677460',
            stake: 39,
            odds: 2.05,
            status: 'WON'
        },

        // Bets for Timo Virtanen (customer_id: 9434757a-7658-439a-9874-203853160688)
        {
            customer_id: '9434757a-7658-439a-9874-203853160688',
            stake: 36,
            odds: 3.80,
            status: 'WON'
        },
        {
            customer_id: '9434757a-7658-439a-9874-203853160688',
            stake: 71,
            odds: 2.55,
            status: 'PENDING'
        },

        // Bets for Luis Muñoz (customer_id: 73491870-8375-4719-a840-057262919836)
        {
            customer_id: '73491870-8375-4719-a840-057262919836',
            stake: 88,
            odds: 1.60,
            status: 'LOST'
        },
        {
            customer_id: '73491870-8375-4719-a840-057262919836',
            stake: 23,
            odds: 4.35,
            status: 'WON'
        },

        // Bets for Juhani Mäkinen (customer_id: 42361212-2887-4766-8695-774367764321)
        {
            customer_id: '42361212-2887-4766-8695-774367764321',
            stake: 59,
            odds: 3.10,
            status: 'PENDING'
        },
        {
            customer_id: '42361212-2887-4766-8695-774367764321',
            stake: 41,
            odds: 2.70,
            status: 'WON'
        },

        // Bets for Andres Saar (customer_id: 10216099-3701-4288-b625-922389319095)
        {
            customer_id: '10216099-3701-4288-b625-922389319095',
            stake: 18,
            odds: 5.25,
            status: 'WON'
        },

        // Bets for Guillermo Muñoz (customer_id: f9099946-9464-4598-a788-203856773275)
        {
            customer_id: 'f9099946-9464-4598-a788-203856773275',
            stake: 95,
            odds: 4.70,
            status: 'WON'
        },
        {
            customer_id: 'f9099946-9464-4598-a788-203856773275',
            stake: 51,
            odds: 1.80,
            status: 'PENDING'
        }
    ]);
};