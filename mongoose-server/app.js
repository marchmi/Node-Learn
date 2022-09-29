const DBClient = require('./mongoose')
const client = new DBClient('mongodb://localhost:27017/', 'mongoose')

client.connect()
client.updateSchema('grade')
client.updateModel('grade')
const data = {
    name: '一年级',
    discribe: '小学一年级，6-7岁',
    code: 1
}
client.create(data,(docs)=>{
    console.log(`插入${docs}成功`)
})

client.updateSchema('class')
client.updateModel('class')
const classData = {
    name: '一班',
    code: 1
}
client.create(classData,(docs)=>{
    console.log(`插入${docs}成功`)
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