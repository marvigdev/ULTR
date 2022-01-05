import { Response } from 'express';
import { linkService } from '../services/Link.services';
import { userService } from '../services/User.services';
import { authenticatedReq } from '../types/authenticatedRequest'

const appController = {
  deleteLink: async (req: authenticatedReq, res: Response) => {
    const linkId = req.query.linkId as string;
    await linkService.deleteLink(linkId);
    res.redirect("/app");
  },

  showLinks: async (req: authenticatedReq, res: Response) => {
    if(!req.body.query){
      const userLinks = await linkService.getAllLinksByUser(req.context!.userId!);
      return res.render("app", {
        links: userLinks
      })
    }
  },

  createLink: async (req: authenticatedReq, res: Response) => {
    try {
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