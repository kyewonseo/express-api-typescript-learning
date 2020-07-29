import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import Controller from './interfaces/controller.interface'
import errorMiddleware from './middleware/error.middleware'
import path from 'path'
import dotenv from 'dotenv'
import { check } from 'express-validator'

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express()

    // this.connectToTheDatabase()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  public listen() {
    process.env.PORT = '3000'
    console.log('process.env.PORT =>', process.env.PORT)
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`)
    });
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.ROUTER)
    });
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env
    // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
  }

  private initEnv() {
    if (process.env.NODE_ENV === 'DEV') dotenv.config({ path: path.join(__dirname, '.env/DEV') })
    else if (process.env.NODE_ENV === 'PROD') dotenv.config({ path: path.join(__dirname, '.env/PROD') })
    else dotenv.config({ path: path.join(__dirname, '.env/LOCAL') })
  }
}

export default App
