'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const GradesSchema = new Schema({
    uuid: {
      type: String,
    },
    gradeName: {
      type: String,
    },
    gradeCode: {
      type: String,
      unique: true,
    },
    sort: {
      type: Number,
    },
    img: {
      type: String,
    },
    remark: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  }, { timestamps: true }); // { timestamps: true } 新增数据默认添加createdAt 和 updatedAt字段
  return mongoose.model('Grades', GradesSchema);
};
