const mongoose = require('mongoose');
const validTechs = require('../techs.json');

const projectSchema = mongoose.Schema({
  name: String,
  short_description: String,
  link: String,
  github_link: String,
  full_description: String,
  main_image_link: String,
  images: Array,
  techstack: {
    type: Array,
    validate: {
      validator: function (techs) {
        for (tech of techs) {
          if (typeof validTechs[tech] === 'undefined') {
            console.log("error at " + tech);
            return false;
          }
        }
        return true;
      },
      message: 'Contains invalid tech in the stack'
    }
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
