import { StatusCodes } from "http-status-codes";

function NotFoundException(message) {
  const error = new Error(message);
  error.statusCode = StatusCodes.NOT_FOUND;
  return error;
}

export default NotFoundException;
