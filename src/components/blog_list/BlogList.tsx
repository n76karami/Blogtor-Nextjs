import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import Loading from '../loading/Loading';

const cookies = new Cookies();

// interface blogType {
//   blog: {
//     averageScore : number,
//     content: string,
//     createdAt: string
//     creatorId: string
//     imgurl: string
//     rateCount: number
//     title: string,
//     updatedAt: string
//     _id: string
//   }
// }

export const token = cookies.get('token');

const BlogList = () => {

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");
  const [blogId, setBlogId] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  // const [isloading, setisLoading] = useState(true);

  const editorRef = useRef(null);

  const router = useRouter();
  // console.log(router)

  
  // console.log(token)

  const myblog_axios = async () => {   
    
    const { data } = await axios.get("http://localhost:4000/blog/my-blogs", {
      headers: {
        "auth": `ut ${token}`
      }
    });
    // console.log(data)
    setBlogs(data)
    // setisLoading(false)
    
  }

  useEffect(() => {

    myblog_axios()

  }, [blogs])

  const naser = (blog: any) => {
    setEditModal(true);
    setTitle(blog.title);
    setImgUrl(blog.imgurl);
    setContent(blog.content)
    setBlogId(blog._id)
  }

  const delete_blog = async (blogId: string) => {

    await axios.post("http://localhost:4000/blog/delete", {
      blogId
    }, {
      headers: {
        "auth": `ut ${token}`
      }
    })

    // window.location.assign('http://localhost:3000/blogList');
    router.push('/blogList');
    setdeleteModal(false);
  }

  const editblog = async () => {

    if (!title || !imgUrl) return alert("Please fill out all inputs!");

    await axios.post("http://localhost:4000/blog/edit", {
      blogId: blogId,
      data: {
        title: title,
        content: editorRef.current.getContent(),
        imgurl: imgUrl
      }
    }, {
      headers: {
        "auth": `ut ${token}`
      }
    })

    // window.location.assign('http://localhost:3000/blogList');
    toast.success('You successfully edited your blog!')
    router.push('/blogList');
    setEditModal(false)

    // alert("You successfully edited your blog!");

  }

  // if (isloading) return <Loading />

  // console.log(currentBlog)

  return (
    <main className='w-full px-8'>
      <div className=' flex flex-col w-[90%] min-h-[330px] mx-auto px-1 py-3 border-2 border-gray-400/95'>
        <h1 className='text-center py-2 text-3xl md:text-4xl'>Your blogs</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center'>
          {blogs.length !== 0 ?
            
            blogs.map(blog => {
              return (
                <div className='flex flex-col gap-2 justify-center items-center
                  border-[1px] shadow-md shadow-slate-600 border-gray-400/95 w-[90%] '>
                  <div className='w-[90%] h-48 my-2'>
                    <img
                      src={blog.imgurl}
                      onError={(e) => e.target.src = '/img/myblog.png'}
                      className='w-full h-full object-cover shadow-md shadow-slate-600'
                    />
                  </div>
                  <div className='my-2'>
                    <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold'>
                      {blog.title.length > 15 ? blog.title.slice(0, 15) + "..." : blog.title}
                    </h2>
                  </div>
                  <div
                    className='text-center w-[90%]'
                    dangerouslySetInnerHTML={{ __html: blog.content.length > 20 ? blog.content.slice(0,20) + "..." : blog.content }}>
                  </div>
                  <div className='w-[80%] flex justify-center items-center gap-8 my-2'>
                    <button
                      onClick={() => { setdeleteModal(true); setCurrentBlog(blog)}}
                      className=' w-[50%] border-2 border-gray-800/40 rounded-md py-2 px-4
                      font-bold bg-gray-700 text-white hover:bg-gray-200
                    hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                    >
                      Delete
                    </button>
                    {/* <Link href={`/blogList/${blog._id}`} className='w-[50%]'> */}
                    <button
                      onClick={() => naser(blog)}
                      className=' w-[50%] border-2 border-gray-800/40 rounded-md py-2 px-4
                      font-bold bg-gray-700 text-white hover:bg-gray-200
                      hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                    >
                      Edit
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              )
            })

            :
            <p className='md:col-span-2 lg:col-span-3 pt-20'>
              You have no blogs yet. Create your first blog right now!
            </p>
          }
        </div>
      </div>
      {deleteModal ?
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => { setdeleteModal(false); setCurrentBlog(null) }}>
          </div>
          <div className='bg-gray-200 fixed w-5/6 md:w-2/3 lg:w-1/2 rounded-md
            lg:top-[calc(50vh-17%)] lg:left-[calc(50vw-25%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col justify-center items-center '>
            <div className='my-2'>
              <p className='text-xl lg:text-2xl'>Are you sure delete this blog?</p>
            </div>
            <div className='flex my-3 w-[50%] md:w-[40%] justify-center gap-8 '>
              <button className=' w-[50%] md:w-[40%] border-2 border-gray-800/40 rounded-md py-2 px-2
                font-bold bg-green-700 text-white hover:bg-green-500
               hover:text-black focus:ring-4 focus:ring-green-400'
                onClick={() => delete_blog(currentBlog._id)}
              >
                Yes
              </button>
              <button className=' w-[50%] md:w-[40%] border-2 border-gray-800/40 rounded-md py-2 px-2
                font-bold bg-red-700 text-white hover:bg-red-500
               hover:text-black focus:ring-4 focus:ring-red-800'
               onClick={() => { setdeleteModal(false); setCurrentBlog(null) }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
        :
        ""
      }
      {editModal ?
        <>
          <div
            className="bg-gray-800/90 fixed top-0 left-0 w-screen h-screen z-20 "
            onClick={() => { setEditModal(false); setCurrentBlog(null) }}>
          </div>
          <div className='bg-gray-200 fixed w-5/6 md:w-2/3 lg:w-[88%] rounded-md
            lg:top-[calc(50vh-37%)] lg:left-[calc(50vw-44%)]
            md:top-[calc(50vh-17%)] md:left-[calc(50vw-32%)]
            top-[calc(50vh-17%)] left-[calc(50vw-42%)]
            mx-auto z-30 flex flex-col justify-center items-center '>
            <h1 className='text-center py-2 text-3xl md:text-4xl'>Edit blog</h1>
            <div className='grid gap-3 lg:gap-28 md:grid-cols-2 mt-4'>
              <div className="mt-2 flex flex-col justify-center gap-2 ">
                <h3 className=' font-medium mb-2 md:pl-10'>Enter your image url</h3>
                <input
                // type="url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://example.com"
                // pattern="https://.*"
                // size="30"
                className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
                 bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
                //  maxlength="50"
                />
              </div>
              <div className="mt-2 flex flex-col justify-center gap-2 ">
                <h3 className=' font-medium mb-2 md:pl-10'>Enter your title</h3>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
                 bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
                // maxLength="50"
                />
              </div>
            </div>
            <div className='mt-2 py-2 md:px-10'>
              <h3 className=' font-medium mb-3 '>Enter your content</h3>
              <Editor
              className='-z-50 bg-gray-300'
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={content}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                body_class:'h-2'
              }}
              />
              <div className=' text-center my-2 py-2 flex gap-3 justify-center items-center'>
              <button className=' w-28 border-2 border-gray-800/40 rounded-md py-2 px-4
                font-bold bg-gray-700 text-white hover:bg-gray-200
                hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                  onClick={editblog}
                >
                publish
              </button>
              </div>
            </div>
          </div>
        </>
        :
        ""
      }
    </main>
  )
}

export default BlogList;