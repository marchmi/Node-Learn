'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 引入和使用路由级别的中间件
  const part = app.middleware.part(); // 单参数则为app.middleware.part(options, app)
  router.get('/', part, controller.home.index);
};
