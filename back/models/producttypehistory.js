const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductTypeHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING(60),
          allowNull: false, // 필수
        },
        prevValue: {
          type: DataTypes.STRING(60),
          allowNull: false, // 필수
        },
        nextValue: {
          type: DataTypes.STRING(60),
          allowNull: false, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "ProductTypeHistory",
        tableName: "productTypeHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
