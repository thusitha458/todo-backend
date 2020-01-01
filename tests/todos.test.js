const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('todos', () => {
    describe('GET /', () => {
        it('should return a response', done => {
            chai.request(server).get('/v1/todos/')
                .end((error, response) => {
                    expect(error).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.have.property('todos');
                    expect(response.body.todos).to.be.an('array');
                    done();
                });
        });

        it('should return a response for filtered request', done => {
            chai.request(server).get('/v1/todos/')
                .query({state: 'ACTIVE'})
                .end((error, response) => {
                    expect(error).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.have.property('todos');
                    expect(response.body.todos).to.be.an('array');
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).get('/v1/todos/')
                .query({state: 'ACTIVEaa'})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('GET /count', () => {
        it('should return a response', done => {
            chai.request(server).get('/v1/todos/count')
                .end((error, response) => {
                    expect(error).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.have.property('count');
                    expect(response.body.count).to.be.an('number');
                    done();
                });
        });

        it('should return a response for filtered request', done => {
            chai.request(server).get('/v1/todos/count')
                .query({state: 'ACTIVE'})
                .end((error, response) => {
                    expect(error).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.have.property('count');
                    expect(response.body.count).to.be.an('number');
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).get('/v1/todos/count')
                .query({state: 'ACTIVEaa'})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('GET /:id', () => {
        it('should return an error', done => {
            chai.request(server).get('/v1/todos/id')
                .end((error, response) => {
                    expect(response).to.have.status(404);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('POST /', () => {
        it('should add todo', done => {
            chai.request(server).post('/v1/todos')
                .send({description: 'test todo'})
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body).to.have.property('_id');
                    expect(response.body).to.have.property('description');
                    expect(response.body).to.have.property('state');
                    expect(response.body.state).to.eq("ACTIVE");
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).post('/v1/todos')
                .send({description: null})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('PUT /', () => {
        it('should return an error', done => {
            chai.request(server).put('/v1/todos/')
                .query({state: 'ACTIVE'})
                .send({state: 'COMPLETED'})
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).put('/v1/todos/')
                .query({state: 'ACTIVEa'})
                .send({state: 'COMPLETED', description: 'test todo 2'})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).put('/v1/todos/')
                .query({state: 'ACTIVE'})
                .send({state: 'COMPLETEDa', description: 'test todo 2'})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).put('/v1/todos/')
                .query({state: 'ACTIVE'})
                .send({state: 'COMPLETED', description: null})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('PUT /:id', () => {
        it('should return an error', done => {
            chai.request(server).put('/v1/todos/id')
                .end((error, response) => {
                    expect(response).to.have.status(404);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('DELETE /', () => {
        it('should delete all active todos', done => {
            chai.request(server).delete('/v1/todos/')
                .query({state: "ACTIVE"})
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    done();
                });
        });

        it('should return an error', done => {
            chai.request(server).delete('/v1/todos/')
                .query({state: "ACTIVEaa"})
                .end((error, response) => {
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('DELETE /:id', () => {
        it('should return an error', done => {
            chai.request(server).delete('/v1/todos/id')
                .end((error, response) => {
                    expect(response).to.have.status(404);
                    expect(response.body).to.have.property('errorCode');
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });
});
