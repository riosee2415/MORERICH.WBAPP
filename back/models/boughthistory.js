const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        deliveryCompany: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
          defaultValue: "-",
        },
        deliveryNo: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
          defaultValue: "-",
        },

        //          0 => 상품 준비중
        //          1 => 배송 준비중
        //          2 => 배송중
        //          3 => 배송완료
        //          4 => 취소/환불
        status: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 0,
        },
      },
      {
        modelName: "BoughtHistory",
        tableName: "boughtHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtHistory.belongsTo(db.User);
  }
};
