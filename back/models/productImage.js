const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        filepath: {
          type: DataTypes.STRING(3000),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "ProductImage",
        tableName: "productImage",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductImage.belongsTo(db.Product);
  }
};
