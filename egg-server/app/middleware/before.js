/* eslint-disable jsdoc/check-tag-names */
/**
 * 全局的Before中间件
 * @returns empty
 */
module.exports = () => {
  return async function before(ctx, next) {
    await next();
    console.log('----------------------------------');
    console.log('全局的Before中间件');
    console.log('----------------------------------');
  };
};

