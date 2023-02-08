import CreateBlog from '@/src/components/create_blog/CreateBlog';
import D_Navbar from '@/src/components/d_navbar/D_Navbar';
import React from 'react'

const createBlog = () => {
  return (
    <>
      <D_Navbar />
      <CreateBlog />
    </>
  )
}

export default createBlog;
