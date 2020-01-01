const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodbAdapter = require('./adapters/mongodb-adapter');
const todoRouter = require('./apis/todo-api');
const {getStatusCode, getPayload} = require('./utilities/error-generator');
const {INTERNAL: INTERNAL_ERROR} = require('./config/error-config');
const {PORT} = require('./config/app-config');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/v1/todos', todoRouter);

// error handler
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error.isCustom) {
        res.status(error.statusCode).json(error.payload);
    } else {
        res.status(getStatusCode(INTERNAL_ERROR)).json(getPayload(INTERNAL_ERROR));
    }
});

mongodbAdapter.openConnection().then(() => {
    app.listen(PORT);
});

module.exports = app;
