'use strict';

// app.js
/**
 * 执行流程
 * 1.app.js  => 2.router.js  => 3.挂载router目录下的路由文件  => 4.指定controller
 * => 5.controller中调用service  => 6.service调用model  => 7.service返回执行结果
 * => 8.controller响应请求
 *
 * 编写流程
 * model => service => controller => router
 */

module.exports = app => {
  app.once('server', server => {
    console.log(server);
    // websocket
  });
  app.on('error', (err, ctx) => {
    console.log(err, ctx);
    // report error
  });
  app.on('request', ctx => {
    console.log(ctx);
    // log receive request
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    console.log(used);
    // log total cost
  });
};
