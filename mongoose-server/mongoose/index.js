const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const Schema = mongoose.Schema
const Model = mongoose.model
const SchemaConfig = require('../configs/schema')

class DBClient {
    db = mongoose.connection
    url = void 0
    dbName = void 0
    modelName = void 0
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

    // 绑定钩子函数
    /**
     * 
     * @param {pre|post} hookType
     * @param {*} operate 
     * @param {*} fn 
     */
    bindHook(hookType, operate, fn) {
        this.schema[hookType](operate,fn)
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
        return this.model.create(data, (err, docs)=>{
            if(err){
                throw err
            }
            cb(docs)
        })
    }

    // 插入多条数据
    createMany(data, cb) {
        return this.model.insertMany(data, (err, docs)=>{
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
        return this.model.find(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 查询单条数据
    findOne() {
        const args = [...arguments]
        args.pop()
        return this.model.findOne(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 查询单条数据
    findById() {
        const args = [...arguments]
        args.pop()
        args[0] = new ObjectId(args[0])
        return this.model.findById(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // $where 使用
    findByWhere() {
        const args = [...arguments]
        args.pop()
        return this.model.find(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 更新数据 会更新所有符合条件的文档
    update() {
        const args = [...arguments]
        args.pop()
        return this.model.update(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 只更新一个文档
    updateOne() {
        const args = [...arguments]
        args.pop()
        return this.model.updateOne(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 更新所有
    updateMany() {
        const args = [...arguments]
        args.pop()
        return this.model.updateMany(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 查找更新
    findSave() {
        const args = [...arguments]
        args.pop()
        return this.model.find(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 查找单个更新
    findOneSave() {
        const args = [...arguments]
        args.pop()
        return this.model.findOne(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // Model的remove，倾向于得到一整个操作结果
    modelRemove() {
        const args = [...arguments]
        args.pop()
        return this.model.remove(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // document的remove，每一次有符合条件的文档被删除，都获取一次文档信息
    documentRemove() {
        const args = [...arguments]
        args.pop()
        return this.model.find(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            docs.forEach(doc=>{
                doc.remove((err, doc)=>{
                    // callback()
                    arguments[args.length](doc)
                })
            })
        })
    }

    // 删除符合条件的一条数据
    findOneAndRemove() {
        const args = [...arguments]
        args.pop()
        return this.model.findOneAndRemove(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 通过id删除数据
    findByIdAndRemove() {
        const args = [...arguments]
        args[0] = new ObjectId(args[0])
        args.pop()
        return this.model.findByIdAndRemove(...args, (err, docs)=>{
            if(err){
                throw err
            }
            // callback()
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