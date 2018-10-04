const bcrypt = require('bcrypt-nodejs')

function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }
  var hash = bcrypt.hashSync(user.password)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    email: {
      type: DataType.STRING,
      unique: true
    },
    password: DataType.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
