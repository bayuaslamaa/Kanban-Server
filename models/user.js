'use strict';
module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  class User extends sequelize.Sequelize.Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: `the email must be filled`
        },
        notEmpty: {
          msg: `the email must not an empty string`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `the password is required`
        },
        notEmpty: {
          msg: `the password must not an empty string`
        }
      }
    }
  }
    , {
      sequelize,
      modelName: 'User'
    })
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Project, { through: 'UserProject' })
  };
  return User;
};