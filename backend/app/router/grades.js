module.exports = app => {
  app.router.resources('grades', '/api/grades', app.controller.grades); // RESTful 风格的 URL 定义
  // app.router.get('/grades/:id/:name', controller.grades.info); // 多个参数
};

