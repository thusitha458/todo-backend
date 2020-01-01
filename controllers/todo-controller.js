const todoService = require('../services/todo-service');
const errorConfig = require('../config/error-config');
const errorGenerator = require('../utilities/error-generator');

module.exports.getTodos = async (req, res, next) => {
    try {
        let state = req.query.state;
        let matchingTodos = state ? await todoService.findTodosByState(state) : await todoService.getAllTodos();
        res.json({todos: matchingTodos});
    } catch (error) {
        next(error);
    }
};

module.exports.findMatchingTodosCount = async (req, res, next) => {
    try {
        let state = req.query.state;
        let count = await todoService.findTodosCount(state) || 0;
        res.json({count: count});
    } catch (error) {
        next(error);
    }
};

module.exports.findTodoById = async (req, res, next) => {
    try {
        let todo = await todoService.findTodoById(req.params.id);
        if (!todo) {
            throw errorGenerator.generateError(errorConfig.TODO_NOT_FOUND);
        }
        res.json(todo);
    } catch (error) {
        next(error);
    }
};

module.exports.addTodo = async (req, res, next) => {
    try {
        const description = req.body.description;
        let todo = await todoService.addTodo(description);
        res.json(todo);
    } catch (error) {
        next(error);
    }
};

module.exports.updateMatchingTodos = async (req, res, next) => {
    try {
        const queryState = req.query.state;
        const updateDescription = req.body.description;
        const updateState = req.body.state;

        await todoService.updateMatchingTodos(queryState, updateState, updateDescription);
        res.json({});
    } catch (error) {
        next(error);
    }
};

module.exports.updateTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const description = req.body.description;
        const state = req.body.state;

        let todo = await todoService.findTodoById(id);
        if (!todo) {
            throw errorGenerator.generateError(errorConfig.TODO_NOT_FOUND);
        }
        await todoService.updateTodo(id, description, state);
        res.json({});
    } catch (error) {
        next(error);
    }
};

module.exports.deleteTodos = async (req, res, next) => {
    try {
        let state = req.query.state;

        await todoService.deleteMatchingTodos(state);
        res.json({});
    } catch (error) {
        next(error);
    }
};

module.exports.deleteTodoById = async (req, res, next) => {
    try {
        let id = req.params.id;

        let todo = await todoService.findTodoById(id);
        if (!todo) {
            throw errorGenerator.generateError(errorConfig.TODO_NOT_FOUND);
        }
        await todoService.deleteTodoById(id);
        res.json({});
    } catch (error) {
        next(error);
    }
};
