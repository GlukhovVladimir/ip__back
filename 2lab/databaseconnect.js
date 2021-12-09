const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    port: 5432,
    database: 'hotel'
  })

  module.exports = pool;