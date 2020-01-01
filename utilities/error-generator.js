
const getPayload = module.exports.getPayload = (errorData, message) => {
    return message ? {...errorData.payload, message: message} : errorData.payload;
};

const getStatusCode = module.exports.getStatusCode = errorData => {
    return errorData.statusCode;
};

module.exports.generateError = (errorData, message) => {
    let statusCode = getStatusCode(errorData);
    let payload = getPayload(errorData, message);

    let error = new Error(message || payload.message);
    error.isCustom = true;
    error.statusCode = statusCode;
    error.payload = payload;

    return error;
};
