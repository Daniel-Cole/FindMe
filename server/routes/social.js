var db = require('../models');

function blockPerson(req, res) {
    //block a person from attempting to add you as a friend
}

/* after authenticating with jwt we check the friend  */
function rejectFriendRequest(req, res) {
    var user = req.body.user;
    
    if(util.checkBody(req, ["friend"]).length > 0){
        return res.status(400).send({
            success: false,
            message: "missing parameter"
        });
    };

    var friend = req.body.friend;
    if (user == friend) {
        return res.status(400).send({
            success: false,
            message: 'You cannot reject yourself.'
        });
    }
    //TODO: 
    db.Friends.findOne({
        where: {

        }
    });
}

function removeFriend(req, res) {

}

function addFriend(req, res) {
    var user = req.body.user;
    var friend = req.body.friend;
    if (user == friend) {
        return res.status(400).send({
            success: false,
            message: 'You cannot add yourself as a friend'
        });
    }
    //check if friend exists
    db.User.findOne({
        where: {
            username: friend
        }
    }).then(function(result) {
        //check to see friend exists
        if (result.length == 0) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find friend'
            });
        }
        //check if a request has already been sent
        //if it has we can just set to accepted to add friend
        db.Friends.findOne({
            where: {
                status: 0,
                $or: [{
                    userA: user
                }, {
                    userA: friend
                }],
                $or: [{
                    userB: user
                }, {
                    userB: friend
                }]
            }
        }).then(function(result) {
            if (result) {
                //status will be 0
                result.status = 1; //accept the request
                result.save().then(function() {
                    return res.send({
                        success: true,
                        message: 'Friend request accepted'
                    });
                }).catch(function() {
                    return res.status(500).send({
                        success: false,
                        message: 'Unable to accept request'
                    });
                });
            } else {
                //create a request
                db.Friends.create({
                    userA: user,
                    userB: friend,
                    status: 0
                }).then(function() {
                    return res.send({
                        success: true,
                        message: 'Friend request accepted'
                    });
                }).catch(function(result) {
                    return res.status(500).send({
                        success: false,
                        message: 'Unable to create request'
                    });
                });
            }
        }).catch(function(result) {
            return res.status(500).send({
                success: false,
                message: 'Unable to make/accept request'
            });
        });
    }).catch(function(result) {
        return res.status(500).send({
            success: false,
            message: 'Unable to make/accept request'
        });
    });

}

function findFriends(req, res) {
    var friend = req.params.username;

    db.User.findAll({
        where: {
            username: {
                $like: friend + '%'
            }
        }
    }).then(function(result) {
        var friends = [];
        for (var i = 0; i < result.length; i++) {
            friends.push(result[i].username);
        }
        res.send(friends);
    }).catch(function(result) {
        res.status(500).send({
            success: false,
            message: 'Unable to find friends'
        });
    });
}

var social = {
    addFriend: addFriend,
    findFriends: findFriends
};

global.social = social;

module.exports = global.social;