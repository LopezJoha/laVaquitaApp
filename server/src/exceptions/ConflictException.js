import { StatusCodes } from "http-status-codes";

class ConflictException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictException;
