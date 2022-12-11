const {
  auth,
  getEmail,
  getProjects,
  addProject,
  editProject,
  saveProject,
  deleteProject,
} = require('../controllers');
const BASE_API_URL = '/api/v1';
function route(app) {
  app.use(BASE_API_URL, auth);
  app.get(`${BASE_API_URL}/getEmail`, getEmail);
  app.get(`${BASE_API_URL}/getProjects`, getProjects);
  app.put(`${BASE_API_URL}/addProject`, addProject);
  app.put(`${BASE_API_URL}/editProject`, editProject);
  app.put(`${BASE_API_URL}/saveProject`, saveProject);
  app.delete(`${BASE_API_URL}/deleteProject/:id`, deleteProject);
}
module.exports = route;
