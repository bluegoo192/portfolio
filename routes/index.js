var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = require('../database/models/project.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/search', async function(req, res, next) {
  res.send('hi');
});

router.post('/api/newproject', async function(req, res, next) {
  if (req.headers.Authorization !== "lpkoji") {
    res.send(401);
    return;
  }
  let newProject = new Project(req.body.project);
  newProject.save(function (err, project) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(project);
    }
  });
});

module.exports = router;
