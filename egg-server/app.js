const mongoosePaginate = require('mongoose-paginate-v2');
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded. 分页插件使用 https://www.jianshu.com/p/3e2b5fab5caa  npm：https://www.npmjs.com/package/mongoose-paginate-v2
    console.log('Config, plugin files have been loaded.---------------------------');
    const mongoose = this.app.mongoose;
    mongoose.plugin(mongoosePaginate);
  }
}

module.exports = AppBootHook;
