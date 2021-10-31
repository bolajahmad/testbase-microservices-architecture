import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticatedUser } from '../models';

dotenv.config();

export const ValidateToken = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const authHeader = request.headers.authorization;
    const secretKey = process.env.TOKEN_SECRET_KEY as string;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).json({
      message: 'Unauthorized Access',
      isSuccessful: false,
      data: undefined
  });

  jwt.verify(token, secretKey, (err, user) => {
    if (err || !user) return response.status(403).json({
        message: 'Invalid Token',
        isSuccessful: false
    });

    request.body.payer = {
        id: user.userId
    } as AuthenticatedUser;
    next();
  });
}