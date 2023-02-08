import Blog from '@/src/components/all_blogs/Blog';
import Navbar from '@/src/components/navbar/Navbar';
import axios from 'axios';
import React from 'react'
import { blogs } from '.';

export interface blog{
  data: {
    _id: string,
    title: string,
    content: string,
    creatorId: string,
    imgurl: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string,
    creator: {
      _id: string,
      username: string,
      name: string,
      bio: string,
      avatar: string,
      averageScore: number,
      createdAt: string,
      updatedAt: string
    },
    rateCount: number
  },
  comments: {
    _id: string,
    text: string,
    userId: string,
    createdAt: string,
    user: {
      _id: string,
      username: string,
      name: string,
      bio: string,
      blogs: {
        _id: string,
        title: string,
        content: string,
        creatorId: string,
        imgurl: string,
        averageScore: number,
        createdAt: string,
        updatedAt: string,
        rateCount: number
      }[],
      avatar: string,
      averageScore: number,
      createdAt: string,
      updatedAt: string
    }
  }[]

}

interface context{
  params: {
    id: string
  },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}

const blog: React.FC<blog> = ({ data, comments }) => {
  return (
    <>
      <Navbar />
      <Blog data={data} comments={comments} />
    </>
  )
}

export default blog;


export const getStaticPaths = async() => {
  
  const {data} : blogs = await axios("http://localhost:4000/blog");
  console.log(data)
  const ids = data.map(blog => {
    return {
      params: {
        id: blog._id
      }
    }
  })
  
  console.log(ids)

  return {
    paths: ids,
    fallback: false
  }
}

export const getStaticProps = async (context: context) => {
  console.log(context)
  const id = context.params.id;
  const { data }: blogs = await axios("http://localhost:4000/blog");
  const singleBlogs = data.find(blog => blog._id == id)

  console.log(singleBlogs)

  const res = await axios(`http://localhost:4000/comment/by-blog/${context.params.id}`);

  console.log(res.data)

  return {
    props: {
      data: singleBlogs,
      comments: res.data
    }
  }
}