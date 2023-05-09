const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.use(bodyParser.json())

const calculatorRoute = require('./routes/calculatorRoute')
app.use('/calculator',calculatorRoute)


const server = app.listen(port,()=>{
    console.log("server started on port: " ,port)
})



module.exports = app.js