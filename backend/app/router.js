'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 引入和使用路由级别的中间件
  // const part = app.middleware.part(); // 单参数则为app.middleware.part(options, app)
  // router.get('/', part, controller.home.index);
  router.get('/', controller.home.index);

  require('./router/grades')(app); //  推荐egg-router-plus插件或者定义一个方法，自动载入某个文件夹下的路由进行注册
  require('./router/views')(app);
  require('./router/components')(app);
};
