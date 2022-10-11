'use strict';
module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const GradesSchema = new Schema({
    gradeName: {
      type: String,
    },
    gradeCode: {
      type: String,
    },
    sort: {
      type: Number,
    },
    img: {
      type: String,
    },
    remarks: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    columnId: {
      type: Schema.Types.ObjectId,
    },
  }, { timestamps: true }); // { timestamps: true } 新增数据默认添加createdAt 和 updatedAt字段
  return mongoose.model('Grades', GradesSchema);
};
