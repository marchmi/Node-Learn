// https://blog.csdn.net/weixin_44952258/article/details/122076021
const Server = require('./app/server')

const app = new Server('9610')

app.run()