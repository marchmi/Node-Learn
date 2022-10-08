const collectionMap = require('../../config/collection')
// middlewares/middleware/state.js
/**
 * 考虑在此处根据接口信息将配置对象写入到state
 * 后面根据写入的配置信息处理参数校验、返回信息生成等操作
 * 
 * @param {*} ctx 
 * @param {*} next 
 */

module.exports = async (ctx, next) => {
    const { url } = ctx
    const opreateArr = url.split('/')

    /*
      利用split分割路由信息 /api/users/detail/123
      ['', 'api', 'users', 'detail', ...] [字符串切割出来的空值, 接口公共部分, 模块名称(对应集合), 操作类型, ... ]
      接口约定变化时，对应关系也应该调整
    */
    ctx.state.opreate = { // 本次请求要操作哪一张表，进行什么类型的操作
        collection: opreateArr[2], // 要操作的集合信息
        opreate: opreateArr[3] // 要进行的操作 如:list | create | update | delete | detail
    }

    // 将本次需要操作的集合的信息以`collection${collection}`先写入到state,
    const { collection } = ctx.state.opreate
    ctx.state[`collection${collection}`] = collectionMap[collection]

    await next();
};