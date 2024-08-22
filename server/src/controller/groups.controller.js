import { GroupService } from "../services/group.service.js";
import groupsSchemaValidation from "../validations/groups.schema.validation.js";
import { StatusCodes } from "http-status-codes";

const GroupController = () => {
  console.log(2, "[Group] Controller");

  const groupService = GroupService();

  const getById = async (req, res) => {
    console.log(2.1, "[Group] Controller Get By Id");

    const group = await groupService.getById(req.params.id);

    if (!group) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Group with id ${req.params.id} does not exist` });
    }

    return res.status(StatusCodes.OK).json({
      group,
    });
  };

  const getAll = async (req, res) => {
    console.log(2.1, "[Group] Controller Get All");

    const groups = await groupService.getAll();

    return res.status(StatusCodes.OK).json({
      groups,
    });
  };

  const createGroup = async (req, res) => {
    console.log(2.1, "[Group] Controller Create");
    console.log(req.body, "linea 38 controller");

    const { error, value } = groupsSchemaValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      console.log(error);
      console.log("Mensaje linea 47 ", StatusCodes.BAD_REQUEST);
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: error.details.map((detail) => detail.message),
      });
    }

    // creating our own body only with the fields we really need (name & color only)
    // doing this we discard the rest of the fields we may receive in the body
    const sanitizedBody = {
      ...value,
      userid: req.body.userid,
      owneruserid: req.body.owneruserid,
      name: req.body.name,
      color: req.body.color,
    };

    try {
      const group = await groupService.create(sanitizedBody);
      console.log("Linea 65 ", group);
      

      if (group) {
        console.log(res.status(StatusCodes.CREATED).json({ group }));
        return res.status(StatusCodes.CREATED).json({ group });
      } else {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "An error ocurred" });
      }
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  const editById = async (req, res) => {
    console.log(2.1, "[Group] Controller Edit");

    const { error, value } = groupsSchemaValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: error.details.map((detail) => detail.message),
      });
    }

    try {
      const group = await groupService.editById(req.params.id, value);

      if (group) {
        return res.status(StatusCodes.OK).json({ group });
      } else {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "An error ocurred" });
      }
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  const removeById = async (req, res) => {
    console.log(2.1, "[Group] Controller Remove");

    try {
      const removed = await groupService.removeById(req.params.id);

      if (removed) {
        return res.status(StatusCodes.NO_CONTENT).send();
      } else {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "An error ocurred" });
      }
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  return {
    getById,
    getAll,
    createGroup,
    editById,
    removeById,
  };
};

export { GroupController };
