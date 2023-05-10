import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    message = err.message;
  }

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json({ message: message });
};
