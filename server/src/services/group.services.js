import db from "../dataBase/database.js";

const GroupService = () => {
  const getGroups = () => {
    return db;
  };

  const getByName = async (name) => {
    return db.find((group) => group.name === name);
  };

  const createGroup = (newGroup) => {
    console.info("Entro a createGroup");

    const groupId = newGroup.id;
    const groupName = newGroup.name;
    const groupExists = db.some((group) => group.id === groupId);
    const nameUsed = db.some((group) => group.name === groupName);

    if (groupExists) {
      console.info("El id de grupo ya ha sido usado", "SERVICES LINEA 21");
      return null;
    } else if (nameUsed) {
      console.info("El nombre del grupo ya ha sido usado", "SERVICES LINEA 23");
      return "repeated";
    } else if (groupName.length > 30) {
      console.info("El nombre es demasiado largo", "SERVICES LINEA 27");
      return "long";
    } else {
      JSON.stringify(newGroup);
      console.info(newGroup, "services lINEA 28 SERVICES");
      if (
        newGroup.id != undefined &&
        newGroup.name != undefined &&
        newGroup.bgColour != undefined
      ) {
        db.push({
          id: newGroup.id,
          name: newGroup.name,
          bgColour: newGroup.bgColour,
        });
        console.info(db, "LINEA 35 SERVICES");
        return newGroup;
      }
    }
  };

  const getById = (id) => {
    console.log(id);
    console.log(3.1, "[Group] Service Get By Id");

    return db.find((group) => group.id === id);
  };

  const updateGroup = (id, group) => {
    const groupIndex = db.findIndex((group) => {
      return group.id === id;
    });

    if (groupIndex >= 0) {
      db[groupIndex] = group;
      db[groupIndex].id = id;
      console.log("linea 63 ", db[groupIndex]);
      return db[groupIndex];
    }

    return false;
  };

  const deleteGroup = (id, group) => {
    const groupIndex = db.findIndex((group) => {
      return group.id === id;
    });

    if (groupIndex >= 0) {
      db.splice(groupIndex, 1);
      return true;
    }

    return false;
  };

  return {
    getGroups,
    getById,
    getByName,
    createGroup,
    updateGroup,
    deleteGroup,
  };
};

export { GroupService };
