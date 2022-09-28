const MongoClient = require('mongoose');

class DBClient {
  url = ""
  dbName = ""
  db = ""
  dbo = ""

  constructor(url, dbName){
    this.url = url
    this.dbName = dbName
  }

  // 链接数据库
  async connectDB(){
    const that = this
    return new Promise((r, e) =>{
      MongoClient.connect(this.url, function(err, db) {
        if (err) throw err;
        that.db = db
        const dbo = db.db(that.dbName);
        that.dbo = dbo
        r({db,dbo})
      });
    })
  }

  // 关闭数据库链接
  async closeDB(){
    this.db.close()
  }

  // 插入单条数据
  async insertOne(collection, data) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).insertOne(data, function(err, res) {
        if (err) throw err;
        r({status: 200})
      });
    })
  }

  // 插入多条数据
  async insertMany(collection ,data) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).insertMany(data, function(err, res) {
        if (err) throw err;
        r(`成功插入${res.insertedCount}条数据`)
      });
    })
  }

  // 查询数据
  async findDocument(collection, filter = {}) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).find(filter).toArray((err, result)=>{
        if (err) throw err;
        r(result)
      })
    })
  }

  // 更新单条数据
  async updateOne(collection, wherrStr, updateStr) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).updateOne(wherrStr, updateStr, (err, result)=>{
        if (err) throw err;
        r(`文档更新成功`)
      })
    })
  }

  // 更新多条数据
  async updateMany(collection, wherrStr, updateStr) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).updateMany(wherrStr, updateStr, (err, result)=>{
        if (err) throw err;
        r(result)
      })
    })
  }

  // 删除单条数据
  async deleteOne(collection, wherrStr) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).deleteOne(wherrStr, (err, result)=>{
        if (err) throw err;
        console.log(`文档删除成功`)
        r(result)
      })
    })
  }

  // 删除多条数据
  async deleteMany(collection, wherrStr) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).deleteMany(wherrStr, (err, result)=>{
        if (err) throw err;
        console.log(`多条文档被删除`)
        r(result)
      })
    })
  }

  // 数据排序{type: 1} 升序 {type: -1} 降序
  async sortFind(collection, filter = {}, sort = {type: 1}) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).find(filter).sort(sort).toArray((err, result)=>{
        if (err) throw err;
        r(result)
      })
    })
  }

  // limit 指定返回条数
  async limitFind(collection, filter = {}, limit = 3) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).find(filter).limit(limit).toArray((err, result)=>{
        if (err) throw err;
        r(result)
      })
    })
  }

  // skip limit 指定返回条数
  async skipLimitFind(collection, filter = {}, skip = 3, limit = 3) {
    const that = this
    return new Promise((r, e) =>{
      that.dbo.collection(collection).find(filter).skip(skip).limit(limit).toArray((err, result)=>{
        if (err) throw err;
        r(result)
      })
    })
  }

}

module.exports = DBClient