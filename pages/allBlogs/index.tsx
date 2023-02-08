import AllBlogs from '@/src/components/all_blogs/AllBlogs'
import Navbar from '@/src/components/navbar/Navbar'
import axios from 'axios'
import React from 'react'
import { writer } from '../allWriters/[id]'

export interface blogs {
  data: {
    _id: string,
    title: string,
    content: string,
    creatorId: string,
    imgurl: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string,
    creator: writer,
    rateCount: number
  }[]
}

const allBlog:React.FC<blogs> = ({ data }) => {
  return (
    <>
      <Navbar />
      <AllBlogs data={data} />
    </>
  )
}

export default allBlog;

export const getServerSideProps = async () => {
  
  const { data } = await axios("http://localhost:4000/blog");

  console.log(data)

  return {
    props: {
      data
    }
  }

}