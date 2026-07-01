import { sequelize, DataTypes } from "../common/database";

const FoodProductModel = sequelize.define("food_products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mediaLink: {    
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    totalPrice: {
        
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 0
    },
    name: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
});

export default FoodProductModel;
