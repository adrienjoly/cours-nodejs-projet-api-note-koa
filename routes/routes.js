const globals = require('../globals'); //<< globals.js path
const Router = require('koa-router');
const router = new Router();
const jwt = require("jsonwebtoken");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Raphael:Raphael@projetnode.n7g44.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const jwtKey = globals.JWT_KEY;
const jwtExpirySeconds = 86400 //24h * 3600(sec dans une heure)

const users = {
    user1: "password1",
    user2: "password2",
}

router.get('/signin', async (ctx) => {
    if(!ctx.query.name || !ctx.query.password ){
        //ctx.body(401, 'erreur');
        ctx.throw(400, 'Il vous manque le login ou le mot de passe' );
    }
    if(ctx.query.password.length < 4) {
        ctx.throw(400, 'Le mot de passe doit contenir au moins 4 caractères' );
    }
    if(ctx.query.name.length < 2 || ctx.query.name.length > 20) {
        ctx.throw(400, 'Votre identifiant doit contenir entre 2 et 20 caractères' );
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("notes-api").collection("users");
        // perform actions on the collection object
        client.close();
    });
    

    // Get credentials from JSON body
    const username = ctx.query.name;
    const password = ctx.query.password;



    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    //ctx.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
    //ctx.type = 'xml';
    ctx.body = token;
})

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
})

module.exports = router;