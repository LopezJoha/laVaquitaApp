import db from "../dataBase/database.js";

export const getGroups = (req, res) => {
  console.info(req.query);
  // Asegúrate de que la función map devuelva un objeto para cada grupo
  const groups = db.map((group) => {
    console.info(group.name, group.bgColour);
    // Devuelve un objeto con las propiedades que deseas incluir en el JSON
    return {
      name: group.name,
      bgColour: group.bgColour,
      debt: group.debt,
      valor: group.valor,
      amigos: group.amigos,
      textDebt: group.textDebt,
    };
  });
  // Utiliza res.json para enviar los datos en formato JSON
  return res.json(groups);
};

export const getGroup = (req, res) => {
  console.info(req.params);
  const id = req.params.id;
  const foundGroup = db.find((group) => group.id === id);
  if (foundGroup) {
    res.status(200).json(foundGroup);
  } else {
    res.status(404).json({ message: "Group not found" });
  }
};

export const createGroup = (req, res) => {
  const group = req.body;
  const groupName = req.body.name;
  const groupBg = req.body.bgColour;
  const groupExists = db.some((group) => group.name === groupName);
  if (groupExists) {
    res.status(409);
    return console.info("El nombre de grupo ya ha sido usado");
  } else {
    db.push({
      name: groupName,
      bg: groupBg,
    });
    res.status(201).json(group);
  }
};

export const updateGroup = (req, res) => {
  res.send("Actualizando Grupo");
};

export const deleteGroup = (req, res) => {
  res.send("Eliminando Grupo");
};
