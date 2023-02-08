import AllWriters from '@/src/components/all_writers/AllWriters'
import Navbar from '@/src/components/navbar/Navbar'
import axios from 'axios'
import React from 'react'


export interface writers {
  data : {
  _id: string,
  username: string,
  name: string,
  bio: string,
  avatar: string,
  averageScore: number,
  createdAt: string,
  updatedAt: string
}[]
}

const allWriters: React.FC<writers> = ({data}) => {
  return (
    <>
      <Navbar />
      <AllWriters data={data} />
    </>
  )
}

export default allWriters;

export const getStaticProps = async () => {
  
  const { data } = await axios("http://localhost:4000/user/");

  console.log(data)

  return {
    props: {
      data
    }
  }

}