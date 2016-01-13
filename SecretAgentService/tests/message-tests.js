var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

describe("Message inbox",function(){

    var user = {
        username: 'TestUser',
        password: '123456',
        email: 'test@gmail.com',
        roles: 'admin'};

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

    it('register user', registerUser());
    //it('login', loginUser());
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
            .post("/messages/send/" + user.username)
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
    it('delete user', deleteUser());
    function registerUser() {
        return function(done) {
            server
                .post('/api/users')
                .send(user)
                .expect(200)
                .expect({success:true})
                .end(function(err,res){
                    user._id = res.body._id;
                    res.status.should.equal(200);
                    done();
                });
        };
    }
    function deleteUser() {
        return function(done) {
            server
                .delete('/users/' + user._id)
                .send(user)
                .expect(202)
                .expect({success:true})
                .end(function(err,res){
                    res.status.should.equal(202);
                    done();
                });
        };
    }
});
