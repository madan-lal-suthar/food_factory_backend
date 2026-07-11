import { Sequelize, DataTypes } from "sequelize";

const POSTGRES_URL = "postgres://postgres:manager@postgres-db:5432/FoodFactory";
const sequelize = new Sequelize(POSTGRES_URL);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection Successful");
    } catch (error) {
        console.error("Unable to connect to database: ", error);
    }
}
connectDB()

export { connectDB, sequelize, Sequelize, DataTypes };