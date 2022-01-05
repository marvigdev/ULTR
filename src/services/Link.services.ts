import { Link } from '../models/Link.model';
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

  getAllLinksByUser: async (username: string) => {
    const links = await Link.find({owner: username}).lean();
    return links
  }
}
export {linkService};