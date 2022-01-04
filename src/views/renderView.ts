import { Request, Response } from 'express';

const renderView = (view: string, options?: Object) => {
  return (_: Request, res: Response) => {
    return res.render(view, options);
  };
};

export { renderView };
