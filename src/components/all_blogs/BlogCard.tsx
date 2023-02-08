import React, { useState } from 'react'
import { writer } from '@/pages/allWriters/[id]'
import Link from 'next/link'
import ReactStars from "react-rating-stars-component";


export interface blog {
  blog: {
    _id: string,
    title: string,
    content: string,
    creatorId: string,
    imgurl: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string,
    creator?: {
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
  }
}

const BlogCard: React.FC<blog> = ({ blog }) => {
  
  const [img, setImg] = useState(blog.imgurl);
  // const [p_img, setP_img] = useState(`http://localhost:4000/${blog.creator.avatar}`);


  return (
    <div
      className="relative mt-2 flex flex-col gap-2 justify-center items-center bg-gray-200 
      shadow-lg shadow-slate-600 rounded-[8px] w-full ">
      {blog.creator ?
        <>
          <div className="w-full flex justify-start items-center py-2 px-2 ">
            <Link href={`/allWriters/${blog.creator._id}`}>
              <img
                className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-[50%] border-[2px] border-blue-300"
                // src={p_img}
                // onError={(e) => setP_img("/img/myblog.png")}
                src={`http://localhost:4000/${blog.creator.avatar}`}
                onError={(e) => (e.target.src = "/img/account.png")}
                // alt="/"
              />
            </Link>
            <Link href={`/allWriters/${blog.creator._id}`} className="ml-3">
              <span className="text-xl md:text-2xl font-semibold">
                {blog.creator.name}
              </span>
            </Link>
          </div>
        </>
        :
        ""
      }
      <div className="w-full h-48 ">
        <Link href={`/allBlogs/${blog._id}`}>
          <img
            className="w-full h-full object-cover shadow-md shadow-slate-500"
            src={img}
            onError={(e) => setImg("/img/myblog.png")}
            // src={blog.imgurl}
            // onError={(e) => (e.target.src = "/img/myblog.png")}
          /> 
        </Link>
      </div>
      <div className="w-full flex justify-between items-center py-4 px-2">
        <h2 className="font-semibold text-xl mb-2">
          {blog.title.length > 15
            ? blog.title.slice(0, 15) + "..."
            : blog.title}
        </h2>
        <Link href={`/allBlogs/${blog._id}`} className="w-2/5">
          <button
            className=" bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
            py-2 w-full px-3 
            rounded-md"
          >
            Read more
          </button>
        </Link>
      </div>
      {blog.creator ?
        <>
          <div
            className="absolute
            lg:top-[calc(50vh-13%)] lg:left-[2px]
            md:top-[calc(50vh-10%)] md:left-[2px]
            top-[calc(50vh-16%)] left-[2px] 
            flex justify-center items-center mb-4 ml-4">
            <span>
              <ReactStars
                count={5}
                value={blog.averageScore}
                size={25}
                edit={false}
                activeColor="#ffc200"
              />
            </span>
            <span className="text-sm ml-1 mt-0.5 text-gray-600">
              ({blog.rateCount})
            </span>
          </div>
        </>
        :
        <>
          <div
            className="absolute
            lg:top-[calc(50vh-64%)] lg:left-[1px]
            md:top-[calc(50vh-53%)] md:left-[2px]
            top-[calc(50vh-56%)] left-[2px] 
            flex justify-center items-center mb-4 ml-4">
            <span>
              <ReactStars
                count={5}
                value={blog.averageScore}
                size={25}
                edit={false}
                activeColor="#ffc200"
              />
            </span>
            <span className="text-sm ml-1 mt-0.5 text-gray-600">
              ({blog.rateCount})
            </span>
          </div>
        </>
      }
    </div>
  )
}

export default BlogCard;