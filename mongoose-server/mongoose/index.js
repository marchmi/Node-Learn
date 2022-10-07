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
        if(!this.model || this.model.modelName != this.modelName )
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

    // 聚合方法
    async aggregate(){
        return new Promise((r, e) => {
            const args = [...arguments]
            return this.model.aggregate(args, (err, docs) => {
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // 插入单条数据
    async create(data) {
        return new Promise((r, e) =>{
            this.model.create(data, (err, docs) => {
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // 插入多条数据
    createMany(data, cb) {
        return this.model.insertMany(data, (err, docs) => {
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
        return this.model.find(...args, (err, docs) => {
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
        return this.model.findOne(...args, (err, docs) => {
            if(err){
                throw err
            }
            // callback()
            arguments[args.length](docs)
        })
    }

    // 查询单条数据
    findById() {
        return new Promise((r, e) =>{
            const args = [...arguments]
            args[0] = new ObjectId(args[0])
            this.model.findById(...args, (err, doc)=>{
                if(err){
                    e({code: 204, err})
                }
                if(!doc) {
                    e({code: 204, message: `id为${args[0]}的数据未查找到！`})
                }
                r({code: 200, doc})
            })
        })
    }

    // $where 使用
    findByWhere() {
        const args = [...arguments]
        return new Promise((r, e) =>{
            this.model.find(...args, (err, docs)=>{
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // 更新数据 会更新所有符合条件的文档
    update() {
        const args = [...arguments]
        return new Promise((r, e) =>{
            this.model.update(...args, (err, docs)=>{
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // 只更新一个文档
    updateOne() {
        const args = [...arguments]
        return new Promise((r, e) =>{
            this.model.updateOne(...args, (err, docs) => {
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // 更新所有
    updateMany() {
        const args = [...arguments]
        return new Promise((r, e) =>{
            this.model.updateMany(...args, (err, docs)=>{
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // 查找更新
    findSave() {
        const args = [...arguments]
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
        return new Promise((r, e) =>{
            this.model.remove(...args, (err, docs)=>{
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, docs})
            })
        })
    }

    // document的remove，每一次有符合条件的文档被删除，都获取一次文档信息
    documentRemove() {
        const args = [...arguments]
        return new Promise((r, e) =>{
            this.model.find(...args, (err, docs)=>{
                if(err){
                    e({code: 204, err})
                }
                docs.forEach(doc=>{
                    doc.remove((err, doc)=>{
                    })
                })
                r({code: 200, docs})
            })
        })
    }

    // 删除符合条件的一条数据
    findOneAndRemove() {
        const args = [...arguments]
        return new Promise((r, e) =>{
            this.model.findOneAndRemove(...args, (err, doc)=>{
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, doc})
            })
        })
    }

    // 通过id删除数据
    findByIdAndRemove() {
        const args = [...arguments]
        args[0] = new ObjectId(args[0])
        return new Promise((r, e) =>{
            this.model.findByIdAndRemove(...args, (err, doc)=>{
                if(err){
                    e({code: 204, err})
                }
                r({code: 200, doc})
            })
        })
    }

}

module.exports = DBClient