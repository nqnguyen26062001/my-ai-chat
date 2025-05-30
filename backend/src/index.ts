import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import ChatRouter from "./router/ChatRouter";
import cors from "cors"; 
import AuthRouters from "./router/AuthRouters";
import session from 'express-session';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(
      cors({
        origin: "http://localhost:3000", // or '*' to allow all origins
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } // Set to true if using HTTPS
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/api/chat", ChatRouter);
    this.app.use("/api/auth", AuthRouters);

  }
}

const port: number = 5000;
const app = new App().app;

app.listen(port, () => {
  console.log(" Server started successfully!");
});
