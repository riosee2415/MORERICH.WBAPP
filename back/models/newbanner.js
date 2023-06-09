const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class NewBanner extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },

        url: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },

        info: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },

        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "NewBanner",
        tableName: "newBanner",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
