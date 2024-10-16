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
      },
      delivery_option: {
        type: DataTypes.ENUM("delivery", "pickup"),
        allowNull: false,
      },
    },
    {
      tableName: "tickets",
      timestamps: false,
    }
  );

  return Ticket;
};
