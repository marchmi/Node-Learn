const DBClient = require('./mongoose')
const client = new DBClient('mongodb://localhost:27017/', 'mongoose')

client.connect()
// client.updateSchema('student',{ timestamps: true }).updateModel()
// client.create({}, (docs)=>{
//     console.log(`插入${docs}成功`)
// }) // student validation failed: name: Path `name` is required.

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

// 前后钩子
client.bindHook('pre', 'findOneAndRemove', function(next){
    console.log('即将删除数据一')
    next()
})
client.bindHook('pre', 'findOneAndRemove', function(next){
    console.log('即将删除数据二')
    next()
})
client.bindHook('post', 'findOneAndRemove', function(doc){
    console.log(`执行完毕findOneAndRemove方法`)
})

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

// // 直接查询出所有数据
// client.find((docs) =>{
//     console.log(`查询到数据${docs.length}条`)
// })

// // 查找code值>=2的数据
// client.find({code: {$gte: 2}}, (docs) =>{
//     console.log(`查询到符合条件的数据${docs.length}条`)
// })

// // 查找name中带有三，code值>=2的数据
// client.find({name: /三/, code: {$gte: 2}}, (docs) =>{
//     console.log(`查询到符合条件的数据${docs.length}条`)
// })

// // _id默认会返回 查找name中带有三，code值>=2的数据，只返回name
// client.find({name: /三/, code: {$gte: 2}}, {name: 1, _id: 0 }, (docs) =>{
//     console.log(`查询数据，按照指定的字段返回${docs}`)
// })

// // 跳过前两条数据，返回其余符合条件的数据
// client.find(null, null, {skip: 2}, (docs) =>{
//     console.log(`查询数据，按照指定的字段返回${docs}`)
// })

// // 查询出第一条符合条件的文档
// client.findOne((docs) =>{
//     console.log(`查询到数据${docs}`)
// })

// // 按照条件查询数据
// client.findOne({name: /三/}, (docs) =>{
//     console.log(``)
//     console.log(`查询一条name属性包含三的数据：${docs}`)
// })

// // 按照条件查询数据，并控制输出字段
// client.findOne({name: /三/}, {name: 1, _id: 0 }, (docs) =>{
//     console.log(``)
//     console.log(`查询一条name属性包含三的数据并只返回name属性：${docs}`)
// })

// new ObjectId("63364aa1b1212b8f7f94e271")

// // 查询出第一条符合条件的文档
// client.findById("63364aa1b1212b8f7f94e271", (docs) =>{
//     console.log(`findById查询到数据${docs}`)
// })

// // 按照条件查询数据
// client.findById("63364aa1b1212b8f7f94e271", (docs) =>{
//     console.log(``)
//     console.log(`findById查询一条name属性包含三的数据：${docs}`)
// })

// // 按照条件查询数据，并控制输出字段
// client.findById("63364aa1b1212b8f7f94e271", {name: 1, _id: 0 }, (docs) =>{
//     console.log(``)
//     console.log(`findById查询一条name属性包含三的数据并只返回name属性：${docs}`)
// })

// 使用$where查询数据
// client.findByWhere({$where:"obj.code === 3"}, (docs) =>{
//     console.log(`findByWhere查询到数据${docs}`)
// })

// client.findByWhere({$where:function() {
//     return Object.code == 2
// }}, (docs) =>{
//     console.log(`findByWhere查询到数据${docs}`)
// })

// client.update({name: /三/}, {$set:{code: 3, floor: 5}}, (docs) =>{
//     console.log(`update更新数据${docs}`)
// })

// client.updateOne({name: /三/}, {$set:{code: 3, floor: 3}}, (docs) =>{
//     console.log(`update更新数据${docs}`)
// })

// client.updateMany({name: /三/}, {$set:{code: 3, floor: 3}}, (docs) =>{
//     console.log(`update更新数据${docs}`)
// })

// client.findSave({name: /三/}, (docs) =>{
//     docs.forEach(doc => {
//         doc.name = "third class"
//         doc.save()
//     });
// })

// client.findOneSave({name: /二/}, (doc) =>{
//     doc.name = "second class"
//     doc.save()
// })

// client.modelRemove({name: /second/}, (docs) =>{
//     console.log(`modelRemove删除数据${docs}`)
// })

// client.documentRemove({name: /first/}, (doc) =>{
//     console.log(`documentRemove删除数据${doc}`)
// })

client.findOneAndRemove({name: /delete/}, (doc) =>{
    console.log(`findOneAndRemove删除数据${doc}`)
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