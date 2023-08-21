'use strict';

const { Controller } = require('egg');

/**
 * RESTful 风格的 URL与方法对照表
 * method     path                routeName     controller.action
 * GET        /grades             gardes        controller.grades.index   // 列表
 * GET        /grades/new         new_grade     controller.grades.new
 * GET        /grades/:id         grade         controller.grades.show    // 详情
 * GET        /grades/:id/edit    edit_grade    controller.grades.edit
 * POST       /grades             grades        controller.grades.create  // 新增
 * PUT        /grades/:id         grade         controller.grades.update  // 更新
 * DELETE     /grades/:id         grade         controller.grades.destroy // 删除
 */
class GradesController extends Controller {
  async index() {
    const { ctx } = this; // ctx.query get请求参数 ctx.request.body post请求提交参数
    // console.log(this.app.mongoose); // https://blog.csdn.net/sd19871122/article/details/122276538
    const result = await ctx.service.grades.find();
    // ctx.body = `${JSON.stringify(ctx.query)}`;
    ctx.body = result;
  }

  async show() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.params)}`;
  }

  async create() {
    const { ctx } = this;
    const result = await ctx.service.grades.create(ctx.request.body);
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const result = await ctx.service.grades.updateOne(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.body = { code: 201, message: `未查询到uuid：${ctx.params.id}相关的文档` }; // 采用RESTful风格的路由时，默认path参数为id
      return;
    }
    ctx.body = result;
  }

  async destroy() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.request.body)}`;
  }
}

module.exports = GradesController;
