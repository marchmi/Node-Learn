/* eslint valid-jsdoc: "off" */
/* 可以通过 app.config 从 Application 实例上获取到 config 对象，也可以在 Controller, Service, Helper 的实例上通过 this.config 获取到 config 对象 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1665369751129_271';

  /**
   * config.middleware = [ 'prev', 'demo', 'before' ]; next分隔执行语句 执行顺序为：prev-> demo -> before | before-> demo ->prev
   * 框架和插件不支持在 config.default.js 中匹配的 middleware 查看文档https://www.eggjs.org/zh-CN/basics/middleware
   * 无论是应用层加载的中间件还是框架自带中间件，都支持几个通用的配置项：
   * enable：控制中间件是否开启。
   * match：设置只有符合某些规则的请求才会经过这个中间件。
   * ignore：设置符合某些规则的请求不经过这个中间件。
   */
  // add your middleware config here
  config.middleware = [ 'prev', 'demo', 'before' ];
  config.demo = {
    key: '2333',
  }; // 最终将在启动时合并到app.config.appMiddleware

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
