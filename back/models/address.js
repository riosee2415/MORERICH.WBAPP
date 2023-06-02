const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Address extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },

        name: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },

        mobile: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },

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

        isBasic: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
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
