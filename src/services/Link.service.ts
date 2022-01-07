import { FilterQuery } from 'mongoose';
import { Link, LinkI } from '../models/Link.model';
import { UserI } from '../models/User.model';

async function createLink(
  user: UserI,
  data: { title: string; description: string; tags: string; link: string }
) {
  //If tag has multiple words, they must be separated by '-'
  const tags = data.tags?.split(',').map((v) => v.trim().replaceAll(' ', '-'));

  const newLink = new Link({
    ...data,
    tags,
    owner: user._id,
  });

  await newLink.save();

  return newLink;
}

async function getAllLinksByUser(userId: string) {
  const links = await Link.find({ owner: userId }).lean();
  return links;
}

async function filterLinksByUser(
  userId: string,
  terms: string,
  tags: string[]
) {
  const query: FilterQuery<LinkI> = {
    owner: userId,
    $and: [],
  };

  if (terms.trim()) {
    query.$and!.push({ title: new RegExp(terms, 'ig') });
  }
  if (tags.length) {
    query.$and!.push({ tags: { $in: tags } });
  }

  const filteredLinks = await Link.find(query).lean();
  return filteredLinks;
}

async function deleteLink(linkId: string) {
  await Link.deleteOne({ _id: linkId });
}

export { createLink, getAllLinksByUser, filterLinksByUser, deleteLink };
