import * as dotenv from 'dotenv';
// Look for .env two directories up because this will transpiled into dist/db
dotenv.config({ path: "../../.env" });

export default {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  },
  pool: { min: 1, max: 10 }
};