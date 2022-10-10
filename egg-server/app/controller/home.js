'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this; // ctx.query get请求参数 ctx.request.body post请求提交参数
    const id = ctx.query.id;
    ctx.body = ctx.helper.formatUser(id || 'default'); //  Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例
  }
}

module.exports = HomeController;
