'use strict';

const { Service } = require('egg');
const uuid = require('uuid');

class GradesService extends Service {
  async find() {
    const { ctx } = this;

    // 获取分页参数，默认是第一页，每页10条记录
    const { page = 1, pageSize = 10, keyword, ageRange, exactMatch } = ctx.query;
    /**
     * keyword: John 模糊搜索的关键字
     * ageRange: [ 20, 30 ] 精确搜索的年龄范围
     * exactMatch: example 完全配置的值
     */

    // 构建查询条件
    const query = {};
    if (keyword) {
      // 如果有关键字参数，使用正则表达式进行模糊匹配
      query.username = { $regex: keyword, $options: 'i' }; // i 表示不区分大小写
      query.ageRange = { $gte: ageRange[0], $lte: ageRange[1] };
      query.fieldToExactMatch = exactMatch;
    }

    const skip = (page - 1) * pageSize; // 计算跳过的记录条数

    // 使用Model的find方法进行查询，加上条件和分页参数
    const result = await ctx.model.Grades.find(query, { _id: 0, __v: 0 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // 获取符合条件的记录总数
    const total = await ctx.model.Grades.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize); // 计算总页数

    return {
      result,
      total,
      totalPages,
    };
  }

  async create(data) {
    const newUUID = uuid.v4();
    const { ctx } = this;
    const newDoc = { ...data, uuid: newUUID };

    const result = await ctx.model.Grades.create(newDoc);
    return result;
  }

  async updateOne(uuid, data) {
    const { ctx } = this;

    const result = await ctx.model.Grades.findOneAndUpdate({ uuid }, data, { new: true }); // { new: true } 返回更新后的文档
    return result;
  }

}

module.exports = GradesService;
