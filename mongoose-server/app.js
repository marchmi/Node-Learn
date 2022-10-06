const Server = require('./server')

// 路由引入
const gradeRouter = require('./routes/grade')
const classRouter = require('./routes/class')

// 中间件引入
const middleware = require('./middleware')

const app = new Server('9610')

// 允许跨域
app.useCors()

// 使用BodyParser
app.useBodyParser()

// 使用全局中间件
app.initGlobalMiddleWare([middleware.logger, middleware.loggerSecond])

// 注册api
app.initRouter([ gradeRouter, classRouter ])

app.run()