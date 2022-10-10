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
