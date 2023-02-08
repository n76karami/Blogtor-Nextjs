import React, { useState } from 'react'
// import { writer } from '@/pages/allWriters/[id]';
import WriterCard from '../all_writers/WriterCard';
// import { writers } from '@/pages/allWriters';
import { top_blog_user } from '@/pages';
import BlogCard from '../all_blogs/BlogCard';

const Home_page:React.FC<top_blog_user> = ({ topUser , topBlog}) => {
  // console.log(topUser)
  // console.log(topBlog)

  const [topblog_modal, setTopblog_modal] = useState<boolean>(false);
  const [topuser_modal, setTopuser_modal] = useState<boolean>(false);

  return (
    <main className='w-full h-screen relative'>
      <img
        className='w-full h-full object-cover'
        src='/img/blog.jpg'
        alt='/'
      />
      <div className='absolute w-full h-full top-0 left-0 bg-blue-300/20'></div>
      <div className='absolute top-0 w-full h-full text-center flex flex-col justify-center '>
        <h1 className='text-[#5651e5]'>WELCOME TO BLOGTOR</h1>
        <div className='w-full mt-5 mx-auto flex flex-col py-4 justify-center items-center md:flex-row '>
          <button
              onClick={() => {
                setTopuser_modal(true);
                // get_Topwriters
              }}
              className='w-2/3 py-3 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white my-4 rounded-md
              md:w-1/4 md:py-4 md:mr-6
            '>
              Popular Writers
          </button>
          <button
            onClick={() => {
              setTopblog_modal(true);
              // get_Topblogs
            }}
            className='w-2/3 py-3 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white rounded-md
            md:w-1/4 md:py-4 
          '>
            Popular Blogs
          </button>
        </div>
      </div>
      {topuser_modal ?
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => setTopuser_modal(false) }>
          </div>
          <div className='bg-gray-200 absolute w-5/6 md:w-2/3 px-5 py-2 lg:w-[70%] rounded-md
            lg:top-[calc(50vh-17%)] lg:left-[calc(50vw-35%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col lg:flex-row md:gap-3 justify-center items-center '>
            {
              topUser.length !== 0 ?
              topUser.map(writer => {
                return (
                <WriterCard
                writer={writer}
                />
            )
          })
              :
              ''
            }  
          </div>
        </>
        :
        ""
      }
      {topblog_modal ?
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => setTopblog_modal(false) }>
          </div>
          <div className='bg-gray-200 absolute w-5/6 md:w-2/3 px-5 py-2 lg:w-[70%] rounded-md
            lg:top-[calc(50vh-17%)] lg:left-[calc(50vw-35%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col lg:flex-row md:gap-3 justify-center items-center '>
             {
              topBlog.length !== 0 ?
              topBlog.map(blog => {
                return (
                <BlogCard blog={blog} />
            )
          })
              :
              ''
            }
          </div>
        </>
        :
        ""
      }
    </main>
  )
}

export default Home_page;