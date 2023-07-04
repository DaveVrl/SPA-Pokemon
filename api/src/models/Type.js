const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type',{ 
        id: {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM("normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"),
            allowNull: false
        }
    }, { timestamps: false });
}