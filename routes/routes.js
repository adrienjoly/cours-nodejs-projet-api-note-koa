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
    ctx.type = 'json';
    ctx.status = 400;
    let req = JSON.stringify(ctx.request.body);
    let res = JSON.parse(req);
    if(!res.name || !res.password ) {
        ctx.body = JSON.parse('{"error" : "Il vous manque le login ou le mot de passe"}');
    }else if(res.password.length < 4){
        ctx.body = JSON.parse('{"error" : "Le mot de passe doit contenir au moins 4 caractères"}');
    }else if(res.name.length < 2 || res.name.length > 20) {
        ctx.body = JSON.parse('{"error" : "Votre identifiant doit contenir entre 2 et 20 caractères"}');
    }else {
        ctx.status = 200;
        const username = res.name;
        const password = res.password;
        const token = jwt.sign({username}, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        ctx.body = {token};
    }
})

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})

module.exports = router;