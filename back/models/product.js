const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        subName: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        thumbnail: {
          type: DataTypes.STRING(3000),
          allowNull: false, // 필수
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
        },
        detail: {
          type: DataTypes.STRING(2000),
          allowNull: false, // 필수
        },
        infoType: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        infoConsist: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        infoColor: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        infoSize: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        infoFrom: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        discount: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 0,
        },
        isNew: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: 0,
        },
        isBest: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: 0,
        },
        isRecomm: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: 0,
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
        modelName: "Product",
        tableName: "product",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.ProductType);
  }
};
