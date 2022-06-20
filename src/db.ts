import { Pool, Client } from 'pg'

const connectionString = 'postgresql://postgres:root@127.0.0.1:5432/node-jwt-auth'
const pool = new Pool({
  connectionString,
})

export default pool