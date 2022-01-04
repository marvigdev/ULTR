import { Request } from 'express';

interface authenticatedReq extends Request {
  context?: {
    userId?: string;
    name?: string;
  };
}

export { authenticatedReq };
