const Server = require('./server')

// 中间件引入
const DBClient = require('./db')

const dbClient = new DBClient()

// 路由引入
const homeRouter = require('./routes/home')
const cateRouter = require('./routes/cate');

// 中间件引入
const middleware = require('./middleware')

const app = new Server('9610')

// 使用全局中间件
app.initGlobalMiddleWare([middleware.logger, middleware.loggerSecond])

// 注册api
app.initRouter([homeRouter, cateRouter])

app.run()