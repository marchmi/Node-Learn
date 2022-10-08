// middlewares/middleware/order.js 用于观察中间件执行顺序

module.exports = async (ctx, next) => {
    console.log(`order中间件，用于验证中间件执行顺序`)
    await next();
};