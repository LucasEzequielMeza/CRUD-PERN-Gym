import pgk from 'pg';
const {Pool} = pgk

export const pool = new Pool ({
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'Deeppurple2219',
    database: 'Gym-App-DB',
})

pool.on("Connect", () => {
    console.log("Connected to the PostgreSQL database");
})