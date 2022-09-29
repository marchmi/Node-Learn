module.exports = {
    student: {
        name: String,
        age: Number,
        gender: {
            type: String,
            default: 'male'
        },
        addr: String
    },
    grade: {
        name: String,
        discribe: String,
        code: Number
    },
    class: {
        name: String,
        code: Number
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