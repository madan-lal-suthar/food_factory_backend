import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import config from "./api/common/config";
import Middleware from "./api/middleware/middleware";
import v1 from "./api/routes/v1.routes";
import { connectDB, sequelize } from  "./api/common/database";

class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(fileUpload());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(express.static('public'));
    this.app.use(cors());
    this.app.use(Middleware.verifyToken);
    this.app.use(Middleware.logAllRequests);
    this.app.use(Middleware.printLogs);
  }
  initializeRoutes() {
    this.app.use("/api/v1/", v1);
    this.app.use(Middleware.handleError);
    this.app.use((req : express.Request, res : express.Response) => {
      res.status(404).send("API Not Found");
    });
  }

  start() {
    this.app.listen(this.port, async() => {
      await connectDB();
      sequelize.sync({ force: false }).then(() => {
        console.log("Database Connected Successfully");
      });
      console.log(`Node RESTful API server started on ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
export default server.app;
