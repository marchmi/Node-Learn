class MiddleWareGroup {
    async logger(requset, response, next) {
        console.log(`测试中间件执行顺序，第一个执行`)
        next()
    }
    async loggerSecond(requset, response, next) {
        console.log(`测试中间件执行顺序，第二个执行`)
        next()
    }
    async partFirst(requset, response, next) {
        console.log(`路由中间件一`)
        next()
    }
    async partSecond(requset, response, next) {
        console.log(`路由中间件二`)
        next()
    }
}

module.exports = new MiddleWareGroup()