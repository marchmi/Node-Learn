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
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
    columnId: {
      type: Schema.Types.ObjectId,
    },
  });
  return mongoose.model('Grades', GradesSchema);
};
