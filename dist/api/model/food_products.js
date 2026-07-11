"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const FoodProductModel = database_1.sequelize.define("food_products", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mediaLink: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    totalPrice: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    categoryId: {
        type: database_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    name: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    description: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    isDeleted: {
        type: database_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    createdAt: {
        type: database_1.DataTypes.DATE,
        defaultValue: database_1.DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: database_1.DataTypes.DATE,
        defaultValue: database_1.DataTypes.NOW,
        allowNull: false,
    },
});
exports.default = FoodProductModel;
