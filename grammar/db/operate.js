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