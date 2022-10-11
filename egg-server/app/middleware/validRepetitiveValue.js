/* eslint-disable jsdoc/check-tag-names */
/**
 * 全局的校验重复值的中间件,在进入路由拦截器或controller之前验证需要具有唯一性的值是否重复不可行，
 * 因为一般只在新增或者修改接口中才校验值的唯一性，如果强行做在进入controller之前就校验值的唯一性的设计，
 * 则需要在接口命名或者请求的发起时做一些特别约定，这些约定可能造成后期维护工作量的增加
 *
 * 解决方案：
 *   方案一：√
 *      在路由注册时使用路由级的中间件拦截处理
 *      维护时可能还是要定义到各个路由之中
 *   方案二：
 *      写入一个统一的配置文件，根绝配置文件匹配需要校验值唯一性的接口
 *      许多不需要执行该操作的接口都要多执行一个非必要的函数，加大内存消耗
 * @returns empty
 */
module.exports = () => {
  return async function validRepetitiveValue(ctx, next) {
    ctx.response.test();
    await next();
  };
};

