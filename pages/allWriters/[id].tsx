import React from 'react'
import axios from 'axios';
import Navbar from '@/src/components/navbar/Navbar';
import Writer from '@/src/components/all_writers/Writer';
import { writers } from '.';

export interface writer { 
  data: {
    _id: string,
    username: string,
    name: string,
    bio: string,
    avatar: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string
  },
  userBlogs: {
    _id: string,
    title: string,
    content: string,
    creatorId: string,
    imgurl: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string,
    rateCount: number
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

const writer:React.FC<writer> = ({ data , userBlogs }) => {
  return (
    <>
      <Navbar />
      <Writer data={data} userBlogs={userBlogs} />
    </>
  )
}

export default writer;

export const getStaticPaths = async() => {
  
  const { data }: writers = await axios("http://localhost:4000/user/");
  // console.log(data)
  const ids = data.map(writer => {
    return {
      params: {
        id: writer._id
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
  const { data }: writers = await axios("http://localhost:4000/user/");
  const singleWriter = data.find(writer => writer._id == id)
  console.log(singleWriter)

  const res2 = await axios.post("http://localhost:4000/blog/by-user", {
    _id: context.params.id
  });

  console.log(res2.data)

  return {
    props: {
      data: singleWriter,
      userBlogs: res2.data
    }
  }
}