'use strict';

const { Service } = require('egg');

class GradesService extends Service {
  async find() {
    const result = await this.ctx.model.Grades.find();
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.Grades.create(data);
    return result;
  }
}

module.exports = GradesService;
