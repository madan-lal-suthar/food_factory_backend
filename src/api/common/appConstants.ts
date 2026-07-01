import CONFIG from './config';
const appConstants :any = {
    // need to manage stripe account credentials and environment here
    jwtSecret: CONFIG.JWT_SECRET,
    jwtExpiredTime: "365days",
    jwtExpiresIn: '15m',


    FIREBASE_WEB_API_KEY: "",

    USER_TYPE: {
        USER: 1,
        ADMIN: 2,
    }

};

export default appConstants;