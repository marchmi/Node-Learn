const Server = require('./server')

// 中间件引入
const DBClient = require('./db')

const dbClient = new DBClient("mongodb://localhost:27017/","flicker")

dbClient.connectDB().then(res =>{
    return dbClient.insertOne('sys_options', {zhName: '状态', field: 'status'}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.insertMany('sys_options', [{zhName: '性别', field: 'gender'}, {zhName: '职业', field: 'profession'}]).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.findDocument('sys_options').then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.findDocument('sys_options', {zhName: '职业'}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.updateOne('sys_options', {zhName: '数据有效状态'}, {$set: {field: 'data_on_use'}}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.updateMany('sys_options', {zhName: '状态'}, {$set: {field: 'status'}}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.deleteOne('sys_options', {field: 'genderd'}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.deleteMany('sys_options', {field: 'gender'}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.sortFind('sys_options', {field: 'profession'}, {type: -1}).then(res =>{
        console.log(res)
    })
}).then(res =>{
    return dbClient.limitFind('sys_options', {field: 'profession'}, 4).then(res =>{
        console.log(res)
    })
}).then(res =>{
    dbClient.skipLimitFind('sys_options', {field: 'profession'}).then(res =>{
        console.log(res)
    })
})

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