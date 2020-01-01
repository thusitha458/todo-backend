module.exports = {
    connectionString: 'mongodb://localhost:27017',
    databases: {
        virtualCapital: {
            name: 'virtual-capital',
            collections: {
                todos: 'todos',
            },
        },
    },
};
