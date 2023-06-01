const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Faq extends Model {
  static init(sequelize) {
    return super.init(
      {
        question: {
          type: DataTypes.STRING(200),
          allowNull: false, //필수
        },
        answer: {
          type: DataTypes.STRING(3000),
          allowNull: false, //필수
        },
        isUse: {
          type: DataTypes.BOOLEAN,
          allowNull: false, //필수
          defaultValue: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "Faq",
        tableName: "faq",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Faq.belongsTo(db.FaqType);
  }
};
