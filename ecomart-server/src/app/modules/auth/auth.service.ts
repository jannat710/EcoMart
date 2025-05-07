import { Request, Response } from 'express';
import User from '../user/user.model';
import { IUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error('This email already registered');
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error('This user is not found!');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!! Tell me who are you? 😈');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '2d' });
  const userWithoutPassword = user.toObject();
  userWithoutPassword.password = '';

  return {
    token,
    user: userWithoutPassword,
  };
};
export const AuthService = {
  register,
  login,
};
