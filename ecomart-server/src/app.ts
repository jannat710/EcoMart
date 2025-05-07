import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import authRouter from './app/modules/auth/auth.router';
import userRouter from './app/modules/user/user.router';
import productRouter from './app/modules/product/product.router';
import { globalErrorHandler } from './app/middleeatres/globalErrorHandler';
import orderRouter from './app/modules/order/order.router';

const app: Application = express();
//  CORS setup
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
);

app.use(express.json());

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api', productRouter);

app.use('/api/order', orderRouter);
app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
  });
});

export default app;
