const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductType2 extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(60),
          allowNull: false, // 필수
        },
        isDelete: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "ProductType2",
        tableName: "productType2",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductType2.belongsTo(db.ProductType);
  }
};
