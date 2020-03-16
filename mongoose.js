const connectionString = 'SECRET'
const mongoose = require('mongoose')
mongoose.connect(connectionString)

module.exports = mongoose