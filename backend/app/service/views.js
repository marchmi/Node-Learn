'use strict';

const { Service } = require('egg');
const uuid = require('uuid');

class ViewsService extends Service {
  async find() {
    const { ctx } = this;

    // 获取分页参数，默认是第一页，每页10条记录
    const { page = 1, pageSize = 10 } = ctx.query;

    // 构建查询条件
    const query = {};

    const skip = (page - 1) * pageSize; // 计算跳过的记录条数

    // 使用Model的find方法进行查询，加上条件和分页参数
    const result = await ctx.model.Views.find(query, { _id: 0, __v: 0 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // 获取符合条件的记录总数
    const total = await ctx.model.Views.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize); // 计算总页数

    return {
      result,
      total,
      totalPages,
    };
  }

  async enum() {
    const { ctx } = this;

    const result = await ctx.model.Views.find({}).select('viewName type -_id'); // 只返回viewName和type字段，不返回_id字段

    return {
      result,
    };
  }

  async create(data) {
    const newUUID = uuid.v4();
    const { ctx } = this;
    const newDoc = { ...data, uuid: newUUID };

    const result = await ctx.model.Views.create(newDoc);
    return result;
  }

  async updateOne(uuid, data) {
    const { ctx } = this;

    const result = await ctx.model.Views.findOneAndUpdate({ uuid }, data, { new: true }); // { new: true } 返回更新后的文档
    return result;
  }

}

module.exports = ViewsService;
