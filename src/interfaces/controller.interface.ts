import { Router } from 'express'

interface Controller {
  PATH: string
  ROUTER: Router
}

export default Controller