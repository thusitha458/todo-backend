module.exports = {
    INTERNAL: {statusCode: 500, payload: {errorCode: 1000, message: 'Internal server error'}},
    VALIDATION_ERROR: {statusCode: 400, payload: {errorCode: 1001, message: 'Validation error'}},

    // todos
    TODO_NOT_FOUND: {statusCode: 404, payload: {errorCode: 2000, message: 'Todo not found'}},
};
