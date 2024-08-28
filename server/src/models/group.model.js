import connectionPool from "../lib/connection.js";

const GroupModel = () => {
  console.log(4, "[Group] Model");

  const getById = async (id) => {
    console.log(4.1, "[Database] Model getById");

    const client = await connectionPool.connect();

    const result = await client.query(
      "SELECT g.*, (select count(*) from USERGROUP where groupid = g.id) as participants FROM GROUPS g WHERE g.id = $1",
      [id]
    );

    client.release();

    return result.rows[0];
  };

  const getAll = async () => {
    console.log(4.1, "[Database] Model getAll");

    const client = await connectionPool.connect();

    const result = await client.query(
      "SELECT * FROM GROUPS order by createdat desc"
    );

    client.release();

    return result.rows;
  };

  const findByName = async (value) => {
    console.log(4.1, "[Database] Model findWhere");

    const client = await connectionPool.connect();

    const result = await client.query(
      "SELECT COUNT(*) FROM GROUPS WHERE NAME = $1",
      [value]
    );

    client.release();

    return result.rows[0].count > 0;
  };

  const create = async (entity) => {
    console.log(4.1, "[Database] Model create");

    const client = await connectionPool.connect();

    try {
      const result = await client.query(
        "INSERT INTO GROUPS (owneruserid, name, color, createdAt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
        [entity.owneruserid, entity.name, entity.color]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error en la creación del grupo:", error);
      throw error;
    } finally {
      client.release();
    }
  };

  const update = async (id, entity) => {
    console.log(4.1, "[Database] Model update");

    let client;
    try {
      client = await connectionPool.connect();

      const result = await client.query(
        "UPDATE GROUPS set name = $1, color = $2 WHERE id = $3 RETURNING *",
        [entity.name, entity.color, id]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error updating group:", error);
      throw new Error("Failed to update group.");
    } finally {
      if (client) {
        client.release();
      }
    }
  };

  const del = async (id) => {
    console.log(4.1, "[Database] Model delete");

    const client = await connectionPool.connect();

    const result = await client.query("DELETE FROM GROUPS WHERE id = $1", [id]);

    client.release();

    return result.rowCount >= 1;
  };

  const getGroupsOwnerId = async (id) => {
    console.log("Model ", id);
    let client;
    try {
      client = await connectionPool.connect();
      const result = await client.query(
        "SELECT * FROM groups WHERE owneruserid = $1",
        [id]
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("Error obteniendo los datos de Grupos por ownerId");
    } finally {
      if (client) {
        client.release();
      }
    }
  };

  return {
    getById,
    getAll,
    create,
    delete: del,
    update,
    findByName,
    getGroupsOwnerId,
  };
};

export { GroupModel };
