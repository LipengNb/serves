const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// 解析请求体的数据
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 挂载路由
require('./route')(app)


app.listen(3090, () => {
  console.log('listen localhost:3090...')
})