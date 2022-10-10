'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 引入和使用路由级别的中间件
  const part = app.middleware.part(); // 单参数则为app.middleware.part(options, app)
  router.get('/', part, controller.home.index);

  router.resources('grades', '/api/grades', controller.grades); // RESTful 风格的 URL 定义
  // app.router.get('/grades/:id/:name', controller.grades.info); // 多个参数
};
