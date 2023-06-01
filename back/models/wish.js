const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Wish extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        modelName: "Wish",
        tableName: "wish",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Wish.belongsTo(db.User);
    db.Wish.belongsTo(db.Product);
  }
};
