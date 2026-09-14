"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const ReviewModel = database_1.sequelize.define("reviews", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerName: {
        type: database_1.DataTypes.STRING(245),
        allowNull: false,
        defaultValue: "Guest",
    },
    rating: {
        type: database_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 5,
    },
    comment: {
        type: database_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    restaurantId: {
        type: database_1.DataTypes.INTEGER,
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
exports.default = ReviewModel;
