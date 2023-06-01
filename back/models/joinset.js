const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class JoinSet extends Model {
  static init(sequelize) {
    return super.init(
      {
        point: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
        },
        pointPer: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: false,
        },
      },
      {
        modelName: "JoinSet",
        tableName: "joinSet",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
