import Controller from '../interfaces/controller.interface'
import  * as UserService from '../services/user.service'
import { Router } from "express"

class UserController implements Controller {
  public PATH = '/users'
  public ROUTER = Router()

  constructor() {
    this.createRouters()
  }

  private createRouters() {
    this.ROUTER.get(`${this.PATH}/:id`, UserService.getUserById)
  }
}

export default UserController