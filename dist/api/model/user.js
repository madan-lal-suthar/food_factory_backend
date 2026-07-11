"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const UserModel = database_1.sequelize.define("User", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: database_1.DataTypes.STRING(245),
        allowNull: false,
        unique: false,
    },
    email: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    userName: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    password: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: ""
    },
    profileLink: {
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
exports.default = UserModel;
