const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model
const SchemaConfig = require('../configs/schema')

class DBClient {
    db = mongoose.connection
    url = undefined
    dbName = undefined
    schema = null
    model = null
    constructor(url, dbName){
        this.url = url
        this.dbName = dbName
    }

    connect() {
        console.log(`${this.url + this.dbName}`)
        mongoose.connect(`${this.url + this.dbName}`)
        this.db.once('open',()=>{
            console.log('数据库连接成功……')
        })
    }

    updateSchema(schemaName) {
        this.schema = new Schema(SchemaConfig[schemaName])
    }

    updateModel(modelName) {
        this.model = Model(modelName, this.schema)
    }

    create(data,cb) {
        this.model.create(data,(err , docs)=>{
            cb(docs)
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