var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'Home | ABC Consulting',
        welcomeMessage: 'Welcome home',
        projectsExecuted: [
          'Project 1',
          'Project 2',
          'Project 3'
        ]
    });
});

module.exports = router;
