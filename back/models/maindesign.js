const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MainDesign extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "MainDesign",
        tableName: "mainDesign",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
