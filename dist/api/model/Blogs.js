"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const BlogModel = database_1.sequelize.define("blogs", {
    id: {
        type: database_1.DataTypes.UUID,
        defaultValue: database_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: database_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: database_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: database_1.DataTypes.STRING(50),
        allowNull: true,
    },
    published: {
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
exports.default = BlogModel;
