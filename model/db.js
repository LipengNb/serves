const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/rule', { useNewUrlParser: true,  useUnifiedTopology:true })

const db =  mongoose.connection

db.on('error', console.error.bind(console, 'connection err:'))

module.exports = db