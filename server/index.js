var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser')


/* local libraries */
var db = require('./models');
var auth = require('./routes/auth');
var lobbies = require('./routes/lobbies');
var session = require('./routes/session');
var social = require('./routes/social');
var security = require('./scripts/security');


app.use(express.static(__dirname + '/public'));
app.use(cookieParser())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/* ROUTES */
// app.get('/', function(req, res) {
//     res.render('pages/index');
// });


/*Display the register page to the user*/
// app.get('/register', function(req, res) {
//     res.render('pages/register');
// });

/* user to register with login details*/
app.post('/rest/register', auth.register);


app.post('/rest/login', auth.login);

/*
app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/home', function(req, res) {
    res.render('pages/home');
})
*/

/* 
//display the map page 
app.get('/map', function(req, res) {
    res.render('pages/map')
});
*/

/*
app.get('/rest/getLobbies', function(req, res) {
    var lobby = [];
    for (var i = 0; i < 2; i++) {
        lobby.push({
            id: i,
            lobbyName: "bobs bbq",
            owner: "bob",
            authenticated: true
        });
    };
    return res.status(200).send(lobby);
});
*/

//app.post('/encryptLocation', security.encryptLocation);

//app.post('/rest/sendLocation', location.sendLocation);

//app.get('/rest/getLocations/:lobbyName', location.getLocations);

//app.get('/rest/findFriends/:username', social.findFriends);

//app.post('/rest/addFriend', social.addFriend);

app.get('/rest/lobbies', security.checkToken, lobbies.getLobbies);
//app.get('/rest/lobbies', lobbies.getLobbies);

app.get('/rest/sessions', security.checkToken, session.getLocations);
// app.get('/rest/sessions', session.getLocations);

app.post('/rest/sessions', security.checkToken, session.sendLocation);

app.post('/rest/createLobby', security.checkToken, lobbies.createLobby);
//app.post('/rest/createLobby', lobbies.createLobby);

app.post('/rest/joinLobby', security.checkToken, lobbies.joinLobby);
//app.post('/rest/joinLobby', lobbies.joinLobby);



/* start server */
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    //if we want to clear and have basic db setup..
    if (process.argv[2] == 'db') {
        basicDBSetup();
    }
});

function basicDBSetup() {
    //only for development purposes.
    console.log('running basic DB setp');
    db.sequelize.sync({
        force: true
    }).then(function() {
        db.Lobby.create({
            lobbyName: 'TOWN',
            owner: 'dan',
            password: security.hashPassword('pass'),
            lobbyToken: '1234'
        }).then(function() {
            db.Lobby.create({
                lobbyName: 'winners',
                owner: 'admin',
                password: security.hashPassword('pass'),
                lobbyToken: 'abc'
            }).then(function(result) {
                db.User.create({
                    username: 'dan',
                    password: security.hashPassword('pass')
                }).then(function(result) {
                    db.User.create({
                        username: 'bob',
                        password: security.hashPassword('pass')
                    })
                }).then(function(result) {
                    db.LobbyMembers.create({
                        lobbyName: 'winners',
                        owner: 'admin',
                        member: 'dan',
                        location: '-40.905452 175.006866'
                    })
                }).then(function(result) {
                    db.LobbyMembers.create({
                        lobbyName: 'winners',
                        owner: 'admin',
                        member: 'bob',
                        location: '-40.883615 174.998968'
                    });
                }).then(function(result) {
                    db.LobbyMembers.create({
                        lobbyName: 'winners',
                        owner: 'admin',
                        member: 'john',
                        location: '-40.908225 175.002721'
                    });
                });
            });
        });
    });
}