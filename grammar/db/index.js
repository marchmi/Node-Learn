const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

class DBClient {
  dbClient = ""
  constructor(){
    const that = this
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("runoob");
        var whereStr = {"name":'菜鸟教程'};  // 查询条件
        var updateStr = {$set: { "url" : "https://www.runoob.c0om" }};
        dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
            if (err) throw err;
            console.log("文档更新成功");
            db.close();
        });
    });
  }

}

module.exports = DBClient