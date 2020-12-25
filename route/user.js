const express = require('express')
const app = express()
// const session = require('express-session')
const route = express.Router()
const accountModel = require('../model/account')

route.post('/admin/login', async (req, res) => {
  const body = req.body
  const userInfo = await accountModel.findOne(body)
  if (userInfo === null) {
    res.send({ code: 201, message: '账号或密码输入错误 请重新输入!' })
  }
  res.setHeader('token', userInfo._id)
  res.send({
    code: 200,
    message: 'success',
    data: userInfo
  })
})

route.post('/admin/logOut', async (req, res) => {
  res.send({
    code: 200,
    message: 'success'
  })
})

module.exports = route