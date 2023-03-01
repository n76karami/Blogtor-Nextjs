import React, { useState } from 'react'
import { blog as singleBlog } from '@/pages/allBlogs/[id]';
import Link from 'next/link';
import ReactStars from "react-rating-stars-component";
import Cookies from 'universal-cookie';
import axios from "axios";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


const cookies = new Cookies();


const Blog: React.FC<singleBlog> = ({ data , comments }) => {
  console.log(data)
  console.log(comments)

  const [comment, setComment] = useState("");

  const token = cookies.get('token');

  const router = useRouter();

  const submit_Rate = async (newRate:any) => {
    
    if (!token) {
      // window.location.assign(`http://localhost:3000/login_signup`)
      // return alert("You have to login or sign up before submiting a rate!")
      toast.error("You have to login or sign up before submiting a rate!")
      return router.push('/login_signup')
    } 

    toast.success("Your rate submited successfully!");

    await axios.post("http://localhost:4000/blog/submit-rate", {
      blogId: data._id,
      score: Number(newRate)
    }, {
      headers: {
        'auth': `ut ${token}`
      }
    })
    // window.location.assign(`http://localhost:3000/allBlogs/${data._id}`);
    // router.push(`/allBlogs/${data._id}`);

  }

  const submit_comment = async () => {

    if (!token) {
      toast.error("You have to login or sign up before submiting a comment!")
      return router.push('/login_signup')
      // window.location.assign(`http://localhost:3000/login_signup`)
      // return alert("You have to login or sign up before submiting a comment!")
    } 

    setComment("");
    toast.success("Your comment submited successfully!");


    await axios.post("http://localhost:4000/comment/submit",
      {
        text: comment,
        blogId: data._id
      }
      ,
      {
      headers: {
        'auth': `ut ${token}`
      }
      });
    
    // window.location.assign(`http://localhost:3000/allBlogs/${data._id}`)
    router.push(`/allBlogs/${data._id}`);
     
  }


  return (
    <>
      <section></section>
      <div className="w-full h-screen relative px-8 ">
        <div className='absolute top-[calc(50vh-37%)] lg:left-[calc(50vw-35%)] left-[calc(50vw-45%)] flex flex-col
          w-[90%] lg:w-[70%] mx-auto px-1 py-3 bg-teal-100/40'>
          <div className="w-full">
            <Link
              href='/allBlogs'
              className="md:p-3 p-2 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
              rounded-md">
              Back to All Blogs    
            </Link>
          </div>
          <div className="m-auto lg:w-[80%] md:w-[90%] w-full relative">
            <img
              className="lg:w-[90%] md:w-[90%] w-full m-auto lg:h-96 md:h-72 h-60 object-cover
              shadow-lg shadow-slate-500 my-8 "
              src={data.imgurl}
              onError={(e) => e.target.src = '/img/myblog.png'}
            />
            <div
              className="absolute flex justify-center items-center
              top-[calc(50vh-24%)] left-[15px]
              md:top-[calc(50vh-10%)] md:left-[37px]
              lg:top-[calc(60vh-20px)] lg:left-[45px]
              ">
              <span>
                <ReactStars
                  count={5}
                  value={data.averageScore}
                  size={25}
                  edit={false}
                  activeColor="#ffc200"
                />
              </span>
              <span className="text-sm ml-1 mt-0.5 text-gray-600">({data.rateCount})</span>
            </div>
          </div>
          <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-2">
            <h1 className="lg:w-[90%] md:w-[90%] w-full m-auto my-1 font-bold text-justify break-words px-2 py-2">
              {data.title}
            </h1>
          </div>
          <div
            className="text-justify font-light m-auto lg:w-[80%] md:w-[90%] w-full my-2 px-10"
            dangerouslySetInnerHTML={{ __html: data.content }}>
          </div>
          <div className="flex items-center gap-5 m-auto lg:w-[80%] md:w-[90%] w-full my-2 px-10">
            <span className="font-semibold text-xl">Rate This Blog!</span>
            <ReactStars
            count={5}
            value={0}
            size={25}
            onChange={submit_Rate}
            activeColor="#ffc200"
            />
          </div>
          <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-3 flex flex-col justify-center items-center">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="  Enter your comment..."
              rows="5"
              maxLength={200}
              className=" bg-gray-300 focus:outline-none inline-block px-1
              pt-4 rounded-xl lg:w-[90%] md:w-[90%] w-full m-auto my-2"
            />
            <button
              onClick={submit_comment}
              className="md:p-3 p-2 bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white
              rounded-md w-[40%] my-2">
              Submit Comment
            </button>
          </div>
          <div className="border-2 border-gray-600"></div>
          <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-3">
            <h1 className="text-center">Comments</h1>
          </div>
          {comments.length !== 0 ?
            <>
              {comments.map(comment => {
                return (
                  <div className="m-auto lg:w-[80%] md:w-[90%] w-full my-3 grid grid-cols-3 shadow-lg shadow-slate-500
                    bg-gray-300 rounded-md py-2">
                    <div className="flex justify-start items-center gap-2 col-span-1">
                      <Link href={`/allWriters/${comment.user._id}`} className="ml-5">
                        <img
                          className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-[50%]
                          border-[2px] border-blue-300"
                          src={`http://localhost:4000/${comment.user.avatar}`}
                          onError={(e) => e.target.src = '/img/account.png'}
                        />
                      </Link>
                      <Link href={`/allWriters/${comment.user._id}`} className="text-center">
                        <span>{comment.user.username}</span>
                      </Link>
                    </div>   
                    <div className="col-span-2 text-justify flex justify-start items-center px-1 border-l-2
                      border-gray-600">
                      <p className="font-bold w-full text-justify break-words px-2 py-2">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </>
            :
            <>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Blog;