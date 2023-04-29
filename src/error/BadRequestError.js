const strings = require('../shared/Constants')

class BadRequestError {
    constructor(message = strings.error) { 
        message
    }
}

module.exports = {
    BadRequestError
}