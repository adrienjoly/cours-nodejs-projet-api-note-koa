const assert = require("assert");
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("route : /signin", () => {
    it("all ok", async () => {
        chai.request("http://localhost:3000")
            .post('/signin')
            .send({
                password: 'carrot',
                name: 'boby'
            })
            .end(function (err, res) {
                assert.strictEqual(res.status, 200);
            });
    });

    it("password less than 4", async () => {
        chai.request("http://localhost:3000")
        .post('/signin')
        .send({
            password: 'ca', 
            name: 'boby'
        })
        .end(function (err, res) {
            assert.strictEqual(res.status, 400);
            assert.strictEqual(res.body.error, "Le mot de passe doit contenir au moins 4 caractères");
        });
    });

    it("username contains uppercase", async () => {
        chai.request("http://localhost:3000")
        .post('/signin')
        .send({
            password: 'carrote', 
            name: 'boBy'
        })
        .end(function (err, res) {
            assert.strictEqual(res.status, 400);
            assert.strictEqual(res.body.error, "Votre identifiant ne doit contenir que des lettres minuscules non accentuées");
        });
    });

    it("username contains less than 2 char", async () => {
        chai.request("http://localhost:3000")
        .post('/signin')
        .send({
            password: 'carrote', 
            name: 'b'
        })
        .end(function (err, res) {
            assert.strictEqual(res.status, 400);
            assert.strictEqual(res.body.error, "Votre identifiant doit contenir entre 2 et 20 caractères");
        });
    });
    
    it("username is unknown", async () => {
        chai.request("http://localhost:3000")
        .post('/signin')
        .send({
            password: 'carrote', 
            name: 'bobbo'
        })
        .end(function (err, res) {
            console.log(res.body)
            assert.strictEqual(res.status, 403);
            assert.strictEqual(res.body.error, "Cet identifiant est inconnu");
        });
    });
});