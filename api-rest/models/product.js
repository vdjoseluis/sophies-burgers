module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },        
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },        
    }, {
        tableName: 'products',
        timestamps: false,  
    });    

    return Product;
};
