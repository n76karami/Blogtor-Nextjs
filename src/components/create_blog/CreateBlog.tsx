import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CreateBlog = () => {

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const token = cookies.get('token'); 
  const router = useRouter();

  const createblog = async () => {

    if (!title || !imgUrl) return alert("Please fill out all inputs!");

    await axios.post("http://localhost:4000/blog/write", {
      title: title,
      content: editorRef.current.getContent(),
      imgurl: imgUrl
    }, {
      headers: {
        "auth": `ut ${token}`
      }
    })

    // window.location.assign('http://localhost:3000/blogList');
    toast.success("You successfully posted your blog!");
    router.push('/blogList');
    
  }

  return (
    <main className='w-full text-gray-800 px-8'>
      <div className=' flex flex-col w-[90%]  mx-auto px-1 py-3 border-2 border-gray-400/95'>
        <h1 className='text-center py-2 text-3xl md:text-4xl'>Create blog</h1>
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
            initialValue="<p>This is the initial content of the editor.</p>"
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
          <div className='text-center my-2 py-2'>
              
            <button className=' border-2 border-gray-800/40 rounded-md py-2 px-4
                font-bold bg-gray-700 text-white hover:bg-gray-200
                hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
                onClick={createblog}>
                publish
            </button>

          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateBlog;