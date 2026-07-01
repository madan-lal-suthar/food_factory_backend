import { sequelize, DataTypes } from "../common/database";

const ChefModel = sequelize.define("Chef", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    profileLink: {    
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue : ""
    },
    name: {
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

export default ChefModel;
