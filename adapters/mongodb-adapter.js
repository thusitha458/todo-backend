const mongodb = require('mongodb');
const {connectionString} = require('../config/database-config');

const mongoClient = mongodb.MongoClient;

let dbClient;

module.exports.openConnection = async () => {
    dbClient = await mongoClient.connect(connectionString);
};

// loads all matching documents into memory
module.exports.findMatchingDocuments =  (database, collection, query) => {
    return dbClient.db(database).collection(collection)
        .find(query).toArray();
};

module.exports.findMatchingCount = (database, collection, query) => {
    return dbClient.db(database).collection(collection)
        .find(query, {projection:{_id: 1}}).count();
};

module.exports.insertDocument =  (database, collection, document) => {
    return dbClient.db(database).collection(collection)
        .insertOne(document);
};

module.exports.updateManyDocuments =  (database, collection, query, update) => {
    return dbClient.db(database).collection(collection)
        .updateMany(query, update);
};

module.exports.updateDocument =  (database, collection, query, update) => {
    return dbClient.db(database).collection(collection)
        .updateOne(query, update);
};

module.exports.deleteManyDocuments =  (database, collection, query) =>{
    return dbClient.db(database).collection(collection)
        .deleteMany(query);
};
