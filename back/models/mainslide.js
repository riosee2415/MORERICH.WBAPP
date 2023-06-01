const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MainSlide extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "MainSlide",
        tableName: "mainSlide",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
