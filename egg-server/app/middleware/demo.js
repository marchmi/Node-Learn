// 支持两个可选参数options与app 中间件使用方式doc：https://blog.csdn.net/weixin_40629244/article/details/105089566
module.exports = options => {
  return async function demo(ctx, next) {
    await next();
    console.log('对响应结果开启压缩');
    // console.log(app);
    console.log('----------------------------------');
    console.log(`options:${JSON.stringify(options)}`);
    console.log('----------------------------------');
  };
};
