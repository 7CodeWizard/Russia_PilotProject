const app = require('./express')
const mongoose = require('mongoose')
const config = require('./config/config')

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`Server started on port ${config.port}`)
})