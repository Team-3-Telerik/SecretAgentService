var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

describe("Mission tests",function(){

    var user = {
        username: 'TestUser',
        password: '123456',
        email: 'test@gmail.com',
        roles: 'admin'};

    var mission = {
        award: 1000,
        location: 'Sofia',
        missionTarget: 'Test Target',
        targetPicture : 'http://www.gibedigital.com/media/1280/unit-test.jpg',
        postedBy: 'TestUser',
        difficult: 7,
        description: 'Some description'};

    it("should return status code 200 accessing all missions",function(done){
        server
            .get("/missions")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should not allow access to adding mission if not login",function(done){
        server
            .post("/missions/add")
            .expect(403)
            .end(function(err,res){
                res.status.should.equal(403);
                done();
            });
    });

    it('register user', registerUser());

    it("should return status code 200 on add mission screen",function(done){
        server
            .get("/missions/add")
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 201 on adding a mission",function(done){
        server
            .post('/missions/add')
            .send(mission)
            .expect(201)
            .expect({success:true})
            .end(function(err,res){
                mission._id = res.body._id;
                res.status.should.equal(201);
                done();
            });
    });

    it("should return status code 200 on getting mission details",function(done){
        server
            .get("/missions/details/" + mission._id)
            .expect("Content-type",/text-html/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return status code 202 on deleting a mission",function(done){
        server
            .delete('/missions/' + mission._id)
            .send(mission)
            .expect(202)
            .expect({success:true})
            .end(function(err,res){
                res.status.should.equal(202);
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
