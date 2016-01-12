var supertest = require("supertest");
var should = require("should");
var jade = require('jade');
var server = supertest.agent("http://localhost:3000");

describe("Message inbox",function(){

    it("should return status code 403 if user is not authorized",function(done){
        server
            .get("/messages/inbox")
            .expect("Content-type",/text-html/)
            .expect(403)
            .end(function(err,res){
                res.status.should.equal(403);
                done();
            });
    });

    it('login', loginUser());
    it("should return status code 200 on inbox",function(done){
        server
            .get("/messages/inbox")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 200 on outbox",function(done){
        server
            .get("/messages/outbox")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 200 on opening the send form",function(done){
        server
            .get("/messages/send/testname")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should not allow to send a message to yourself",function(done){
        server
            .post("/messages/send/ivaylo.kenov")
            .expect(404)
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });
    });

    it("should not allow to send to an invalid user",function(done){
        server
            .post("/messages/send/invalid")
            .expect(404)
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });
    });

    it("should retun bad request with invalid message",function(done){
        server
            .post("/messages/send/JamesBond")
            .expect(400)
            .end(function(err,res){
                res.status.should.equal(400);
                done();
            });
    });

    it("should send the message",function(done){
        server
            .post("/messages/send/JamesBond")
            .send({title: 'from Mocha', content: 'Unit test'})
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    function loginUser() {
        return function(done) {
            server
                .post('/login')
                .send({ username: 'ivaylo.kenov', password: 'Ivaylo' })
                .expect(200)
                .end(function(err,res){
                    res.status.should.equal(200);
                    done();
                });
        };
    }
});
