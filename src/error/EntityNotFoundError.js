import BadRequestError from "./BadRequestError";

export default class EntityNotFoundError extends BadRequestError {
    constructor(message = 'Entity not found') {
        super(message)
    }
}