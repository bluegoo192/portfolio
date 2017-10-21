var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = require('../database/models/project.js');
const secrets = require('../secrets.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/techs', function(req, res, next) {
  const techs = require('../database/techs.json');
  res.json(techs);
  res.status(200);
});

router.get('/api/projects/search', async function(req, res, next) {
  console.log(JSON.stringify(req.query));
  if (typeof req.query.uses === 'undefined') {
    res.status(400).send("You must specify a tech that the project uses");
  } else {
    let projects = await Project.find({ 'techstack': req.query.uses });
    res.send(projects);
  }
});

router.post('/api/projects/new', async function(req, res, next) {
  if (req.headers.authorization !== secrets.password) {
    res.sendStatus(401);
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
