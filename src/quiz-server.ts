import express from "express";
import cors from "cors";
import * as http from "http";
import {QuizServerRoutes} from './quiz-server-routes';
import * as bodyParser from 'body-parser';

export class QuizServer {
  public static readonly PORT: number = 8080;
  private app: express.Application;
  private router: express.Router;
  private server: http.Server;
  private port: string | number;
  private serverRoutes: QuizServerRoutes;

  constructor() {
    
    this.createApp();
    this.config();
    this.createServer();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.serverRoutes = new QuizServerRoutes (this.app);
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || QuizServer.PORT;
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

let app = new QuizServer();
