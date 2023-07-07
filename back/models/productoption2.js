const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductOption2 extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(3000),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "ProductOption2",
        tableName: "productOption2",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductOption2.belongsTo(db.Product);
  }
};
