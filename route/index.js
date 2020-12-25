module.exports = (app) => {
  const user = require('./user')
  const Crud = require('./crud')
  const crud = new Crud()
  app.post('/admin/login', user)
  app.post('/admin/logOut', user)
  app.get('/admin/rest/:mode/:resource', (req, res) => crud.send(req, res))
  app.post('/admin/rest/:mode/:resource', (req, res) => crud.send(req, res))
}

