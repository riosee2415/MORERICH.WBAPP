const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoughtList extends Model {
  static init(sequelize) {
    return super.init(
      {
        productName: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
        },
        option: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
          defaultValue: "-",
        },
        thumbnail: {
          type: DataTypes.STRING(3000),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "BoughtList",
        tableName: "boughtList",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtList.belongsTo(db.BoughtHistory);
  }
};
