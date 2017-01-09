/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var projectRouter = express.Router();

  projectRouter.get('/', function(req, res) {
    res.send({
      'project': []
    });
  });

  projectRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  projectRouter.get('/:id', function(req, res) {
    res.send({
      'project': {
        id: req.params.id
      }
    });
  });

  projectRouter.put('/:id', function(req, res) {
    res.send({
      'project': {
        id: req.params.id
      }
    });
  });

  projectRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  app.use('/rest/project', require('body-parser').json());
  app.use('/rest/project', projectRouter);
};
