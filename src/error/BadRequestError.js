export default class BadRequestError {
    constructor(message, data) {
        super({ code: 400, message, data})
    }
}