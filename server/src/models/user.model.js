import connectionPool from "../lib/connection.js";
import bcrypt from "bcrypt";

const UserModel = () => {
  const createUser = async (user) => {
    console.log("Model");
    user.password = await bcrypt.hash(user.password, 10);
    const { name, email, password } = user;

    const client = await connectionPool.connect();

    const result = await client.query(
      "INSERT INTO users (name, email, password, createdAt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
      //ToDo createdAt
      [name, email, password]
    );

    client.release();
    console.log(result.rows[0]);

    return result.rows[0];
  };

  const getById = async (id) => {
    const client = await connectionPool.connect();

    const result = await client.query("SELECT * FROM Users WHERE id = $1", [
      id,
    ]);

    client.release();

    return result.rows[0];
  };

  const getByEmail = async (email) => {
    const client = await connectionPool.connect();

    const result = await client.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    client.release();
   
    return result.rows[0];
  };

  return {
    createUser,
    getById,
    getByEmail,
  };
};

export { UserModel };
