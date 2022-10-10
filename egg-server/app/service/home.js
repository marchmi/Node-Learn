'use strict';

const { Service } = require('egg');

class HomeService extends Service {
  async index() {
    console.log(2);
  }
}

module.exports = HomeService;
