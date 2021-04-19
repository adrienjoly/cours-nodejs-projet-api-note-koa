const globals = require('../globals'); //<< globals.js path
const Router = require('koa-router');
const router = new Router();
const jwt = require("jsonwebtoken");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Raphael:Raphael@projetnode.n7g44.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const jwtKey = globals.JWT_KEY;
const jwtExpirySeconds = 86400 //24h * 3600(sec dans une heure)

router.post('/signin', async (ctx) => {
    let req = JSON.stringify(ctx.request.body);
    let res = JSON.parse(req);
    if(!res.name || !res.password ){
        ctx.throw(400, 'Il vous manque le login ou le mot de passe' );
    }
    if(res.password.length < 4) {
        ctx.throw(400, 'Le mot de passe doit contenir au moins 4 caractères' );
    }
    if(res.name.length < 2 || res.name.length > 20) {
        ctx.throw(400, 'Votre identifiant doit contenir entre 2 et 20 caractères' );
    }
    await client.connect(err => {
        const collection = client.db("notes-api").collection("users");
        client.close();
    });
    // Get credentials from JSON body
    const username = res.name;
    const password = res.password;
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
    ctx.body = {token};
})

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})

module.exports = router;