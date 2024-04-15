import db from "../dataBase/database.js";

const GroupService = () => {
  const getGroups = () => {
    return db;
  };

  const getGroupById = () => {
    const id = req.params.id;
    return db.find((group) => group.id === id);
  };

  const createGroup = (newGroup) => {
    console.info("Entro a createGroup");
    const group = newGroup.body;
    console.info(newGroup, "services");
    const groupId = newGroup.id;
    const groupExists = db.some((group) => group.id === groupId);
    if (groupExists) {
      return console.info("El nombre de grupo ya ha sido usado");
    } else {
      console.info(group, "services");
      return db.push({
        group,
      });
    }
  };

  
  return {
    getGroups,
    getGroupById,
    createGroup,
  };
};

export { GroupService };
