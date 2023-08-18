// app/middleware/mongoError.js
module.exports = () => {
  return async function mongoError(ctx, next) {
    try {
      await next();
    } catch (err) {
      console.log(err.name);
      if (err.name === 'MongoServerError') {
        // 处理 MongoDB 错误并返回适当的响应
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      } else {
        // 将其他类型的错误继续向下传递
        throw err;
      }
    }
  };
};
