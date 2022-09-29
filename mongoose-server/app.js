const DBClient = require('./mongoose')
const client = new DBClient('mongodb://localhost:27017/', 'mongoose')

client.connect()
client.updateSchema('grade',{ timestamps: true }).updateModel()
const data = {
    name: '二年级',
    discribe: '小学二年级，学生年龄7-8岁',
    code: 2
}
client.create(data, (docs)=>{
    console.log(`插入${docs}成功`)
})

client.updateSchema('class')
client.schemaAddField({floor: Number})
client.updateModel()
const classData = {
    name: '一班',
    code: 1,
    floor: 3
}
client.create(classData, (docs)=>{
    console.log(`插入${docs}成功`)
})

const classArray = [
    {
        name: '二班',
        code: 2,
        floor: 3
    },
    {
        name: '三班',
        code: 3,
        floor: 3
    }
]

client.createMany(classArray, (docs)=>{
    console.log(`插入${docs}成功`)
})

// 直接查询出所有数据
client.find((docs) =>{
    console.log(`查询到数据${docs.length}条`)
})

// 查找code值>=2的数据
client.find({code: {$gte: 2}}, (docs) =>{
    console.log(`查询到符合条件的数据${docs.length}条`)
})

// 查找name中带有三，code值>=2的数据
client.find({name: /三/, code: {$gte: 2}}, (docs) =>{
    console.log(`查询到符合条件的数据${docs.length}条`)
})

// _id默认会返回 查找name中带有三，code值>=2的数据，只返回name
client.find({name: /三/, code: {$gte: 2}}, {name: 1, _id: 0 }, (docs) =>{
    console.log(`查询数据，按照指定的字段返回${docs}`)
})

// 跳过前两条数据，返回其余符合条件的数据
client.find(null, null, {skip: 2}, (docs) =>{
    console.log(`查询数据，按照指定的字段返回${docs}`)
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