var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");

describe("Statistic test",function(){

    it("should return OK and a json file with correct properties",function(done){
        server
            .get("/api/statistics")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.text.hasOwnProperty('missions');
                res.text.hasOwnProperty('agents');
                res.text.hasOwnProperty('commissioners');
                done();
            });
    });
});
