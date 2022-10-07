function nameLength(arg){
    if(arg.length>4){
      return true
    }
    return false
}

module.exports = {
    student: {
        name: {
            type: String,
            required: true,
            validate: nameLength // 自定义校验规则
        },
        age: {
            type: Number,
            min: 0,     // 设置最大值，最小值
            max: 28
        },
        gender: {
            type: String,
            default: 'male', // 设置默认值
            enum:['male','women','unknow'] // 枚举匹配，值必须在枚举值当中
        },
        addr: {
            type: String,
            match:/四川/    // 正则匹配，值应当包含四川
        }
    },
    grade: {
        gradeName: {  // 2022级
            type: String,
            required: true,
            validate: nameLength
        },
        gradeCode: {  // 2022
            type: Number,
            required: true
        },
        describe: String
    },
    class: {
        className: String,
        classCode: Number,
        gradeCode: Number,
        describe: String
    },
    teacher: {
        name: String,
        age: Number,
        gender: {
            type: String,
            default: 'male',
        },
        phone: String,
        addr: String
    }
}