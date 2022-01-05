import { Response } from 'express';
import { linkService } from '../services/Link.services';
import { userService } from '../services/User.services';
import { authenticatedReq } from '../types/authenticatedRequest'

const appController = {
  createLink: async (req: authenticatedReq, res: Response) => {
    try {
      console.log(req.context)
      const {link, title, tags, description} = req.body;
      const user = await userService.getUserByUsername(req.context!.username!);
      await linkService.createLink(user, {
        title, link, tags, description
      })
      res.redirect("/app");
    }catch(err: any) {
      console.log(err)
      res.redirect("/app");
    }
  }
}

export {appController}