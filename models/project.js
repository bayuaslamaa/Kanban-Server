'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Project = sequelize.define('Project', {
  //   title: DataTypes.STRING,
  //   UserId: DataTypes.INTEGER
  // }, {});
  class Project extends sequelize.Sequelize.Model { }
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project'
  })
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsToMany(models.User, { through: 'UserProject' })
    Project.hasMany(models.Task)
  };
  return Project;
};