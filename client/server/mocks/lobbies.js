module.exports = function(app) {
	var express = require('express');
	var projectRouter = express.Router();

	projectRouter.get('/lobbies', function(req, res) {
		res.status(200).send({
			'lobby': [{
				'id': 1,
				'lobbyName': 'towwwwwn',
				'owner': 'cookie',
				'authenticated': true
			}, {
				'id': 2,
				'lobbyName': 'trip to the zoo',
				'owner': 'dan',
				'authenticated': false
			}, {
				'id': 3,
				'lobbyName': 'bobs big party!',
				'owner': 'Bob',
				'authenticated': false
			}, {
				'id': 4,
				'lobbyName': 'Rosscoes flat warming',
				'owner': 'Ross',
				'authenticated': true
			}, {
				'id': 5,
				'lobbyName': 'The GREAT BARBEQUE',
				'owner': 'The Kid',
				'authenticated': true
			}, {
				'id': 6,
				'lobbyName': '21',
				'owner': 'TaylorSwift',
				'authenticated': false
			}]
		});
	});

	projectRouter.post('/joinLobby', function(req, res) {
		console.log('attempting to join lob');
		//each lobby created should generate a unique 32bit hash
		return res.status(200).send({
			'lobbyHash': 'xJg434asdxaz'
		});
	});

	projectRouter.get('/register', function(req, res) {
		return res.status(200).send('register MOCK');
	});

	//this should return a big chunk of information:
	//every user and their location
	//LobbySession: 
	//JSON array of users and their location

	projectRouter.get('/sessions', function(req, res) {
		console.log(req.param('lobbyHash'));
		//so, we click join lobby, 
		//first if no password is specified, we must check
		//that the user is authenticated
		//if the user isn't authenticated then 
		//check if the password matches the lobby password
		//if it does, then we grant the user access
		//Table UserLobbies: lobbyName, username, authenticated?
		//Table lobby: lobbyName, password, owner
		//user attempts to connect to lobby, check password, 
		//if UserLobbies includes username with authenticated =true, then OK
		//-41.287790, 174.774235
		//-41.283840, 174.775522
		//-41.294643, 174.777596
		//-41.258444, 174.865592
		//always send self as first location..
		//search lobby by the hash
		res.status(200).send({
			'session': [{
				'id': 1,
				'lobbyName': 'Bobs BBQ',
				'owner': 'Bob',
				'lobbyMembers': [{
					'id': 0,
					'lastUpdated': 2000,
					'username': 'bob',
					'location': {
						'lat': -41.287790,
						'lng': 174.774235
					}
				}, {
					'id': 1,
					'username': 'dan',
					'lastUpdated': 8000,
					'location': {
						'lat': -41.283840,
						'lng': 174.775522
					}
				}, {
					'id': 2,
					'username': 'ross',
					'lastUpdated': 4200,
					'location': {
						'lat': -41.294643,
						'lng': 174.777596
					}
				}, {
					'id': 3,
					'username': 'cookie',
					'lastUpdated': 25000,
					'location': {
						'lat': -41.258444,
						'lng': 174.865592
					}
				}]
			}]
		});
	});

	projectRouter.post('/sessions', function(req, res) {
		console.log('updating SESSION!');
		console.log(req.body.lat);
		console.log(req.body.lng);
		return res.status(200).send('updated OK!');
	});

	//updates all the information:
	//users & locations
	//in future definitely use a hex string for a lobby ID 
	//and dervied hex string for owner
	projectRouter.get('/lobbies/:lobbyName/:owner/update', function(req, res) {

	});

	projectRouter.post('/createLobby', function(req, res) {
		console.log('hi');
		console.log(req.body);
		return res.status(200).send('hi');
	});

	projectRouter.post('/login', function(req, res) {
		console.log('login endpoint');
		console.log(req.body);
		return res.status(200).send('hi');
	});
	app.use('/rest', require('body-parser').urlencoded());
	app.use('/rest', require('body-parser').json());
	app.use('/rest', projectRouter);
};