/**
 *
 * Helper 用来提供一些实用的 utility 函数,将一些常用的动作抽离在 helper.js 里面成为一个独立的函数
 */
// app/extend/helper.js
module.exports = {
  formatUser(user) {
    console.log(this.config); // 可以在Controller, Service, Helper 的实例上通过 this.config 获取到 config对象
    return `使用helper处理后的返回结果：${user}`;
  },

  /**
   * 验证分页页码，处理用户传递页码超过当前最大分页的情况
   * @param {Context} ctx 上下文对象
   * @param {Schema Model Instance} model Model实例
   * @returns 符合条件的分页数据
   */
  async getValidPageSize(ctx, model) {
    const { query } = ctx;
    const { pageNum, pageSize } = query;
    const options = Object.create({
      page: pageNum,
      limit: pageSize,
    });
    // console.log(ctx.helper.formatUser(233)); 在helper方法中调用helper中的方法
    const filter = Object.create({ ...query });
    delete filter.pageNum;
    delete filter.pageSize;
    const { totalDocs } = await model.paginate(filter, { limit: 0 }); // 使用{ limit: 0 }查询符合条件的docs总数
    if (totalDocs < (pageNum - 1) * pageSize) {
      options.page = Math.floor(totalDocs / pageSize);
    }
    return options;
  },
};
