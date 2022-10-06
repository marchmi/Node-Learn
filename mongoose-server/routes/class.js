const express = require('express')
const router = express.Router()
const client = require('../mongoose/client')
const tools = require('../utils/tools')


router.get('/list', async(req, response, next) => {
    try {
        const filter = {},
              query = req.query,
              limit = parseInt(query.pageSize),
              skip = (query.pageNum - 1) * limit
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/create', async(req, response, next) => {
    try {
        const { body, baseUrl, path } = req
        console.log(body, path, baseUrl) // {} /create /classes
        client.updateSchema(tools.replacePathLine(baseUrl))
        // await dbClient.connectDB()
        // const { status } = await dbClient.insertOne('brand', req.body)
        // console.log(status)
        // if ( status === 200 ){
            response.send({code:200,message:'数据插入成功',data:{}})
        // }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = { path: '/class', router }