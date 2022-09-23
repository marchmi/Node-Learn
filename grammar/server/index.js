const express = require('express')

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
    initRouter(routerModules) {
        routerModules.forEach(module => {
            this.app.use(module.path,module.router)
        });
    }
    initGlobalMiddleWare(middlewares) {
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        });
    }
}

module.exports = Server