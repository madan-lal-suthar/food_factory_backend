"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const RestaurantModel = database_1.sequelize.define("restaurants", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: database_1.DataTypes.STRING(245),
        allowNull: false,
        defaultValue: "",
    },
    description: {
        type: database_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    image: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: "/bucket/restaurants/default.jpg",
    },
    category: {
        type: database_1.DataTypes.STRING(245),
        allowNull: true,
        defaultValue: "",
    },
    rating: {
        type: database_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
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
exports.default = RestaurantModel;
