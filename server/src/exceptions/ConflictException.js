import { StatusCodes } from "http-status-codes";

function ConflictException(message) {
  const error = new Error(message);
  error.statusCode = StatusCodes.CONFLICT;
  return error;
}

export default ConflictException;
