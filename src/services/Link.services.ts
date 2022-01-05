import { FilterQuery } from 'mongoose';
import { Link, LinkI } from '../models/Link.model';
import { UserI } from '../models/User.model';

const linkService = {
  createLink: async (user: UserI, data: {
    title: string,
    description: string,
    tags: string,
    link: string
  }) => {
    const newLink = new Link({
      ...data, 
      owner: user._id, 
      tags: data.tags?.split(",")
    });
    newLink.save().then((data) => {
      console.log(data)
    });

    return newLink
  },

  getAllLinksByUser: async (userId: string) => {
    const links = await Link.find({owner: userId}).lean();
    return links
  },

  deleteLink: async (linkId: string) => {
    await Link.deleteOne({_id: linkId});
  },

  searchLinksByUser: async (query: FilterQuery<LinkI>) => {
    const links = await Link.find(query).lean();
    console.log(links)
    return links
  }
}
export {linkService};