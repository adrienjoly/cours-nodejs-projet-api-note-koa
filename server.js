const Koa = require('koa');
const koaBody = require('koa-body');
const globals = require('./globals');
const serverRoutes = require('./routes/routes');
const app = new Koa();
app.use(koaBody());
const PORT = process.env.PORT || globals.PORT;
app.use(serverRoutes.routes());
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
module.exports = server;