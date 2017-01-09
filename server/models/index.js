var Sequelize = require('sequelize');
//postgres address used for development. 
var sequelize = new Sequelize(process.env.DATABASE_URL || '<URL>', {
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user'),
    Lobby: sequelize.import(__dirname + '/lobby'),
    LobbyMembers: sequelize.import(__dirname + '/lobbyMembers'),
    Friends: sequelize.import(__dirname + '/friends')

};

module.exports = global.db;