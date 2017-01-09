module.exports = function(sequelize, DataTypes) {
    return sequelize.define("LobbyMembers", {
        lobbyName: {
            type: DataTypes.STRING,
            field: 'lobbyname',
        },
        owner: {
            type: DataTypes.STRING,
            field: 'owner'
        },
        member: {
            type: DataTypes.STRING,
            field: 'member' //member should be unique
        },
        location: {
            type: DataTypes.STRING,
            field: 'location',
            defaultValue: "-1 -1"
        },
        lastUpdated: {
            type: DataTypes.STRING,
            field: 'lastUpdated',
            defaultValue: "awaiting first update..."
        }
    }, {
        timestamps: false
    })
}