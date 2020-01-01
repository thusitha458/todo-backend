const mongodbAdapter = require('../adapters/mongodb-adapter');
const todosConfig = require('../config/todos-config');
const {
    databases: {
        virtualCapital: {
            name: database,
            collections: {todos: todosCollection},
        },
    },
} = require('../config/database-config');
const randomUtils = require('../utilities/random-utils');

const generateId = async () => await randomUtils.getRandomHexString(todosConfig.ID_LENGTH);

module.exports.getAllTodos = async () => {
    return await mongodbAdapter.findMatchingDocuments(database, todosCollection, {});
};

module.exports.findTodosByState = async state => {
    return await mongodbAdapter.findMatchingDocuments(database, todosCollection, {state: state});
};

module.exports.findTodosCount = async state => {
    let query = state ? {state: state} : {};
    return await mongodbAdapter.findMatchingCount(database, todosCollection, query);
};

module.exports.findTodoById = async id => {
    let todosArray = await mongodbAdapter.findMatchingDocuments(database, todosCollection, {_id: id});
    return todosArray && todosArray.length > 0 ? todosArray[0] : undefined;
};

module.exports.addTodo = async description => {
    let newTodo = {
        _id: await generateId(),
        description: description,
        state: todosConfig.state.ACTIVE,
    };
    await mongodbAdapter.insertDocument(database, todosCollection, newTodo);
    return newTodo;
};

module.exports.updateMatchingTodos = async (queryState, updateState, updateDescription) => {
    let query = queryState ? {state: queryState} : {};

    let setUpdate = {};
    if (updateDescription !== undefined) {
        setUpdate = {...setUpdate, description: updateDescription};
    }
    if (updateState) {
        setUpdate = {...setUpdate, state: updateState};
    }
    await mongodbAdapter.updateManyDocuments(database, todosCollection, query, {$set: setUpdate});
};

module.exports.updateTodo = async (id, description, state) => {
    let setUpdate = {};
    if (description !== undefined) {
        setUpdate = {...setUpdate, description: description};
    }
    if (state) {
        setUpdate = {...setUpdate, state: state};
    }

    await mongodbAdapter.updateDocument(database, todosCollection, {_id: id}, {$set: setUpdate});
};

module.exports.deleteMatchingTodos = async state => {
    let query = state ? {state: state} : {};
    await mongodbAdapter.deleteManyDocuments(database, todosCollection, query);
};

module.exports.deleteTodoById = async id => {
    await mongodbAdapter.deleteManyDocuments(database, todosCollection, {_id: id});
};
