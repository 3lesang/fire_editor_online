const {
  auth,
  getEmail,
  getProjects,
  addProject,
  editProject,
  saveProject,
  deleteProject,
} = require('../controllers');
function route(app) {
  app.use('/', auth);
  app.get('/getEmail', getEmail);
  app.get('/getProjects', getProjects);
  app.put('/addProject', addProject);
  app.put('/editProject', editProject);
  app.put('/saveProject', saveProject);
  app.delete('/deleteProject/:id', deleteProject);
}
module.exports = route;
