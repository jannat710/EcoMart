import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from './../user/userValidation';
import validateRequest from '../../middleeatres/validateRequest';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register,
);
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

export default authRouter;
