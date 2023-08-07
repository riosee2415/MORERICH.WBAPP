const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MainSlideProduct extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 1,
        },
      },
      {
        modelName: "MainSlideProduct",
        tableName: "mainSlideProduct",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.MainSlideProduct.belongsTo(db.MainSlide);
    db.MainSlideProduct.belongsTo(db.Product);
  }
};
