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
    ctx.body = `${JSON.stringify(ctx.query)}`;
  }

  async show() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.params)}`;
  }

  async create() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }

  async update() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.request.body)}`;
  }

  async destroy() {
    const { ctx } = this;
    ctx.body = `${JSON.stringify(ctx.request.body)}`;
  }
}

module.exports = GradesController;
