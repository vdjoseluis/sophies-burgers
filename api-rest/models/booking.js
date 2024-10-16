module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        "Booking",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            table_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date_booking: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time_booking: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            people: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("active", "cancelled", "done"),
                allowNull: false,
                defaultValue: "active",
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: "bookings",
            timestamps: false,
        }
    );

    return Booking;
}