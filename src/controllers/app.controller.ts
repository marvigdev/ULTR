import { Response } from 'express';
import { FilterQuery } from 'mongoose';
import { LinkI } from '../models/Link.model';
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
    const query = (req.query.query as string)?.trim();

    if(!query){
      const userLinks = await linkService.getAllLinksByUser(req.context!.userId!);
      return res.render("app", {
        links: userLinks,
      })
    }

    let splittedQuery = query.split(" ");
    let tagList: string[] = []
    let terms: string[]  = []
    splittedQuery.forEach((value: string) => {
      if(/#/.test(value)) return tagList.push(value.trim().substring(1));
      return (terms as string[]).push(value.trim());
    })
    const stringTerms = terms.join(" ");

    console.log(stringTerms)
    const filterQuery: FilterQuery<LinkI> = {
      $and: []
    }

    if(stringTerms.trim()) {
      filterQuery["$and"]!.push(
        {title: new RegExp(stringTerms, 'ig')}
      )
    }
    if(tagList.length) {
      filterQuery["$and"]!.push(
        {tags: {$in: tagList}}
      )
    }

    const userLinks = await linkService.searchLinksByUser(filterQuery);

    let queryText = ''
    if(stringTerms) queryText += `You're searching for "${stringTerms}".`
    if(tagList.length) queryText += ` Filtering with the tags ${tagList.join(", ")}`

    res.render('app', {
      queryText,
      links: userLinks
    })
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