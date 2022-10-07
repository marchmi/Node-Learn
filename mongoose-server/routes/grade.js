const express = require('express')
const router = express.Router()
const client = require('../mongoose/client')
const tools = require('../utils/tools')

router.get('/lists', async(req, response, next) => {
    try {
        const { body, baseUrl, path, query } = req
        const option = {
            limit: parseInt(query.pageSize),
            page: parseInt(query.pageNum),
            sort: { gradeCode: -1 },               // 排序
            lean: true,
            // populate: '',
            select: 'describe gradeName gradeCode' // 设置需要返回的字段，默认带_id
        },
            filter = {...query}
            delete filter.pageSize
            delete filter.pageNum
        client.updateSchema(tools.replacePathLine(baseUrl),{ timestamps: true }).updateModel()
        const result = await client.paginate(filter,option)
        response.send(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/list', async(req, response, next) => {
    try {
        const filter = {
            // gradeCode: {
            //     $gte: 2022 // gradeCode一开始设定为String类型，条件操作符$gte则无法生效  https://blog.csdn.net/qq_43472877/article/details/110823207
            // },
            // gradeName: /2022/ // 模糊匹配
        },
            query = req.query,
            limit = parseInt(query.pageSize),
            skip = (query.pageNum - 1) * limit
        const { body, baseUrl, path } = req
        client.updateSchema(tools.replacePathLine(baseUrl),{ timestamps: true }).updateModel()
        const result = await client.aggregate(
            {
                $match: filter  // 匹配条件
            },
            // {
            //     $group: {
            //         _id: '$gradeCode',   // 根据gradeCode这个字段的值进行分组，https://blog.csdn.net/qq_18948359/article/details/88777066
            //         count: {
            //             $sum: 1          // 统计数据
            //         }
            //     }
            // },
            {
                $project: {     // 控制查询出来的字段
                    _id: 1,
                    // count: 1,// 配置$group属性并配置该字段时才生效
                    gradeName: 1,// 配置了$group属性时，没有在$group中声明的字段不会生效
                    gradeCode: 1,
                    describe: 1
                }
            },
            {
                $sort: { gradeCode : 1 } // 根据gradeCode字段进行排序 1升序，-1降序
            },
            {
                $skip:1     // 跳过一定数据
            },
            {
                $limit:1    // 查询数据的条数
            },
            // {
            //     $unwind:'$tags' 将数组类型的值，按元素拆分成多条独立的数据进行返回
            // }
        )
        response.send(result)
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