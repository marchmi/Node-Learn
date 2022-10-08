const string = String,
      number = Number,
      boolean = Boolean

module.exports = {
    users: {
        fields: {
            password: { type: string, required: true, validate: [ 'nameLength' ] },
            username: { type: string, required: true, validate: [ ] },
        },
        login: [ 'password' , 'username' ],
        detail: [ 'password' , 'username' , 'createAt' , 'updateAt' ]
    },
}