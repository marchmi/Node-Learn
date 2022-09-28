var mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost:27017/flicker')

const db = mongoose.connection

//监听数据库连接状态
db.once('open',()=>{
    console.log('数据库连接成功……')
})
db.once('close',()=>{
    console.log('数据库断开……')
})

const Server = require('./server')

// 路由引入
const homeRouter = require('./routes/home')

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
app.initRouter([homeRouter])

app.run()