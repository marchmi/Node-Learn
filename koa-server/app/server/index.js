const Koa = require('koa');
const app = new Koa()
// 注册自定义中间件
require('../../middlewares/index')(app); // 这里中间件注册只能这样写
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa-cors");
// 引入路由自执行文件
const router = require("../../routes/index");

class Server {
    app = ""
    port = ""
    constructor(port){
      this.app = app
      this.port = port
    }
    run(){
      onerror(this.app)
      // 注册bodyparser
      this.app.use(bodyparser());
      // 注册日志
      this.app.use(logger());
      // 注册静态资源
      // this.app.use(require("koa-static")(__dirname + "/public"));
      // 注册跨域
      this.app.use(cors());
      // logger-handling
      this.app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
      });
      // error-handling
      this.app.on("error", (err, ctx) => {
        console.error("server error", err, ctx);
      });
      // 注册路由
      this.app.use(router.routes(), router.allowedMethods());
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