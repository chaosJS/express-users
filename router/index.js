// user route
const UserRouter = require('./user')
const projectsRouter = require('./projects')

// 
module.exports = (app) => {
  app.use('/api', UserRouter)
  app.use('/projects', projectsRouter)
}