module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {      
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "items",
      timestamps: false,
    }
  );

  return Item;
};
