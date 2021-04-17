const globals = require('./globals'); //<< globals.js path
const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
    console.log("ctx", ctx);
    ctx.body = "Hello World";
});

const PORT = globals.PORT;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});