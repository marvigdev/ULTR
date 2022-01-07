import { Request, Response } from 'express';
import {
  createLink,
  deleteLink,
  filterLinksByUser,
  getAllLinksByUser,
} from '../services/Link.service';
import { getUserByUsername } from '../services/User.service';
import { authenticatedReq } from '../types/authenticatedRequest';

const appController = {
  deleteLink: async (req: authenticatedReq, res: Response) => {
    const linkId = req.query.linkId as string;
    await deleteLink(linkId);
    res.redirect(`/app`);
  },

  showLinks: async (req: authenticatedReq, res: Response) => {
    const query = (req.query.query as string)?.trim();

    const userId = req.context!.userId;

    if (!query) {
      const userLinks = await getAllLinksByUser(userId!);
      return res.render('app', {
        links: userLinks,
      });
    }

    let splittedQuery = query.split(' ');
    let tagList: string[] = [];
    let termList: string[] = [];

    splittedQuery.forEach((value) => {
      const trimmed = value.trim();
      if (/#/.test(trimmed)) {
        const removedHashtag = trimmed.substring(1).toLowerCase();
        const replaceSpaces = removedHashtag.replaceAll(' ', '-');
        return tagList.push(replaceSpaces);
      }
      return termList.push(trimmed);
    });

    const termJoin = termList.join(' ');

    const userLinks = await filterLinksByUser(userId!, termJoin, tagList);

    let queryText = '';
    if (termJoin) {
      queryText += `You're searching for "${termJoin}"`;
    }
    if (tagList.length) {
      queryText += ` Filtering with the tags: ${tagList.join(', ')}`;
    }

    res.render('app', {
      queryText,
      links: userLinks,
    });
  },

  createLink: async (req: authenticatedReq, res: Response) => {
    try {
      const { link, title, tags, description } = req.body;

      const user = await getUserByUsername(req.context!.username!);

      await createLink(user!, {
        title,
        link,
        tags,
        description,
      });

      res.redirect('/app');
    } catch (err: any) {
      res.redirect('/app');
    }
  },

  renderCreate: async (_: Request, res: Response) => {
    res.render('createLink');
  },
};

export { appController };
