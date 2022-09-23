const express = require('express')
const { partFirst, partSecond } = require('../middleware')
const router = express.Router()

const middleware = require('../middleware')
const tools = require('../utils/tools')

router.get('/list',...(tools.getRouterMiddleWareByWareNames(middleware,['partFirst', 'partSecond'])), async(req, res, next) => {
    try {
        res.send({code:0,msg:'获取成功',data:`获取分类列表成功`})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = { path: '/cate', router }