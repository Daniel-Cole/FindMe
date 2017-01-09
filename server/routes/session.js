/* The users location which is to be added to the database so it can be retrieved by other members of the lobby */
function sendLocation(req, res) {
    //encrypt the location here with the lobby password
    //store in db to correct lobby
    //we need auth token, username & lobby - NOT what it sends through, must validate
    var lobbyToken = req.query.lobbyToken;
    var username = req.decoded.username;

    var lat = req.body.lat;
    var lng = req.body.lng;

    db.Lobby.findOne({
        where: {
            lobbyToken: lobbyToken
        }
    }).then(function(lobby) {
        //can the user get to here if they aren't authenticated into the lobby?
        //yep, so need to make sure the user is a member of this lobby
        if (!lobby) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find lobby'
            });
        }
        db.LobbyMembers.findOne({
            where: {
                member: username,
                lobbyName: lobby.lobbyName,
                owner: lobby.owner
            }
        }).then(function(lobbyMember) {
            if (!lobbyMember) {
                //not a member of this lobby
                return res.status(403).send({
                    success: false,
                    message: 'You do not have access to this lobby'
                });
            }
            //user is a member of request lobby so let's update their location
            lobbyMember.location = "" + lat + " " + lng;
            console.log(lobbyMember);
            lobbyMember.save().then(function() {
                console.log("successfully updated user location");
                return res.status(200).send({
                    success: true,
                    message: 'successfully updated user location'
                })
            });
        })
    }).catch(function(error) {
        res.status(500).send({
            success: false,
            message: 'Failed to update location'
        });
    });
}

/* return all the current locations which are in the lobby */
function getLocations(req, res) {
    //authorise the user
    //will have to unencrypt before sending away given the lobby password which is supplied

    var lobbyToken = req.query.lobbyToken;

    db.Lobby.findOne({
        where: {
            lobbyToken: lobbyToken
        }
    }).then(function(lobby) {
        //unable to find lobby.
        if (!lobby) {
            return res.status(404).send({
                success: false,
                message: 'Unable to update locations, please reload lobby'
            });
        }
        console.log('found lobby !');
        console.log('attemtping to get members!');
        //need these details to look up, then after check authentication
        db.LobbyMembers.findAll({
            where: {
                lobbyName: lobby.lobbyName
            }
        }).then(function(lobbyMembers) {
            if (!lobbyMembers) {
                return res.status(404).send({
                    success: true,
                    message: 'no lobby members found'
                })
            }
            var session = {
                id: 0,
                lobbyName: lobby.lobbyName,
                owner: lobby.owner,
                lobbyMembers: []
            };
            //break this up
            for (var i = 0; i < lobbyMembers.length; i++) {
                var location = (lobbyMembers[i].location).split(" ");
                var lat = location[0];
                var lng = location[1];
                console.log(lat);
                console.log(lng);
                if (lat == -1 || lng == -1) {
                    //has not yet been updated
                    continue;
                }
                session.lobbyMembers.push({
                    id: i,
                    username: lobbyMembers[i].member,
                    location: {
                        'lat': lat,
                        'lng': lng
                    }
                });
            };
            console.log({
                session: session
            });
            res.status(200).send({
                session: session
            });
        })
    }).catch(function(error) {
        res.status(500).send({
            success: false,
            message: 'Failed to send coordinates'
        });
    });;
}

var session = {
    sendLocation: sendLocation,
    getLocations: getLocations
};

global.session = session;

module.exports = global.session;