const assert = require("assert");
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("route : /", () => {
    it("API is up", async () => {
        chai.request("http://localhost:3000")
        .get('/')
        .send()
        .end(function (err, res) {
            assert.strictEqual(res.body.status, "success");
        });
    });
});


