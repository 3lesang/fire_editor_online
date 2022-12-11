const { loginClient } = require('../config');
const dbo = require('../db');
const ObjectID = require('mongodb').ObjectID;
async function auth(req, res, next) {
  try {
    const ticket = await loginClient.verifyIdToken({
      idToken: req.headers.authorization.split('Bearer ')[1],
      audience: process.env.CLIENT_ID,
    });
    req.email = ticket.getPayload().email;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
async function getEmail(req, res) {
  res.status(200).json({ email: req.email });
}
function getProjects(req, res) {
  const db = dbo.getDb();
  db.collection('projects')
    .find({ owner: req.email })
    .toArray((err, response) => {
      if (err) {
        res
          .status(400)
          .json({ error: 'Unable to get project. Try again later!' });
      } else {
        res.status(200).json(response);
      }
    });
}
function addProject(req, res) {
  const db = dbo.getDb();
  let data = {
    owner: req.email,
    name: req.body.name,
    framerate: req.body.framerate,
    width: req.body.width,
    height: req.body.height,
  };
  db.collection('projects').insertOne(data, (err, response) => {
    if (err) {
      res
        .status(400)
        .json({ error: 'Unable to create project. Try again later!' });
    } else if (response.insertedId) {
      res.status(200).json(data);
    } else {
      res
        .status(500)
        .json({ error: 'Unable to create project. Try again later!' });
    }
  });
}
function editProject(req, res) {
  const db = dbo.getDb();
  let data = {
    _id: new ObjectID(req.body._id),
    owner: req.email,
    name: req.body.name,
    framerate: req.body.framerate,
    width: req.body.width,
    height: req.body.height,
  };
  db.collection('projects').findOneAndUpdate(
    { _id: new ObjectID(data._id), owner: req.email },
    { $set: data },
    (err, response) => {
      if (err) {
        res
          .status(400)
          .json({ error: 'Unable to edit project. Please try again!' });
      } else {
        res.status(200).json(response);
      }
    }
  );
}
function saveProject(req, res) {
  const db = dbo.getDb();
  const update = {
    $set: {
      mediaList: req.body.mediaList,
      trackList: req.body.trackList,
    },
  };
  const query = { projectId: req.body.projectId };
  const options = { upsert: true };

  db.collection('projectFiles').updateOne(
    query,
    update,
    options,
    (err, response) => {
      if (err) {
        res
          .status(500)
          .json({ error: 'Unable to save project to cloud. Try again later!' });
      } else if (response.matchedCount === 1 || response.upsertedCount === 1) {
        res
          .status(200)
          .json({ success: 'Project has been saved successfully!' });
      } else {
        res
          .status(500)
          .json({ error: 'Unable to save project to cloud. Try again later!' });
      }
    }
  );
}
function deleteProject(req, res) {
  const db = dbo.getDb();
  const query = {
    _id: new ObjectID(req.params.id),
    owner: req.email,
  };
  db.collection('projects').deleteOne(query, (err, response) => {
    if (err) {
      res
        .status(400)
        .json({ error: 'Unable to delete project. Try again later!' });
    } else {
      db.collection('projectFiles').deleteOne(
        { projectId: req.params.id },
        (err, response) => {
          if (err) {
            res
              .status(400)
              .json({ error: 'Unable to delete project. Try again later!' });
          } else {
            res
              .status(200)
              .json({ success: 'Project has been successfully deleted.' });
          }
        }
      );
    }
  });
}
module.exports = {
  auth,
  getEmail,
  getProjects,
  addProject,
  editProject,
  saveProject,
  deleteProject,
};
