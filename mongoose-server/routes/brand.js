const express = require('express')
const router = express.Router()
// 中间件引入
const DBClient = require('../db')

const dbClient = new DBClient("mongodb://localhost:27017/","flicker")

router.get('/list', async(req, response, next) => {
    try {
        const filter = {},
              query = req.query,
              limit = parseInt(query.pageSize),
              skip = (query.pageNum - 1) * limit
        
        dbClient.connectDB().then(res =>{
            dbClient.skipLimitFind('brand', filter, skip, limit).then(result =>{
                response.send({code:200,message:'获取成功',data:{list:result}})
            })
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/create', async(req, response, next) => {
    try {
        console.log(req.body)
        await dbClient.connectDB()
        const { status } = await dbClient.insertOne('brand', req.body)
        console.log(status)
        if ( status === 200 ){
            response.send({code:status,message:'数据插入成功',data:{}})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = { path: '/brand', router }