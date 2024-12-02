module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
          type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Customer",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      primaryAddress: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      secondaryAddress: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      city: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      state: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      country: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      zipCode: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    }, {
      tableName: "Users",
      timestamps: true,
    });
  };
  