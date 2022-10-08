// https://blog.csdn.net/weixin_44952258/article/details/122076021
// https://zhuanlan.zhihu.com/p/76986907?from_voters_page=true
// https://zhuanlan.zhihu.com/p/34797505
const Server = require('./app/server')

const app = new Server('9610')

app.run()