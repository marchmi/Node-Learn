const express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser')

class Server {
    app = ""
    port = ""
    constructor(port){
      this.app = express()
      this.port = port
    }
    run(){
      this.app.listen(this.port, () => {
        console.log(`Example app listening on port ${this.port}`)
      })
    }

    useCors(){
      this.app.use(cors())
    }

    useBodyParser(){
      //配置 body-parser 中间件 (插件, 专门用来解析表单 POST 请求)
      // parse application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({txtended: false}))
      //parse application/json
      this.app.use(bodyParser.json())
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