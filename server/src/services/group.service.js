import { GroupModel } from "../models/group.model.js";
import { UserGroupModel } from "../models/user-group.model.js";
import ConflictException from "../exceptions/ConflictException.js";
import NotFoundException from "../exceptions/NotFoundException.js";

const GroupService = () => {
  console.log(3, "[Group] Service");

  const groupModel = GroupModel();
  const userGroupModel = UserGroupModel();

  const getById = (id) => {
    console.log(3.1, "[Group] Service Get By Id");

    return groupModel.getById(id);
  };

  const getAll = () => {
    console.log(3.1, "[Group] Service Get All");

    return groupModel.getAll();
  };

  const create = async (newGroup) => {
    console.log(3.1, "[Group] Service Create");

    const groupFound = await groupModel.findByName(newGroup.name);

    if (groupFound) {
      throw new ConflictException("The group already exists");
    }

    const groupCreated = await groupModel.create(newGroup);
    console.log(groupCreated);

    if (groupCreated) {
      console.log("Ingreso para crear el grupo en userGroupModel");
      await userGroupModel.create({
        groupId: groupCreated.id,
        userId: groupCreated.owneruserid,
      });
      console.log("Despues de crear el userGroup, revisar");
    }

    return groupCreated;
  };

  const editById = async (id, group) => {
    console.log(3.1, "[Group] Service Edit");

    const existingGroup = await getById(id);

    if (!existingGroup) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    return groupModel.update(id, group);
  };

  const removeById = async (id) => {
    console.log(3.1, "[Group] Service Remove");

    const existingGroup = await getById(id);

    if (!existingGroup) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    const count = await userGroupModel.countByGroup(id);

    if (count > 1) {
      throw new ConflictException(`Group with id ${id} has friends linked`);
    }

    await userGroupModel.delByGroupAndUser(id, existingGroup.owneruserid);

    return groupModel.delete(id);
  };

  const getGroupsOwnerId = async (id) => {
    console.log(3.2, "[getgroupsByOwnerId] Service ");
    console.log("El ID del propietario recibido es:", id);
    const result = await groupModel.getGroupsOwnerId(id);
    console.log("Linea 84: ", result);
    return result;
  };

  return {
    getAll,
    getById,
    create,
    editById,
    removeById,
    getGroupsOwnerId,
  };
};

export { GroupService };
