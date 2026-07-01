import { sequelize, DataTypes } from "../common/database";

const UserModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(245),
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    userName: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    profileLink: {
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

export default UserModel;
