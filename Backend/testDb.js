const pool = require("./db/db");

async function test() {
  try {
    const result = await pool.query(
      "SELECT * FROM users"
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  }
}

test();