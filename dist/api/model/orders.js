"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const OrderModel = database_1.sequelize.define("orders", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    restaurantId: {
        type: database_1.DataTypes.INTEGER,
        allowNull: false,
    },
    customerName: {
        type: database_1.DataTypes.STRING(245),
        allowNull: false,
        defaultValue: "Guest",
    },
    deliveryAddress: {
        type: database_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    note: {
        type: database_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },
    status: {
        type: database_1.DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "pending",
    },
    total: {
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
exports.default = OrderModel;
