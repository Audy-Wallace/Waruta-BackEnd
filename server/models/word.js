'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Word.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    color: DataTypes.STRING,
    ingredient: DataTypes.STRING,
    taste: DataTypes.STRING,
    clue: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};