const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define("Accounts", {
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "Accounts",
    timestamps: true,
  });
  
  return Accounts;
};
