'use strict';

const { Service } = require('egg');
const uuid = require('uuid');

class GradesService extends Service {
  async find() {
    const { ctx } = this;

    // 获取分页参数，默认是第一页，每页10条记录
    const { page = 1, limit = 10, keyword } = ctx.query;

    // 构建查询条件
    const query = {};
    if (keyword) {
      // 如果有关键字参数，使用正则表达式进行模糊匹配
      query.username = { $regex: keyword, $options: 'i' };
    }

    const skip = (page - 1) * limit; // 计算跳过的记录条数

    // 使用Model的find方法进行查询，加上条件和分页参数
    const result = await ctx.model.Grades.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    // 获取符合条件的记录总数
    const total = await ctx.model.Grades.countDocuments(query);

    return {
      result,
      total,
    };
  }

  async create(data) {
    const newUUID = uuid.v4();
    const { ctx } = this;

    // 不可添加gradeCode取值相同的数据
    const grades = await ctx.model.Grades.find({ gradeCode: data.gradeCode });
    console.log(grades);
    if (grades.length) {
      return ctx.response.repetitive({ message: `已存在一条gradeCode为${data.gradeCode}的数据` });
    }

    const newDoc = { ...data, uuid: newUUID };
    const result = await ctx.model.Grades.create(newDoc);
    return result;
  }

  async updateOne(uuid, data) {
    const { ctx } = this;

    const result = await ctx.model.Grades.findOneAndUpdate({ uuid }, data, { new: true });
    return result;
  }

}

module.exports = GradesService;
