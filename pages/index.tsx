import { Inter } from '@next/font/google'
import React from 'react'
import styles from '@/styles/Home.module.css'
import Navbar from '@/src/components/navbar/Navbar'
import Home_page from '@/src/components/home/Home_page'
import axios from 'axios'
// import { writer as HomeWriter } from './allWriters/[id]'
import { writers } from './allWriters'

const inter = Inter({ subsets: ['latin'] })

export interface top_blog_user {
  topUser : {
  _id: string,
  username: string,
  name: string,
  bio: string,
  avatar: string,
  averageScore: number,
  createdAt: string,
  updatedAt: string
  }[],
  topBlog: {
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


const Home:React.FC<top_blog_user> = ({ topUser , topBlog }) => {
  console.log(topUser)
  return (
    <>
      <Navbar />
      <Home_page topUser={topUser} topBlog={topBlog} />
    </>
  )
}
export default Home;

export const getStaticProps = async () => {
  
  const topUser = await axios("http://localhost:4000/user/top-users");
  const topBlog = await axios("http://localhost:4000/blog/top-blogs");

  console.log(topUser)
  console.log(topBlog)

  return {
    props: {
      topUser: topUser.data,
      topBlog: topBlog.data
    }
  }

}

 
