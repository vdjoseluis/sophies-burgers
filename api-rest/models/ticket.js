module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {      
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      delivery_option: {
        type: DataTypes.ENUM("delivery", "pickup"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "done"),
        defaultValue: "pending",
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      }
    },
    {
      tableName: "tickets",
      timestamps: false,
    }
  );

  return Ticket;
};
