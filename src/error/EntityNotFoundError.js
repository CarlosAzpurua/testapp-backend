const strings = require('../shared/Constants')
class EntityNotFoundError {
    constructor(message = strings.notFound) {
        message
    }
}

module.exports = {
    EntityNotFoundError
}