import db from "../dataBase/database.js";

const GroupService = () => {
  const getGroups = () => {
    return db;
  };

  const getGroupById = () => {
    const id = req.params.id;
    return db.find((group) => group.id === id);
  };

  const createGroup = (req, res) => {
    const group = req.body;
    const groupName = req.body.name;
    const groupBg = req.body.bgColour;
    const groupExists = db.some((group) => group.name === groupName);
    if (groupExists) {
      res.status(409);
      return console.info("El nombre de grupo ya ha sido usado");
    } else {
      console.info(group);
      db.push({
        group,
      });
      return res.status(201).json(group);
    }
  };
  return {
    getGroups,
    getGroupById,
    createGroup,
  };
};

export { GroupService };
