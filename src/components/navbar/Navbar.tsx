import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { ImHome } from 'react-icons/im';
import { ImBlog } from 'react-icons/im';
import { BsPerson } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import axios , { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import Loading from '../loading/Loading';
// import Loading from '../loading/Loading';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrent_user } from '@/redux/userSlice';
import { useRouter } from 'next/router';



const cookies = new Cookies();

const Navbar = () => {

  const [nav, SetNav] = useState<boolean>(false);
  const [modal, SetModal] = useState<boolean>(false);
  const [current_user, setcurrent_user] = useState<any>();

  // const [isloading, setisLoading] = useState(true);

  const thisUser = useSelector((state: RootState) => state.current_user.current_user)

  console.log(thisUser)

  const token: string = cookies.get('token')
  const dispatch = useDispatch();

  const router = useRouter();
  console.log(router)
  
  const myaxios = async () => {
    
    console.log("###########################")
    console.log('###' , thisUser)
    if (thisUser) return setcurrent_user(thisUser)
    
    const res = await axios.post("http://localhost:4000/user/me", {}, {
      headers: {
        "auth": `ut ${token}`
      }
    });
    
    if (!res) return

    setcurrent_user(res.data)
    dispatch(setCurrent_user(res.data))
    // setisLoading(false)
    
  }
  // console.log(current_user)

  useEffect(() => {
    
    if (token != undefined) {
        
      myaxios()
        
    }
  
  }, [])

  // if (!thisUser)  return <Loading />
  // if (!thisUser && isloading) return <Loading />

  const Log_out = () => {
    
    cookies.remove('token')
    // window.location.assign('/');
    router.push('/');
    SetModal(false);
    dispatch(setCurrent_user({}));
  }

  return (
    <>
      <header
        className="fixed z-50 w-full flex justify-between items-center h-20 px-4
        bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white"
      >
        <div>
          <h1 className="text-[#00df9a]">BLOGTOR.</h1>
        </div>
        <div className="text-center w-96">
          <ul className="hidden md:flex">
            <Link href='/'>
            <li className={`${router.pathname == '/' ? 'text-[#98eed8]': ''}`}>Home</li>
            </Link>
            <Link href='/allBlogs'>
            <li className={`${router.pathname.includes('/allBlogs') ? 'text-[#98eed8]': ''}`}>Blogs</li>
            </Link>
            <Link href='/allWriters'>
            <li className={`${router.pathname.includes('/allWriters') ? 'text-[#98eed8]': ''}`}>Writers</li>
            </Link>
          </ul>
        </div>
        <div className="hidden md:flex px-7 mr-5 cursor-pointer">
          {thisUser?.username?
            <>           
              <div onClick={()=>SetModal(!modal)} className="flex flex-col justify-center items-center">
                <BsPerson size={20} />
                <span>{thisUser?.username}</span>
              </div>
            </>
            :
            <div>
            <Link href="/login_signup">
            <button
              className="border-2 font-bold p-3  border-gray-300 rounded-md
              hover:bg-gray-200 hover:text-[#5651e5] hover:border-[#5651e5] "
            >
              Sign up / Login
            </button>
            </Link>
            </div>
          }
        </div>
        <div onClick={() => {
          SetNav(!nav);
          }} className='md:hidden z-10 cursor-pointer'>

          {nav ? <AiOutlineClose className="text-black" size={30} /> : <HiOutlineMenuAlt4 size={30} />}
        
        </div>
        <div className={nav ?
          'absolute text-black left-0 top-0 w-full h-screen bg-gray-100/90 px-4 py-7 flex flex-col md:hidden ease-in-out duration-500' :
          'absolute left-[-100%]'}>
          <ul>
            <h1 className='mt-[-8px] text-[#5651e5]'>BLOGTOR.</h1>
            <li className='border-b border-black'>
              <Link href='/' className=" flex items-center gap-2">
                <ImHome />
                <span>Home</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link href='/allBlogs'  className=" flex items-center gap-2">
                <ImBlog />
                <span>Blogs</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link href='/allWriters'  className=" flex items-center gap-1">
                <img src="/img/writers.png" className="w-[20px]" />
                <span>Writers</span>
              </Link>
            </li>
            {thisUser ?
              <>
                <li className='border-b border-black'>
                  <Link href='/blogList' className=" flex items-center gap-1">
                    <img src="/img/dashbord.png" className="w-[20px]" />
                    <span>Dashbord</span>
                  </Link>
                </li>
                <li onClick={Log_out} className='cursor-pointer flex items-center gap-2'>
                  <BiLogOut size={20} />
                  <span>Log out</span>
                </li>
              </>
              :
              <>
                <div className='flex flex-col'>
                  <Link href='/login_signup'>
                    <button className='w-full font-bold my-10 p-3 border border-gray-300 rounded-md
                      bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white'>
                      Sign up / Login
                    </button>
                  </Link>
                </div>
              </>
            }
          </ul>
        </div>
      </header>
      {modal ?
      <>
        <div className=" hidden md:flex bg-[#709dff] text-white mr-2
           flex-col justify-center items-center gap-5
          fixed w-28 h-24 top-24 right-3 z-50">
            <Link href="/blogList" className="cursor-pointer hover:bg-[#5651e5] w-full text-center">
              <span>
                Dashbord
              </span>
            </Link>
            <span
              onClick={Log_out}
              className="cursor-pointer hover:bg-[#5651e5] w-full text-center">
              Logout
            </span>
        </div>
      </>
      :
      ''
    }
    </>
  );
}

export default Navbar;