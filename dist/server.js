"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = __importDefault(require("./api/common/config"));
const middleware_1 = __importDefault(require("./api/middleware/middleware"));
const v1_routes_1 = __importDefault(require("./api/routes/v1.routes"));
const database_1 = require("./api/common/database");
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.default.PORT;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, express_fileupload_1.default)());
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, cors_1.default)());
        this.app.use(middleware_1.default.verifyToken);
        this.app.use(middleware_1.default.logAllRequests);
        this.app.use(middleware_1.default.printLogs);
    }
    initializeRoutes() {
        this.app.use("/api/v1/", v1_routes_1.default);
        this.app.use(middleware_1.default.handleError);
        this.app.use((req, res) => {
            res.status(404).send("API Not Found");
        });
    }
    start() {
        this.app.listen(this.port, async () => {
            await (0, database_1.connectDB)();
            database_1.sequelize.sync({ force: false }).then(() => {
                console.log("Database Connected Successfully");
            });
            console.log(`Node RESTful API server started on ${this.port}`);
        });
    }
}
const server = new Server();
server.start();
exports.default = server.app;
