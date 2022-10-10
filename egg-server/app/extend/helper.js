/**
 *
 * Helper 用来提供一些实用的 utility 函数,将一些常用的动作抽离在 helper.js 里面成为一个独立的函数
 */
// app/extend/helper.js
module.exports = {
  formatUser(user) {
    return `使用helper处理后的返回结果：${user}`;
  },
};
