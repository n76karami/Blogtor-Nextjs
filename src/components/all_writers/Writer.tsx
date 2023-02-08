import React from 'react'
import { writer as singleWriter } from '@/pages/allWriters/[id]';
import Link from 'next/link';
import ReactStars from "react-rating-stars-component";
import BlogCard from '../all_blogs/BlogCard';

const Writer:React.FC<singleWriter> = ({data , userBlogs}) => {
  return (
    <>
      <section></section>
      <div className="w-full h-screen relative px-8 ">
        <div
          className='absolute top-[calc(50vh-37%)] lg:left-[calc(50vw-35%)] 
          left-[calc(50vw-45%)] flex flex-col
          w-[90%] lg:w-[70%] mx-auto px-1 py-3 bg-teal-100/40'>
          <div className="w-full">
            <Link
              href='/allWriters'
              className="md:p-3 p-2 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
              rounded-md">
              Back to All Writers    
            </Link>
          </div> 
          <div className="my-5 grid md:grid-cols-3 place-items-center">
            <div className="mx-auto">
              <img
                className="md:w-[200px] md:h-[200px] w-[150px] h-[150px] 
                shadow-lg shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
                src={`http://localhost:4000/${data.avatar}`}
                onError={(e) => (e.target.src = "/account.png")}
                alt="/"
              />
            </div>
            <div className="mx-auto md:ml-[-10px] ">
              <h1 className="text-center md:text-left px-5 py-2">{data.username}</h1>
              <p className="text-center md:text-left px-5 py-2">{data.name}</p>
              <p className="text-center py-2 break-words">
                {data.bio ? data.bio : "No bio has been entered yet!"}
              </p>
            </div>
            <div className="mx-auto md:ml-[-25px] md:mt-[-10px]">
              <ReactStars
                count={5}
                value={data.averageScore}
                size={25}
                edit={false}
                activeColor="#ffc200"
              />
            </div>
          </div>
          <div className="border-2 border-black"></div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center'>
            {
              userBlogs.length !== 0?
                userBlogs.map(blog => {
                  return (
                  <BlogCard blog={blog} />
              )
              })
              :
              <p className="font-semibold md:col-span-2 lg:col-span-3 pt-20">No blogs created yet.</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Writer;