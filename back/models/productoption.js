const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductOption extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(3000),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "ProductOption",
        tableName: "productOption",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductOption.belongsTo(db.Product);
  }
};
