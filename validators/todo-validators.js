const Joi = require('joi');
const errorConfig = require('../config/error-config');
const {generateError} = require('../utilities/error-generator');
const {state: todoStates} = require('../config/todos-config');

module.exports.validateGetTodos = (req, res, next) => {
    try {
        let querySchema = Joi.object({
            state: Joi.string().valid(todoStates.ACTIVE, todoStates.COMPLETED),
        }).unknown();

        Joi.validate(req.query, querySchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateGetTodosCount = (req, res, next) => {
    try {
        let querySchema = Joi.object({
            state: Joi.string().valid(todoStates.ACTIVE, todoStates.COMPLETED),
        }).unknown();

        Joi.validate(req.query, querySchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateFindTodoById = (req, res, next) => {
    try {
        let paramsSchema = Joi.object({
            id: Joi.string().required(),
        }).unknown();

        Joi.validate(req.params, paramsSchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateAddTodo = (req, res, next) => {
    try {
        let bodySchema = Joi.object({
            description: Joi.string().required(),
        }).unknown();

        Joi.validate(req.body, bodySchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateUpdateMatchingTodos = (req, res, next) => {
    try {
        let bodySchema = Joi.object({
            state: Joi.string().valid(todoStates.ACTIVE, todoStates.COMPLETED),
            description: Joi.string(),
        }).unknown();

        let querySchema = Joi.object({
            state: Joi.string().valid(todoStates.ACTIVE, todoStates.COMPLETED),
        }).unknown();

        Joi.validate(req.body, bodySchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                Joi.validate(req.query, querySchema, error => {
                    if (error) {
                        throw generateError(errorConfig.VALIDATION_ERROR, error.message);
                    } else {
                        next();
                    }
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateUpdateTodo = (req, res, next) => {
    try {
        let paramsSchema = Joi.object({
            id: Joi.string().required(),
        }).unknown();

        let bodySchema = Joi.object({
            state: Joi.string().valid(todoStates.ACTIVE, todoStates.COMPLETED),
            description: Joi.string(),
        }).unknown();

        Joi.validate(req.body, bodySchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                Joi.validate(req.params, paramsSchema, error => {
                    if (error) {
                        throw generateError(errorConfig.VALIDATION_ERROR, error.message);
                    } else {
                        next();
                    }
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateDeleteTodos = (req, res, next) => {
    try {
        let querySchema = Joi.object({
            state: Joi.string().valid(todoStates.ACTIVE, todoStates.COMPLETED),
        }).unknown();

        Joi.validate(req.query, querySchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.validateDeleteTodoById = (req, res, next) => {
    try {
        let paramsSchema = Joi.object({
            id: Joi.string().required(),
        }).unknown();

        Joi.validate(req.params, paramsSchema, error => {
            if (error) {
                throw generateError(errorConfig.VALIDATION_ERROR, error.message);
            } else {
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};
