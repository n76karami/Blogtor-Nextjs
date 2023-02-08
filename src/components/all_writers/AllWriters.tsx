import React from 'react'
import WriterCard from './WriterCard';
import { writers as allwriters } from '@/pages/allWriters';

const AllWriters: React.FC<allwriters> = ({ data }) => {
  console.log(data)

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <main className="w-full h-screen relative px-8">
        <div className="absolute top-[calc(50vh-37%)] left-[calc(50vw-45%)]
          flex flex-col w-[90%] mx-auto px-1 py-3">
          <h1 className="text-center text-gray-100">All Writers</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center">
            {data.length !== 0 ? (
              data.map((writer) => {
                return <WriterCard key={writer._id} writer={writer} />;
              })
            ) : (
              <p className="font-semibold md:col-span-2 lg:col-span-3 pt-20">
                No Writers signed up yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default AllWriters;