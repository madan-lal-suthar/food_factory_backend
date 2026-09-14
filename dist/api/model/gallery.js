"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../common/database");
const GalleryModel = database_1.sequelize.define("gallery", {
    id: {
        type: database_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: database_1.DataTypes.STRING(245),
        allowNull: true,
        defaultValue: "",
    },
    image: {
        type: database_1.DataTypes.STRING(500),
        allowNull: true,
        defaultValue: "/bucket/gallery/default.jpg",
    },
    description: {
        type: database_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
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
exports.default = GalleryModel;
