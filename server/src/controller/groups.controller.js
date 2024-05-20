import { GroupService } from "../services/group.service.js";

const GroupController = () => {
  const groupService = GroupService();

  const getGroups = (req, res) => {
    console.info("GetGroups");
    const groups = groupService.getGroups();
    console.log(groups);
    return res.status(200).json({
      groups,
    });
  };

  const getById = async (req, res) => {
    console.log(2.1, "[Group] Controller Get By Id");

    const group = await groupService.getById(req.params.id);

    if (!group) {
      return res
        .status(404)
        .json({ message: `Group with id ${req.params.id} does not exist` });
    }

    return res.status(200).json({
      group,
    });
  };

  const createGroup = (req, res) => {
    const newGroup = groupService.createGroup(req.body);
    console.info(req.body, "controller linea 33");
    if (newGroup === null) {
      return res.status(404).json({ message: `Id ya existe` });
    } else if (newGroup === "repeated") {
      return res.status(404).json({
        message: `El nombre del grupo ya ha sido usado, por favor ingrese uno nuevo`,
      });
    } else if (newGroup === "long") {
      return res.status(404).json({ message: `Nombre demasiado largo` });
    }
    return res.status(201).json(newGroup);
  };

  const updateGroup = (req, res) => {
    console.info("Actualizando Grupo");
    
    const updated = groupService.updateGroup(req.params.id, req.body);

    if (updated) {
      return res.status(201).json(updated);
    }

    return res.status(404).json({
      message: `Group with id ${req.params.id} does not exist`,
    });
  };

  const deleteGroup = (req, res) => {
   console.info("Eliminando Grupo");

    const deleted = groupService.deleteGroup(req.params.id, req.body);

    if (deleted) {
      return res.status(201).json({ message: `Grupo Eliminado` });
    }

    return res.status(404).json({
      message: `Group with id ${req.params.id} does not exist`,
    });
  };

  return {
    getGroups,
    getById,
    createGroup,
    updateGroup,
    deleteGroup,
  };
};

export { GroupController };
