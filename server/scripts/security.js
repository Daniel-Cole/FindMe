var cryptoJS = require('crypto-js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');
var db = require('../models');
//maybe use bcrypt instead for hashing passwords
/* Encrypt gps coordinates using AES */
/* after encryption only ever store one location of a user at a time */
function encryptLocation(req, res) {
    //uses AES256 with key given
    console.log(req.body);
    var text = req.body.location;
    var key = req.body.key;
    var encryptedData = cryptoJS.AES.encrypt(text, key).toString();

    res.send({
        success: true,
        message: 'location has been encrypted'
    });
}

/* decrypt location when sending out to user */
function decryptLocation(text, key) {
    var decryptedData = cryptoJS.AES.decrypt(text, key).toString(cryptoJS.enc.Utf8);
    return decryptedData;
}

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

//returns true if hash & password match
function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

/* This function will return a JWT that will last for 24 hours
    The token is also stored in the User table to ensure that 
    users don't mass create tokens which can be used to access the API.
    The user is the user object which is being authenticated
    The type of token being requested will either be a login or lobby token
    Details is option to be added on in the case of a lobby
 */
function createToken(req, res, user, type, details) {
    var token = jwt.sign({
        username: user.username,
        time: Date.now(),
        type: type,
        details: details
    }, config.secret, {
        expiresIn: config.expiry_time // 24 hr expiry
    });

    //create token for user in login
    user.token = token;
    user.save().then(function(user) {
        return res.send({
            success: true,
            message: 'Authentication success: Token issued',
            token: token
        });
    }).catch(function(user) {
        return res.status(500).send({
            success: false,
            message: 'Unable to save token'
        });
    });


}

/* checks that the token is valid and then proceed with the next function 
    used before doing anything that requires authentication
*/
function checkToken(req, res, next) {
    //session token which will correspond to a particular user. 
    var token = req.cookies.token;
    console.log(req);
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'Unable to find valid token. Please log-in again.'
        });
    }

    //verify token exists in the database

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) { //here we will redirect the user to the login page
            return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token. Please log-in again.'
            });
        } else {
            req.decoded = decoded;
            //make sure that the token matches the token given
            db.User.findOne({
                where: {
                    username: decoded.username
                }
            }).then(function(result) {
                //since result exists, make sure that token matches
                if (token == result.token) {
                    //token is valid, proceed to route
                    return next();
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'Invalid token. Please log-in again.'
                    });
                }

            }).catch(function(result) {
                return res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token. Please log-in again.'
                });
            });
        }
    });


}


var security = {
    encryptLocation: encryptLocation,
    decryptLocation: decryptLocation,
    hashPassword: hashPassword,
    checkPassword: checkPassword,
    createToken: createToken,
    checkToken: checkToken
};

global.security = security;

module.exports = global.security;