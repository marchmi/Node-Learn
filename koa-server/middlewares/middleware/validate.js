// middlewares/middleware/validate.js
// 参考message.js中的写法，绑定参数校验的方法，或者直接在路由对象中处理
// 获取请求中传递过来的参数，根据请求类型从不同的位置获取参数
function getRequestFields(method, request){
    let rtn = {}
    if(method === 'POST'){
        rtn = {...request.body}
        return rtn
    }
    if(method === 'GET'){
        rtn = {...request.query}
        return rtn
    }
    return rtn
}

/**
 * 没有验证信息的则不生成验证消息
 * 
 * @param {*} ctx 
 * @param {*} next 
 */

// module.exports = async (ctx, next) => {
//     const collection = ctx.state.opreate.collection, // 获取要操作的集合名称
//           collectionConfig = ctx.state[`collection${collection}`],  // 获取所有的集合配置信息
//           opreate = ctx.state.opreate.opreate,      // 本次请求需要进行的操作
//           fields = collectionConfig.fields,         // 集合中的字段信息
//           opreateFields = collectionConfig[opreate], // 本次请求所进行操作涉及的字段集合
//           validateNotice = Object.create({})        // 记录字段的验证信息

//     console.log(`请求方法：${ctx.request.method}`)
//     const values = getRequestFields(ctx.request.method, ctx.request)
//     console.log(`values：${JSON.stringify(values)}`)
//     console.log(ctx)

//     if(opreate !== 'detail'){
//         console.log(`处理字段验证Start`)
//         opreateFields.forEach(fieldName => {
//             fieldInfo = fields[fieldName]
//             // if(fieldInfo.required &&  )
//         });
//         console.log(`处理字段验证End`)
//     }
//     console.log(`length：${Object.keys(validateNotice).length}`)
//     await next();
// };

module.exports = async (ctx, next) => {
    /**
     * @param {Array} fields 字段集合
     * @param {Object} valueMap 键值对
     * @param {Object} rules 对象 { fieldName: valueObject }
     * @param {Object} validator 
     */
    ctx.res.$validate = (fields, valueMap, rules, validator = {}) => {
        const validateNotice = {}
        fields.forEach(fieldName => {
            if(rules[fieldName].required && !valueMap[fieldName]){
                validateNotice[fieldName] = [ `${fieldName}必填` ]
            }
        })
        return validateNotice
    };

    await next();
};