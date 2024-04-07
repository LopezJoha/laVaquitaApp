import { GroupService } from "../services/group.services.js";

const GroupController = () => {
  const groupService = GroupService();

  const getGroups = (req, res) => {
    console.info("GetGroups");
    const groups = groupService.getGroups();
    return res.status(200).json({
      groups,
    });
  };

  const getGroupById = (req, res) => {
    console.info(req.params.id);
    const group = groupService.getGroupById(req.params.id);
    if (!group) {
      return res
        .status(404)
        .json({ message: `Group with id ${req.params.id} does not exist` });
    } else {
      return res.status(200).json({
        group,
      });
    }
  };

  const createGroup = (req, res) => {
    const newGroup = groupService.createGroup(req.body.name, req.body.bgGround);
    return res.status(201).json(newGroup);
  };

  /*
  const updateGroup = (req, res) => {
    res.send("Actualizando Grupo");
  };

  const deleteGroup = (req, res) => {
    res.send("Eliminando Grupo");
  };*/
  return {
    getGroups,
    getGroupById,
    createGroup
  };
};

export { GroupController };
