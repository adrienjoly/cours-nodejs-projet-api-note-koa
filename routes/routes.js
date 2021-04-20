const globals = require('../globals'); //<< globals.js path
const Router = require('koa-router');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const router = new Router();
const uri = globals.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const jwtKey = globals.JWT_KEY;
const jwtExpirySeconds = 86400 //24h * 3600(sec dans une heure)

router.post('/signin', async (ctx) => {
    ctx.type = 'json';
    ctx.status = 400;
    let req = JSON.stringify(ctx.request.body);
    let res = JSON.parse(req);
    if(!res.name || !res.password ) {
        ctx.body = JSON.parse('{"error" : "null"}');
    }else if(res.password.length < 4){
        ctx.body = JSON.parse('{"error" : "Le mot de passe doit contenir au moins 4 caractères"}');
    }else if(res.name.length < 2 || res.name.length > 20) {
        ctx.body = JSON.parse('{"error" : "Votre identifiant doit contenir entre 2 et 20 caractères"}');
    }else if(!/^[a-z]+$/.test(res.name)) {
        ctx.body = JSON.parse('{"error" : "Votre identifiant ne doit contenir que des lettres minuscules non accentuées"}');
    }else {
        await client.connect();
        const collection = client.db("notes-api").collection("users");
        let tempName = await collection.findOne({
            username : res.name
        });
        if(tempName != null){
            //TODO: Verifier si le mot de passe correspond a celui de l'utilisateur trouvé
            ctx.status = 200;
            const username = res.name;
            let options = {
                httpOnly: true,
                overwrite: true,
                sameSite:true,
                maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
            };
            const token = jwt.sign({username}, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            });
            ctx.cookies.set('x-access-token', token, options);
            ctx.body = {token};
        }else{
            ctx.status = 403;
            ctx.body = JSON.parse('{"error" : "Cet identifiant est inconnu"}');
        }
    }
})


router.post('/signup', async (ctx) => {
    ctx.type = 'json';
    ctx.status = 400;
    let req = JSON.stringify(ctx.request.body);
    let res = JSON.parse(req);
    if(!res.name || !res.password ) {
        ctx.body = JSON.parse('{"error" : "null"}');
    }else if(res.password.length < 4){
        ctx.body = JSON.parse('{"error" : "Le mot de passe doit contenir au moins 4 caractères"}');
    }else if(res.name.length < 2 || res.name.length > 20) {
        ctx.body = JSON.parse('{"error" : "Votre identifiant doit contenir entre 2 et 20 caractères"}');
    }else if(!/^[a-z]+$/.test(res.name)) {
        ctx.body = JSON.parse('{"error" : "Votre identifiant ne doit contenir que des lettres minuscules non accentuées"}');
    }else{
        await client.connect();
        const collection = client.db("notes-api").collection("users");
        let tempName = await collection.findOne({
            username : res.name
        });
        if(tempName == null){
            let salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hashSync(res.password, salt);
            console.log(hash);
            let insertUser = await collection.insertOne({
                username : res.name,
                password : hash
            });
            ctx.status = 200;
            const username = res.name;
            let options = {
                httpOnly: true,
                overwrite: true,
                sameSite:true,
                maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
            };
            const token = jwt.sign({username}, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            });
            ctx.cookies.set('x-access-token', token, options);
            ctx.body = {token};
        }else{
            ctx.body = JSON.parse('{"error" : "Cet identifiant est déjà associé à un compte"}');
        }
    }
})

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})

module.exports = router;