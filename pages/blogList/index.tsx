import BlogList from '@/src/components/blog_list/BlogList'
import D_Navbar from '@/src/components/d_navbar/D_Navbar'
import axios from 'axios'
import React from 'react'

const blogList = () => {
  
  return (
    <>
      <D_Navbar />
      <BlogList />
    </>
  )
}

export default blogList;

