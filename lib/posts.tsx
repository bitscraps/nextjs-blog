import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Butter from 'buttercms';

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  const butter = Butter(process.env.BUTTER_API);

  const response = await butter.category.retrieve('discovery', {include: 'recent_posts'})
  return response.data.data.recent_posts.map(post => {
      return {
        id: post.slug,
        date: post.created,
        title: post.title
      }
    })
}

export async function getAllPostIds() {
  const butter = Butter(process.env.BUTTER_API);

  const response = await butter.category.retrieve('discovery', {include: 'recent_posts'})
  return response.data.data.recent_posts.map(post => {
      return {
        params: {
          id: post.slug
        }
      }
    })
}

export async function getPostData(id: string) {
  const butter = Butter(process.env.BUTTER_API);

  const response = await butter.post.retrieve(id)

  return {
    id: response.data.data.slug,
    contentHtml: response.data.data.body,
    date: response.data.data.created,
    title: response.data.data.title,
    category: response.data.data.categories[0].name,
    author: response.data.data.author.first_name + ' ' + response.data.data.author.last_name
  }
 
}
