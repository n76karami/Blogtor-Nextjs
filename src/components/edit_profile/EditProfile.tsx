import React , {useState , useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Loading from '../loading/Loading';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrent_user, setFlag } from '@/redux/userSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
// import { setCurrent_user } from '@/redux/userSlice';

const cookies = new Cookies();

const EditProfile = () => {

  const thisUser = useSelector((state: RootState) => state.current_user.current_user)

  const [current_user, setcurrent_user] = useState<any>('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const [file, setFile] = useState(null)
  const [isloading, setisLoading] = useState(true);
  // const [current_user, setcurrent_user] = useState('');

  const dispatch = useDispatch();

  const token = cookies.get('token');

  const router = useRouter();

  useEffect(() => {
    if (file) {

      const fileReader = new FileReader()

      fileReader.onload = function (e) {
        setImg(e.target.result)
      }

      fileReader.readAsDataURL(file)
    }
  }, [file])

  const myaxios = async() => {
    
    if (thisUser) {
      setcurrent_user(thisUser)
      setName(thisUser.name);
      setBio(thisUser.bio);
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
    setName(res.data.name);
    setBio(res.data.bio);
    setcurrent_user(res.data)
    setImg(`http://localhost:4000/${res.data.avatar}`)
    dispatch(setCurrent_user(res.data))
    setisLoading(false)
    
  }
  
  useEffect(() => {
    
    if (token != undefined) {
        
      myaxios()
        
    }
  
    
  }, [])

  // if(!thisUser && isloading) return <Loading />

  const submit_avatar = async () => {
    try {
      
      console.log(file)

      if (!file) return

      const formData = new FormData()
      formData.append('avatar', file)

      fetch('http://localhost:4000/user/update-avatar', {
        method: 'POST',
        headers: {
          'auth': `ut ${token}`
        },
        body: formData
      }).then(res => {
        console.log(res)
        
      }).then((data) => {
        console.log(data)
      })

    } catch (error) {
      console.log('lol')
    }
  }

  const submit_form = async () => {
    // if(!name || !bio) return alert('please fill all sections')
    const {data} = await axios.post("http://localhost:4000/user/edit", {
      name,
      bio,
    }, {
      headers: {
        'auth': `ut ${token}`
      }
    })
    submit_avatar()
    // window.location.assign('http://localhost:3000/blogList')
    dispatch(setFlag(true));
    toast.success("You've edit profile successfully")
    router.push('/blogList');
    return data;
  }

  return (
    <main className='w-full  text-gray-800 px-8'>
      <div className=' flex flex-col w-[90%]  mx-auto px-1 py-3 border-2 border-gray-400/95'>
        <h1 className='text-center py-2 text-3xl md:text-4xl'>Edit profile</h1>
        <div className='mt-2 py-2'>
          <h3 className=' font-medium mb-3 md:pl-10'>change your avatar</h3>
          <div className='flex flex-col justify-center items-center'>
            <div>
              <img
                className="mb-4 w-52 h-52 rounded-full "
                src={img}
                onError={(e) => setImg('/img/account.png')}
              />
            </div>
            <div className='w-full flex justify-center items-center gap-3 py-3'>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-[50%] md:w-[200px]"
                name="avatar"
                accept="image/png, image/jpeg"
              />
              <button
                onClick={() => { setImg('/account.png') } }
                className=' w-[40%] md:w-[200px] border-2 border-gray-800/40
                  rounded-md py-1 px-3
                  font-bold bg-gray-700 text-white hover:bg-gray-200
                  hover:text-gray-700
                  focus:ring-4 focus:ring-gray-400'>
                Delete avatar
              </button>
            </div>
          </div>
        </div>
        <div className='py-2'>
          <h3 className=' font-medium mb-3 md:pl-10'>change your information</h3>
          <div className='grid gap-3 md:grid-cols-2'>
            <div className='flex flex-col justify-center  gap-2 md:pl-28'>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full md:w-2/3 mt-2 bg-gray-300 p-2 rounded-md focus:outline-none'
              />
              <p className='px-2 md:w-2/3 text-sm mt-[-10px]'>name</p>
            </div>
            <div className='flex flex-col gap-2 md:pl-28'>
              <textarea
                type='text'
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder='Bio'
                className='w-full md:w-[80%] mt-2 bg-gray-300 p-2 rounded-md focus:outline-none'
                maxLength="200"
                rows="5"
              />
              <p className='px-2 md:w-[80%] text-sm mt-[-10px]'>bio</p>
            </div>
          </div>
          <div className='text-center my-2 py-2'>
            <button className=' border-2 border-gray-800/40 rounded-md py-2 px-4
              font-bold bg-gray-700 text-white hover:bg-gray-200 hover:text-gray-700 focus:ring-4 focus:ring-gray-400'
              onClick={submit_form}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EditProfile;