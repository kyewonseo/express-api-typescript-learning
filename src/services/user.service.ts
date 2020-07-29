import { Router, Request, Response, NextFunction } from "express"
import { check, sanitize, validationResult } from "express-validator"
import UserNotFoundException from '../exceptions/UserNotFoundException'
// import userModel from '../models/users';

// const user = userModel

export const getUserById = async (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;
  // const userQuery = this.user.findById(id);
  // if (request.query.withPosts === 'true') {
  //   userQuery.populate('posts').exec();
  // }
  // const user = await userQuery;
  // if (user) {
  //   response.send(user);
  if (check(id)) {
    console.log('id =>', id)
    response.send({id: id})
  } else {
    next(new UserNotFoundException(id));
  }
}