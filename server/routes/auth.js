var security = require('../scripts/security.js')
var db = require('../models');
var util = require('../scripts/util');

function login(req, res) {
    console.log("attempting to log user in");
    //check for missing arguments
    if(util.checkBody(req, ["username","password"]).length > 0){
        return res.status(400).send({
            success: false,
            message: "missing username or password"
        });
    };

    var username = req.body.username;
    var password = req.body.password;

    db.User.findOne({
        where: {
            username: username
        }
    }).then(function(user) {
        if (!user) {
            //no user found
            return res.status(404).send({
                success: false,
                message: 'failed to find user'
            });
        }
        //user found, check p/w matches hash
        if (!security.checkPassword(password, user.password)) {
            //didn't match
            return res.status(403).send({
                success: false,
                message: 'invalid password'
            })
        }
        //user found p/w matches, type is to specify whether or not it's for a lobby
        return security.createToken(req, res, user, 'login');
    }).catch(function(user) {
        console.log(user);
        return res.status(500).send({
            success: false,
            message: 'failed to authenticate user'
        });
    });
}

function register(req, res) {
    console.log("registering user");
    console.log(req.body);
    //check for missing arguments
    if(util.checkBody(req, ["username","password","email","securityQuestion","securityAnswer"]).length > 0){
        return res.status(400).send({
            success: false,
            message: "missing parameter"
        });
    };

    var username = req.body.username;
    var password = security.hashPassword(req.body.password);
    var email = req.body.email;
    var securityQuestion = req.body.securityQuestion;
    var securityAnswer = req.body.securityAnswer;

    db.User.create({
        username: username,
        password: password,
        email: email,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer
    }).then(function(user) {
        return res.send({
            success: true,
            message: 'Welcome to FindMe, ' + username + '!'
        });
    }).catch(function(user) {
        return res.status(500).send({
            success: false,
            message: 'Unable to register user'
        });
    });
}

var auth = {
    register: register,
    login: login
};

global.auth = auth

module.exports = global.auth