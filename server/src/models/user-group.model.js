import connectionPool from '../lib/connection.js';

const UserGroupModel = () => {
  console.log(4, '[User Group] Model');

  const getById = async (id) => {
    console.log(4.1, '[Database] Model getById');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT * FROM USERGROUP WHERE id = $1', [id]);

    client.release();

    return result.rows[0];
  };

  const getAllByGroupId = async (groupId) => {
    console.log(4.1, '[Database] Model getAllByGroupId');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT * FROM USERGROUP WHERE groupid = $1', [groupId]);

    client.release();

    return result.rows;
  };

  const getAvailableUsersByGroupId = async (groupId) => {
    console.log(4.1, '[Database] Model getAvailableUsersByGroupId');

    const client = await connectionPool.connect();

    const result = await client.query(
      `select u.id, u.name, u.email from USERS u where id not in (select userid from USERGROUP where groupid = $1)`,
      [groupId]
    );

    client.release();

    return result.rows;
  };

  const countByGroup = async (groupId) => {
    console.log(4.1, '[Database] Model count by group');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT COUNT(*) FROM USERGROUP WHERE groupid = $1', [
      groupId,
    ]);

    client.release();

    return result.rows[0].count;
  };

  const create = async (entity) => {
    console.log(4.1, '[Database] Model create');

    const client = await connectionPool.connect();

    const result = await client.query(
      'INSERT INTO USERGROUP (userid, groupid) VALUES ($1, $2) RETURNING *',
      [entity.userId, entity.groupId]
    );

    client.release();

    return result.rows[0];
  };

  const del = async (id) => {
    console.log(4.1, '[Database] Model delete');

    const client = await connectionPool.connect();

    const result = await client.query('DELETE FROM USERGROUP WHERE id = $1', [id]);

    client.release();

    return result.rowCount >= 1;
  };

  const delByGroupAndUser = async (groupId, userId) => {
    console.log(4.1, '[Database] Model delete');

    const client = await connectionPool.connect();

    const result = await client.query('DELETE FROM USERGROUP WHERE groupid = $1 and userid = $2', [
      groupId,
      userId,
    ]);

    client.release();

    return result.rowCount >= 1;
  };

  return {
    getAllByGroupId,
    getAvailableUsersByGroupId,
    getById,
    countByGroup,
    create,
    delete: del,
    delByGroupAndUser,
  };
};

export { UserGroupModel };
