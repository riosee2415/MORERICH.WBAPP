const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Address extends Model {
  static init(sequelize) {
    return super.init(
      {
        post: {
          type: DataTypes.STRING(10),
          allowNull: false, // 필수
        },

        adrs: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },

        dadrs: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "Address",
        tableName: "address",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Address.belongsTo(db.User);
  }
};
