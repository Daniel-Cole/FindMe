var db = require('../models');
var security = require('../scripts/security')
var crypto = require('crypto');
var util = require('../scripts/util');

function joinLobby(req, res) {
    //check for missing arguments
    if (util.checkBody(req, ["owner", "lobbyName"]).length > 0) {
        return res.status(400).send({
            success: false,
            message: "missing parameter"
        });
    };
    var username = req.decoded.username;
    var owner = req.body.owner;
    var lobbyName = req.body.lobbyName;
    var password = req.body.password;

    db.Lobby.findOne({
        where: {
            lobbyName: lobbyName,
            owner: owner
        }
    }).then(function(lobby) {
        //also need to check that lobby exists
        if (!lobby) {
            return res.status(404).send({
                success: false,
                message: 'Lobby not found'
            });
        }

        //also need to check if member already exists!
        //currently can join lobby multiple times
        db.LobbyMembers.findOne({
            where: {
                lobbyName: lobbyName,
                owner: owner,
                member: username
            }
        }).then(function(lobbyMember) {
            if (lobbyMember) {
                //since they are already a member, 
                //just return the lobby token
                return res.status(200).send({
                    lobbyToken: lobby.lobbyToken
                });
            }
            //need to check that user has supplied valid password
            var hash = lobby.password;
            if (!security.checkPassword(password, hash)) {
                //password incorrect
                return res.status(403).send({
                    success: false,
                    message: 'Invalid password'
                });
            }
            //password matched, add user to lobby
            db.LobbyMembers.create({
                lobbyName: lobbyName,
                owner: owner,
                member: username
            }).then(function(result) {
                console.log(lobby.lobbyToken);
                //we have joined the lobby successfully
                return res.status(200).send({
                    lobbyToken: lobby.lobbyToken
                });
            }).catch(function(result) {
                return res.status(500).send({
                    success: false,
                    message: 'Unable to join lobby: ' + lobbyName
                });
            });
        });
    }).catch(function(result) {
        return res.status(500).send('Unable to join lobby');
    });
}

function createLobby(req, res) {
    //check for missing arguments
    console.log(req.body);
    if (util.checkBody(req, ["lobbyName", "password"]).length > 0) {
        return res.status(400).send({
            success: false,
            message: "missing parameter"
        });
    };

    var token = crypto.randomBytes(5).toString('hex');
    //chance of collisions is so low that it's not worth worrying about
    db.Lobby.findOne({
        where: {
            lobbyToken: token
        }
    }).then(function(lobby) {
        if (!lobby) {
            //token is unique, so we can create the lobby
            var lobbyName = req.body.lobbyName;
            var username = req.decoded.username;
            var password = req.body.password;

            db.Lobby.create({
                lobbyName: lobbyName,
                owner: username,
                password: security.hashPassword(password),
                lobbyToken: token
            }).then(function(lobby) {
                //now we need to also add the creator as a lobby member
                db.LobbyMembers.create({
                    lobbyName: lobbyName,
                    owner: username,
                    member: username
                }).then(function(lobbyMember) {
                    return res.status(200).send({
                        lobbyToken: token
                    });
                })

            }).catch(function(result) {
                console.log(result);
                return res.status(500).send({
                    success: false,
                    message: 'Unable to create lobby'
                });
                //TODO: make server based errors provide more meaningful messages
                //such as - name already in use
            });
        }
    });

}

/* get a lobby given a username */
function getLobbies(req, res) {
    //will return a list of all the lobbies a user is part of
    //jwt gets verified then decoded to reveal current username
    var username = req.decoded.username;

    db.LobbyMembers.findAll({
        where: {
            member: username
        }
    }).then(function(result) {
        console.log('returning results');
        var lobby = [];
        for (var i = 0; i < result.length; i++) {
            lobby.push({
                id: i,
                lobbyName: result[i].lobbyName,
                owner: result[i].owner,
                authenticated: true
            });
        };
        res.status(200).send({
            lobby: lobby
        });
    }).catch(function(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Unable to get lobbies'
        });
    });


};

var lobbies = {
    createLobby: createLobby,
    joinLobby: joinLobby,
    getLobbies: getLobbies
};

global.lobbies = lobbies;

module.exports = global.lobbies;