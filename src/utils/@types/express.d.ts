/* eslint-disable no-unused-vars */
import { Express, Request } from 'express';
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
