const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Cart extends Model {
  static init(sequelize) {
    return super.init(
      {
        qun: {
          type: DataTypes.INTEGER, // 수량
          defaultValue: 1,
          allowNull: false,
        },
      },
      {
        modelName: "Cart",
        tableName: "cart",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Cart.belongsTo(db.User);
    db.Cart.belongsTo(db.Product);
    db.Cart.belongsTo(db.ProductOption);
  }
};
