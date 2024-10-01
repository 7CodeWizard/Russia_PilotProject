const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const compress = require('compression')
const mainRouter = require('./routes/mainRouter')
const path = require('path')


const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(compress())
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')))

app.use('/', mainRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = app