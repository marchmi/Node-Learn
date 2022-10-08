// middlewares/middleware/message.js

module.exports = async (ctx, next) => {
    ctx.res.$success = (data, code = 200) => {
      const _data = {
        code,
      };
      if (typeof data === "object") {
        _data.msg = "success";
        _data.data = data;
      } else {
        _data.msg = data;
      }
      ctx.body = _data;
    };
  
    ctx.res.$error = (err, code = 500) => {
      const _data = {
        code,
      };
      if (typeof err === "object") {
        _data.msg = "error";
        _data.data = JSON.stringify(err);
      } else {
        _data.msg = err;
      }
      ctx.body = _data;
    };
    
    await next();
  };