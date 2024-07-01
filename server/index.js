// index.js
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client
  .connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((err) => console.error("Error de conexión", err.stack));

// Ejemplo de consulta
client.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error ejecutando la consulta", err.stack);
  } else {
    console.log("Resultado de la consulta:", res.rows);
  }
  client.end();
});
