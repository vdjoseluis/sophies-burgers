module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    "Table",
    {
      people: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reserved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "tables",
      timestamps: false,
    }
  );

  return Table;
};
