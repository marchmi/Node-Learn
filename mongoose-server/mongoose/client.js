const DBClient = require('./index')
const client = new DBClient('mongodb://localhost:27017/', 'mongoose')

client.connect()

module.exports = client