"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const OrderItemModel = database_1.sequelize.define("order_items", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: database_1.DataTypes.INTEGER,
        allowNull: false,
    },
    foodId: {
        type: database_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: database_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: database_1.DataTypes.FLOAT,
        allowNull: false,
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
exports.default = OrderItemModel;
