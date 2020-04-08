'use strict';
module.exports = (sequelize, DataTypes) => {
  // const UserProject = sequelize.define('UserProject', {
  //   ProjectId: DataTypes.INTEGER,
  //   UserId: DataTypes.INTEGER
  // }, {});
  class UserProject extends sequelize.Sequelize.Model { }
  UserProject.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserProject'
  })
  UserProject.associate = function (models) {
    // associations can be defined here
    UserProject.belongsTo(models.User, { foreignKey: 'UserId', targerKey: 'id' })
    UserProject.belongsTo(models.Project, { foreignKey: 'ProjectId', targerKey: 'id' })
  };
  return UserProject;
};