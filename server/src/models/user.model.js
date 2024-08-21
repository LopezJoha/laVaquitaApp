import connectionPool from "../lib/connection.js";
import bcrypt from "bcrypt";

const UserModel = () => {
  const createUser = async (user) => {

    const { name, email, password } = user;

    const client = await connectionPool.connect();

    const result = await client.query(
      "INSERT INTO users (name, email, password, createdAt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
      //ToDo createdAt
      [name, email, password]
    );

    client.release();

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

  const getByCredentials = async (email, password) => {
    const client = await connectionPool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM Users WHERE email = $1",
        [email]
      );

      const user = result.rows[0];
      if (!user) {
        return null;
      }

      const passwordSaved = user.password;
      const match = await bcrypt.compare(password, passwordSaved);

      if (match) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      return err;
    } finally {
      client.release();
    }
  };

  return {
    createUser,
    getById,
    getByEmail,
    getByCredentials,
  };
};

export { UserModel };
