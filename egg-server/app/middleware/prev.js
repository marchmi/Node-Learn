/* eslint-disable jsdoc/check-tag-names */
/**
 * 全局的Prev中间件
 * @returns empty
 */
module.exports = () => {
  return async function prev(ctx, next) {
    console.log('----------------------------------');
    console.log('全局的Prev中间件');
    console.log('----------------------------------');
    await next();
  };
};

