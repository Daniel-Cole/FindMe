module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Friends", {
    userA: { //user A is always the user who initiated the request
    type: DataTypes.STRING,
    field: 'userA'
  },
    userB: { //userB is always the user who receives a request
    type: DataTypes.STRING,
    field: 'userB'
  },
  status: {
    type: DataTypes.INTEGER,
    field: 'status' //0 - requested, 1 - accepted, 2 - rejected, 3 - blocked
  }
}, {
  timestamps: false
})
}