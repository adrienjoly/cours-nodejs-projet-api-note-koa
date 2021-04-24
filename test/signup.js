const assert = require("assert");
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("route : /signup", () => {
    it("all ok", async () => {
        chai.request("http://localhost:3000")
            .post('/signup')
            .send({
                password: 'test',
                name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
            })
            .end(function (err, res) {
                console.log(res.body);
                assert.strictEqual(res.status, 200);
            });
    });


    it("password less than 4", async () => {
        chai.request("http://localhost:3000")
            .post('/signup')
            .send({
                password: 'ca',
                name: 'boby'
            })
            .end(function (err, res) {
                console.log(res.body)
                assert.strictEqual(res.status, 400);
                assert.strictEqual(res.body.error, "Le mot de passe doit contenir au moins 4 caractères");

            });
    });

    it("username contains uppercase", async () => {
        chai.request("http://localhost:3000")
            .post('/signup')
            .send({
                password: 'carrote',
                name: 'boBy'
            })
            .end(function (err, res) {
                console.log(res.body)
                assert.strictEqual(res.status, 400);
                assert.strictEqual(res.body.error, "Votre identifiant ne doit contenir que des lettres minuscules non accentuées");
            });
    });

    it("username less 2 and more 20", async () => {
        chai.request("http://localhost:3000")
            .post('/signup')
            .send({
                password: 'carrote',
                name: 'b'
            })
            .end(function (err, res) {
                console.log(res.body)
                assert.strictEqual(res.status, 400);
                assert.strictEqual(res.body.error, "Votre identifiant doit contenir entre 2 et 20 caractères");
            });
    });

    it("User exist", async () => {
        chai.request("http://localhost:3000")
            .post('/signup')
            .send({
                password: 'mama',
                name: 'test'
            })
            .end(function (err, res) {
                console.log(res.body);
                assert.strictEqual(res.status, 400);
                assert.strictEqual(res.body.error, "Cet identifiant est déjà associé à un compte");
            });
    });
});