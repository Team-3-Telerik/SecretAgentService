var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

describe("User tests",function(){

    it("should return all agents with status code 200",function(done){
        server
            .get("/users/agents")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return all commisioners with status code 200",function(done){
        server
            .get("/users/commissioners")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 403 on get user if not admin",function(done){
        server
            .get("/api/users")
            .expect(403)
            .end(function(err,res){
                res.status.should.equal(403);
                done();
            });
    });

    var user = {
        username: 'TestUser',
        password: '123456',
        email: 'test@gmail.com',
        roles: 'admin'};

    it('should register user successfully', registerUser());

    it("should retun bad request with invalid user",function(done){
        server
            .post("/api/users")
            .send({})
            .expect(400)
            .end(function(err,res){
                res.status.should.equal(400);
                done();
            });
    });

    it("should return status code 200 on get user if admin",function(done){
        server
            .get("/api/users")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 200 on getting profile edit",function(done){
        server
            .get("/profile/edit")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 200 on getting admin panel",function(done){
        server
            .get("/admin")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 200 on getting user details",function(done){
        server
            .get("/users/details/" + user._id)
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it('should be able to delete user', deleteUser());

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
