const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("transactions", {
        transactionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('completed', 'pending', 'failed'),
            allowNull: false,
        },
        oldBalance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        newBalance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        tableName: "Transactions",
        timestamps: true,
    });
};
