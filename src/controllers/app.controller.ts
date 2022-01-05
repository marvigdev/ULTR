import { Response } from 'express';
import { linkService } from '../services/Link.services';
import { userService } from '../services/User.services';
import { authenticatedReq } from '../types/authenticatedRequest'

const appController = {
  showLinks: async (req: authenticatedReq, res: Response) => {
    if(!req.body.query){
      const userLinks = await linkService.getAllLinksByUser(req.context!.userId!);
      console.log(userLinks)
      return res.render("app", {
        links: userLinks
      })
    }
  },

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