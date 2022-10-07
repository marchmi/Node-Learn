const Koa = require('koa');
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa-cors");

class Server {
    app = ""
    port = ""
    constructor(port){
      this.app = new Koa()
      this.port = port
    }
    run(){
      onerror(this.app)
      // 注册bodyparser
      app.use(bodyparser());
      // 注册日志
      app.use(logger());
      // 注册静态资源
      // app.use(require("koa-static")(__dirname + "/public"));
      // 注册跨域
      app.use(cors());
      // logger-handling
      app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
      });
      // error-handling
      app.on("error", (err, ctx) => {
        console.error("server error", err, ctx);
      });
      // 注册自定义中间件
      this.app.listen(this.port, () => {
        console.log(`Example app listening on http://localhost: ${this.port}/`)
      })
    }

    useCors(){
    }

    useBodyParser(){
    }

    initRouter(routerModules) {
        routerModules.forEach(module => {
          this.app.use(module.path,module.router)
        })
    }

    initGlobalMiddleWare(middlewares) {
        middlewares.forEach(middleware => {
          this.app.use(middleware)
        })
    }
}

module.exports = Server