const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model
const SchemaConfig = require('../configs/schema')

class DBClient {
    db = mongoose.connection
    url = undefined
    dbName = undefined
    modelName = undefined
    schema = null
    model = null
    constructor(url, dbName){
        this.url = url
        this.dbName = dbName
    }

    connect() {
        mongoose.connect(`${this.url + this.dbName}`)
        this.db.once('open',()=>{
            console.log('数据库连接成功……')
        })
    }

    // 更新schema, return this
    updateSchema(schemaName) {
        const arg = [...arguments]
        arg.shift()
        this.schema = new Schema(SchemaConfig[schemaName],...arg)
        this.model = null // model置空
        this.modelName = schemaName // updateModel时使用
        return this
    }

    updateModel() {
        if(!this.schema){
            throw new Error(`不能在实例化schema对象之前调用mongoose.model`)
        }
        this.model = Model(this.modelName, this.schema)
    }

    // 用于在Schema定义之后为Schema添加字段
    schemaAddField(config) {
        if(!this.schema){
            throw new Error(`不能在实例化schema对象之前调用schema.add方法`)
        }
        this.schema.add(config)
        return this
    }

    // 插入单条数据
    create(data, cb) {
        this.model.create(data, (err, docs)=>{
            if(err){
                throw err
            }
            cb(docs)
        })
    }

    // 插入多条数据
    createMany(data, cb) {
        this.model.insertMany(data, (err, docs)=>{
            if(err){
                throw err
            }
            cb(docs)
        })
    }

    // 查询数据
    find() {
        // Model.find(conditions, [projection], [options], [callback])
        // conditions：查询条件
        // [projection]：控制返回字段
        // [options]：配置查询参数
        // [callback]：回调函数–function(err,docs){}
        const args = [...arguments]
        args.pop()
        this.model.find(...args, (err, docs)=>{
            if(err){
                throw err
            }
            arguments[args.length](docs)
        })
    }

}

module.exports = DBClient

// //连接数据库
// mongoose.connect('mongodb://localhost:27017/mongoose')

// const db = mongoose.connection

// //监听数据库连接状态
// db.once('open',()=>{
//     console.log('数据库连接成功……')
// })
// db.once('close',()=>{
//     console.log('数据库断开……')
// })

// const stuSchema = new Schema(SchemaConfig.student)

// // mongoose会缓存对数据库的操作，可以设置禁用http://www.mongoosejs.net/docs/connections.html
// const stuModle = Model('student', stuSchema) // params [collectionName schemaInstance] collectionName为单数形式时，会创建或直接链接到一个复数形式名称的集合

// stuModle.create({
//     name: '周一',
//     age: '16',
//     addr: '成都'
// },(err, docs) =>{
//     if(!err){
//         console.log(`插入成功${docs}`)
//     }
// })