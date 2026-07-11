"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || "development";
exports.default = (() => {
    console.log("Environment:", process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
        case "development":
            return {
                DB_HOST: 'localhost',
                DB_USER: 'root',
                DB_PASSWORD: 'manager',
                DB: 'demo3',
                PORT: 5050,
                BASR_URL: '',
                WEB_BASE_URL: 'http://localhost:3000',
                JWT_SECRET: "KDSkjfKDKD545FERIR4",
                SEND_BIRD_KEY: "",
                AWS_ACCESS_KEY: "",
                AWS_SECRET_ACCESS_KEY: "",
                AWS_REGION: "",
                FIREBASE_CONFIG: "",
                FIREBASE_DB: "",
                S3BUCKET_FOLDER: "development"
            };
        default:
            return {
                DB_HOST: 'localhost',
                DB_USER: 'root',
                DB_PASSWORD: 'manager',
                DB: 'demo3',
                PORT: 3001,
                BASR_URL: '',
                WEB_BASE_URL: '',
                JWT_SECRET: "",
                SEND_BIRD_KEY: "",
                AWS_ACCESS_KEY: "",
                AWS_SECRET_ACCESS_KEY: "",
                AWS_REGION: "",
                FIREBASE_CONFIG: "",
                FIREBASE_DB: "",
            };
    }
})();
// export default config;
