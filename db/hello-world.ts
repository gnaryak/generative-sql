import * as dotenv from 'dotenv';
dotenv.config();
import initKnex, { Knex } from 'knex';
import knexConfig from './knexfile';

const knex: Knex = initKnex(knexConfig);

knex
  .raw('SELECT NOW()')
  .then((res) => {
    console.log(res.rows);
    knex.destroy();
  });


// const pool = new Pool({
//   database: 'postgres'
// });
//
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(res.rows);
//   pool.end();
// });
