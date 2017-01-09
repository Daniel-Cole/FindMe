module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Lobby", {
    lobbyName: {
    type: DataTypes.STRING,
    field: 'lobbyname',
    unique: true
  },
    owner: {
    type: DataTypes.STRING,
    field: 'owner'
  },
  password: {
    type: DataTypes.STRING,
    field: 'password'
  }, 
  lobbyToken: {
    type: DataTypes.STRING,
    field: 'lobbyToken'
  }
}, {
  timestamps: false
})
}