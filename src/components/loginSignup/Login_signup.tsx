import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import Cookies from 'universal-cookie';
import axios , { AxiosResponse } from 'axios';
// import { useSelector , useDispatch } from 'react-redux/es/exports';
import { useSelector , useDispatch } from 'react-redux';
import { setCurrent_user } from '@/redux/userSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
// import { currentUser } from '@/redux/userSlice';

const cookies = new Cookies();

const Login_signup = () => {

  const [select_form, setselect_form] = useState<boolean>(true);

  // sign up
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');


  // login
  const [password, setpassword] = useState<string>('');

  // const schema = yup.object().shape({
  //   username: yup.string().required(),
  //   name: yup.string().required(),
  //   password: yup.string().min(4).max(20).required(),
  // })

  // const { register, handleSubmit , formState: {errors} } = useForm({
  //   resolver: yupResolver(schema)
  // });

  const router = useRouter();


  const dispatch = useDispatch();

  const login = async () => {

    if(!username || !password) return alert("please fill all sections")

    const res = await axios.post("http://localhost:4000/user/login", {
      username,
      password
    }).catch(error => {
      console.log(error.response.data.msg)
      // window.location.assign('http://localhost:3000/login_signup')
      return alert(`${error.response.data.msg}`)
    })

    if(!res) return

    if (res.data.token !== undefined) {
      
      cookies.set('token', res.data.token)
      const token: string = cookies.get('token')
      
      const res2 = await axios.post("http://localhost:4000/user/me", {}, {
        headers: {
          "auth": `ut ${token}`
        }
      });
      console.log(res2.data)
      // cookies.set('current_user', JSON.stringify(res2.data))
      // localStorage.setItem('current_user', JSON.stringify(res2.data))
      dispatch(setCurrent_user(res2.data))
      
      // window.location.assign('http://localhost:3000')
      // return alert("You've logged in successfully")
      toast.success("You've logged in successfully")
      router.push('/');
    }
    
  }

  const signup = async () => {
    if (!username || !name) return alert("please fill all sections");
    const res = await axios.post("http://localhost:4000/user/signup", {
      username,
      name
    }).catch(error => {
      console.log(error.response.data.msg)
      // window.location.assign('http://localhost:3000/login_signup')
      return alert(`${error.response.data.msg}`)
    })

    if(!res) return

    if (res.data.token !== undefined) {
      cookies.set('token', res.data.token)
      const token: string = cookies.get('token')

      const res2 = await axios.post("http://localhost:4000/user/me", {}, {
        headers: {
          "auth": `ut ${token}`
        }
      });
      console.log(res2.data)
      dispatch(setCurrent_user(res2.data))

      // window.location.assign('http://localhost:3000')
      toast.success("You've signed up successfully")
      router.push('/');
      // return alert("You've signed up successfully")
    }
  }

  return (
    <main className="w-full h-screen relative bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src="/img/login.jpg"
        alt="/"
      />
      <div className="flex justify-center items-center h-full">
        {select_form ? (
          <div className="absolute max-w-[400px] w-full mx-auto bg-gray-200 p-8">
            <h2 className="font-bold text-4xl text-center py-6">Login</h2>
            <div className="flex flex-col my-4">
              <label>Username</label>
              <input
                className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                type="text"
                // {...register("username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                type="password"
                // {...register("password")}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button
              onClick={login}
              type='submit'
              className="rounded-md text-xl w-full
               bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white mt-5 py-3"
            >
              Login
            </button>
            <div className="flex justify-center items-center py-2 mt-3">
              <p className="text-center mr-2 ">Don't have an account?</p>
              <span
                className="text-blue-900 font-bold cursor-pointer"
                onClick={() => setselect_form(false)}
              >
                Sign up
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute max-w-[400px] w-full mx-auto bg-gray-200 p-8">
            <h2 className="font-bold text-4xl text-center py-6">Sign up</h2>
            <div className="flex flex-col my-4">
              <label>Username</label>
              <input
                className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                className="border relative bg-gray-300 p-2 rounded-md focus:outline-none "
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              onClick={signup}
              className="rounded-md text-xl w-full
              bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white mt-5 py-3">
              Sign up
            </button>
            <div className="flex justify-center items-center py-2 mt-3">
              <p className="text-center mr-2 ">
                You have an account already?
              </p>
              <span className="text-blue-900 font-bold cursor-pointer" onClick={() => setselect_form(true)}>
                Login
              </span>
            </div>  
          </div>
        )}
      </div>
    </main>
  );
}

export default Login_signup