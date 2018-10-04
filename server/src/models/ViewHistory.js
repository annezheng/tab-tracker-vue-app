module.exports = (sequelize, DataType) => {
  const ViewHistory = sequelize.define('ViewHistory', {})

  ViewHistory.associate = function (models) {
    ViewHistory.belongsTo(models.User)
    ViewHistory.belongsTo(models.Song)
  }
  return ViewHistory
}
