import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { ImHome } from 'react-icons/im';
import { BiLogOut } from 'react-icons/bi';
import Cookies from 'universal-cookie';
import Loading from '../loading/Loading';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrent_user } from '@/redux/userSlice';
import { useRouter } from 'next/router';

const cookies = new Cookies();

const D_Navbar = () => {

  const [img, setImg] = useState('');
  const [current_user, setcurrent_user] = useState<any>('');
  const [nav, SetNav] = useState(false);
  // const [isloading, setisLoading] = useState(true);

  const thisUser = useSelector((state: RootState) => state.current_user.current_user);
  const flag = useSelector((state: RootState) => state.current_user.flag);
  

  const token: string = cookies.get('token')
  const dispatch = useDispatch();

  const router = useRouter();

  const myaxios = async () => {
    
    if (thisUser && !flag) {
      setcurrent_user(thisUser)
      setImg(`http://localhost:4000/${thisUser.avatar}`)
      return
    } 
    
    const res = await axios.post("http://localhost:4000/user/me", {}, {
      headers: {
        "auth": `ut ${token}`
      }
    });
    
    if (!res) return
    console.log(res)

    setcurrent_user(res.data)
    setImg(`http://localhost:4000/${res.data.avatar}`)
    dispatch(setCurrent_user(res.data))
    // setisLoading(false)
    
  }
  // console.log(current_user)

  useEffect(() => {
    
    if (token != undefined) {
        
      myaxios()
        
    }
  
  }, [])

  // if (isloading) return <Loading />
  // if(!thisUser && isloading) return <Loading />


  const Log_out = () => {
    
    cookies.remove('token')
    // window.location.assign('/');
    router.push('/');
    dispatch(setCurrent_user({}));

  }

  return (
    <header className='w-full flex flex-col justify-between items-center pt-5 px-4 
      bg-gradient-to-b from-gray-400 to-gray-200 text-gray-800'>
      <div className='w-full flex justify-between items-center px-4'>
        <div className='lg:pl-20 grid grid-cols-3 gap-2 '>
          <div>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-[50%]'
              src={img}
              onError={(e) => setImg('/img/account.png')}
              alt='/'
            />
          </div>
          <div className=' col-span-2 flex flex-col pt-7'>
            <h1>{thisUser?.username}</h1>
            <p>{thisUser?.name}</p>
          </div>
        </div>
        <div className='hidden  lg:flex  gap-2'>
          <Link href='/'>
            <button className={` border-2 border-gray-800/40 rounded-md py-2 px-4
            font-bold hover:bg-gray-700 hover:text-white `}>
             Home page
            </button>
          </Link>
          <button
            onClick={Log_out}
            className=' border-2 border-gray-800/40 rounded-md py-2 px-4
            font-bold hover:bg-gray-700 hover:text-white'>
            Log out
          </button>
        </div>
        <div onClick={() =>  SetNav(!nav) } className='lg:hidden z-50 cursor-pointer'>
          {nav ? <AiOutlineClose className="text-black" size={30} /> : <HiOutlineMenuAlt4 size={30} />}
        </div>
      </div>  
      <div className='w-full h-24 px-4 '>
        <div className='py-2 px-2'>
          <p className='px-[103px] md:px-[155px] lg:px-[233px]  break-words' >
            {thisUser?.bio}
          </p>
        </div>
      </div>
      <div>
        <div className=' w-full hidden lg:block'>
          <ul className='flex justify-center gap-3'>
            <Link href='/blogList'>
              <li className={` hover:text-black font-medium ${router.pathname == '/blogList' ?
                'border-b-[3px] border-blue-500' : ''}`}>
                YourBlogs
              </li>
            </Link>
            <Link href='/createBlog'>
              <li className={` hover:text-black font-medium ${router.pathname == '/createBlog' ?
                'border-b-[3px] border-blue-500' : ''}`}>
                Create blog
              </li>
            </Link>
            <Link href='/editProfile'>
              <li className={` hover:text-black font-medium ${router.pathname == '/editProfile' ?
                'border-b-[3px] border-blue-500' : ''}`}>
                Edit profile
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className={nav ?
        'absolute text-black z-40 left-0 top-0 w-full h-screen bg-gray-100/90 px-4 py-7 flex flex-col lg:hidden ease-in-out duration-500'
        :
        'absolute left-[-100%]'}>
          <ul>
            <h1 className='mt-[10px] text-[#5651e5]'>BLOGTOR.</h1>
            <li className='border-b border-black'>
              <Link href='/blogList' className=" flex items-center gap-1">
                <img src="/img/yourblog.png" className="w-[32px]" />
                <span>YourBlogs</span>
              </Link>
            </li>  
            <li className='border-b border-black'>
              <Link href='/createBlog' className=" flex items-center gap-1">
                <img src="/img/Createblog.png" className="w-[32px]" />
                <span>Create blog</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link href='/editProfile' className=" flex items-center gap-1">
                <img src="/img/editprofile.png" className="w-[32px]" />
                <span>Edit profile</span>
              </Link>
            </li>
            <li className='border-b border-black'>
              <Link href='/' className=" flex items-center gap-2">
                <ImHome size={28} />
                <span>Home</span> 
              </Link>
            </li>
            <li onClick={Log_out} className='border-b border-black cursor-pointer flex items-center gap-1'>
              <BiLogOut size={28} />
              <span>Log out</span>
            </li>
          </ul>
        </div>
    </header>
  )
}

export default D_Navbar;