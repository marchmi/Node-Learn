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

router.get('/:id', async(req, response, next) => {
    try {
        const { body, baseUrl, path } = req
        client.updateSchema(tools.replacePathLine(baseUrl),{ timestamps: true }).updateModel()
        const result = await client.findById(tools.replacePathLine(path))
        response.send(result)
    } catch (error) {
        response.send({code:204, error: error})
        next(error)
    }
})

router.post('/create', async(req, response, next) => {
    try {
        const { body, baseUrl, path } = req
        // console.log(body, path, baseUrl) // {} /create /grade
        client.updateSchema(tools.replacePathLine(baseUrl),{ timestamps: true }).updateModel()
        const result = await client.create(body)
        response.send(result)
    } catch (error) {
        response.send(error)
        next(error) // 可以试试利用client.bindHook，为create方法绑定post事件集中处理异常
    }
})

router.post('/update/:id', async(req, response, next) => {
    try {
        const { body, baseUrl, path, params: { id } } = req
        client.updateSchema(tools.replacePathLine(baseUrl),{ timestamps: true }).updateModel()
        const result = await client.updateOne({_id: id}, {$set: {...body}})
        response.send(result)
    } catch (error) {
        response.send(error)
        next(error)
    }
})

router.post('/delete/:id', async(req, response, next) => {
    try {
        const { body, baseUrl, path, params: { id } } = req
        client.updateSchema(tools.replacePathLine(baseUrl),{ timestamps: true }).updateModel()
        const result = await client.findByIdAndRemove(id)
        response.send(result)
    } catch (error) {
        response.send(error)
        next(error)
    }
})

module.exports = { path: '/grade', router }