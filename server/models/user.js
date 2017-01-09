module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username: {
    type: DataTypes.STRING,
    field: 'username',
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    field: 'password'
  }, 
  email: {
  	type: DataTypes.STRING,
  	field: 'emailaddress',
  	unique: true
  },
  securityQuestion: {
  	type: DataTypes.STRING,
  	field: 'securityquestion'
  },
  securityAnswer: {
  	type: DataTypes.STRING,
  	field: 'securityanswer'
  }, 
  token: {
    type: DataTypes.STRING,
    field: 'token' //need a token field to ensure only 1 token is valid per user
  }
})
}