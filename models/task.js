'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Task = sequelize.define('Task', {
  //   title: DataTypes.STRING,
  //   category: DataTypes.STRING,
  //   ProjectId: DataTypes.INTEGER
  // }, {});
  class Task extends sequelize.Sequelize.Model { }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmty: {
      //     msg: `title must be filled`
      //   }
      // }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'prelog'
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Task'
  })
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Project)
  };
  return Task;
};