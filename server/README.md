# Server

It is a Node.js backend API built with TypeScript (https://typescriptlang.org) and Express.js (https://expressjs.com) framework. It uses Knex (https://knexjs.org) to connect to database and build SQL queries. Project has already the following:
1) Configured database connection in `./src/db/knex.ts`. Default is PostgreSQL but if you prefer other SQL database, then it is allowed to change it but you would need to change the database configuration file accordingly.
2) Database migration files to create 2 tables in `./src/db/migrations` folder
3) Database seed file to create data to tables in `./src/db/seeds` folder
4) Database queries in `./src/db/queries/customer.ts`:
   - `getCustomers` to get all customers
   - `getLeaderboard` to get top 10 profitable customers with filtering options
5) Router file in `./src/router.ts` with two endpoints:
   - GET `/customers` that returns all customers
   - GET `/leaderboard` that returns top 10 profitable customers (can be filtered by country)

## Requirements to run it in your computer
* Node.js and NPM (https://nodejs.org/en/download)
* Docker (https://www.docker.com) - needed to host a local database. If you will set up local database without docker, then you don't need to install docker.

## How to get it running?
1) Set up a local PostgreSQL database (or any other SQL database you prefer). If you use docker, you can easily do it by running this docker command in your terminal:
   ```
   docker run --name leaderboard-postgres -e POSTGRES_PASSWORD=password -p 5433:5432 -d postgres
   ```
   Note: I was using port 5433 for the host machine to avoid conflicts with existing PostgreSQL installations

2) Go inside the /server folder
3) Create a `.env` file with the following content (if it doesnt already exist):
   ```
   DB_HOST=127.0.0.1
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=postgres
   DB_PORT=5433
   ```
4) `npm install` to install all the required node modules
5) `npm run build` to compile TypeScript which would generate a /dist folder
6) `npm run dev` to run it in dev mode or `npm run build && npm run start` to run it in normal mode
7) If it started successfully, you can try the following endpoints:
   - GET `http://localhost:3001/customers` - returns all customers
   - GET `http://localhost:3001/leaderboard` - returns top 10 profitable customers
   - GET `http://localhost:3001/leaderboard?country=Estonia` - returns top 10 profitable customers from Estonia
