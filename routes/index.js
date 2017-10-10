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
  let newProject = new Project({
    name: "test",
    techstack: ['c++','javascript']
  });
  newProject.save(function (err, project) {
    if (err) {
      res.send(err);
    } else {
      res.send(project);
    }
  });
});

module.exports = router;
