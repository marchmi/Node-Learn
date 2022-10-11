'use strict';

const { Service } = require('egg');

class GradesService extends Service {
  async find() {
    const { ctx } = this;
    const result = await ctx.model.Grades.paginate();
    return result;
  }

  async create(data) {
    const { ctx } = this;

    // 不可添加gradeCode取值相同的数据
    const grades = await ctx.model.Grades.find({ gradeCode: data.gradeCode });
    console.log(grades);
    if (grades.length) {
      return ctx.response.repetitive({ message: `已存在一条gradeCode为${data.gradeCode}的数据` });
    }

    const result = await ctx.model.Grades.create(data);
    return result;
  }
}

module.exports = GradesService;
