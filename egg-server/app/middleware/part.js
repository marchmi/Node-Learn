/* eslint-disable jsdoc/require-returns-type */
/**
 * 局部的Part中间件，只在部分路由中调用
 * @return empty
 */
module.exports = () => {
  return async function part(ctx, next) {
    console.log('----------------------------------');
    console.log('局部的Part中间件');
    console.log('----------------------------------');
    await next();
  };
};

