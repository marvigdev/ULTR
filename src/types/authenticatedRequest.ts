import { Request } from 'express';

interface authenticatedReq extends Request {
  context?: {
    userId?: string;
    username?: string;
  };
}

export { authenticatedReq };
