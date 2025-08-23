"use client"
import Swiper from '@/components/Swiper'
import { useGetUserQuery } from '@/services/userApi'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
// let api="http://localhost:3000/data"
const Home = () => {
  let { data } = useGetUserQuery()

  let [Search, setSearch] = useState("")

  let router = useRouter();

  const [token, setToken] = useState("")

  useEffect(() => {
    const savedToken = localStorage.getItem("currentUser")
    if (!savedToken) {
      router.push("/login")
    } else {
      setToken(savedToken)
    }
  }, [router])


  useEffect(() => {
    AOS.init({
      duration: 2000, // время анимации
      once: true,     // анимация запускается только один раз
    });
  }, []);


  return (
    <div>
      <Swiper/>
      <div className='bg-blue-400 py-[100px]'>
        <div className='flex items-center mx-auto pl-[10px] rounded bg-white w-[90%] mb-[30px] '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

          <input className='bg-white w-[100%] p-[10px] rounded' placeholder='Search...' type="text" value={Search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className='grid grid-cols-3 gap-[30px] w-[90%] mx-auto'>
          {
            data && data.filter(e => e.name.toLowerCase().includes(Search.toLowerCase())).map(el => {
              return (
                <div key={el.id}  data-aos="fade-up">

                <div className=' p-[20px] rounded-[10px] bg-white' >
                  <p className='font-bold text-3xl text-blue-700'>{el.name}</p>
                  <p className=' font-bold text-[20px] text-gray-400'>{el.componi}</p>
                  <p className='font-bold text-2xl text-green-500'>{el.prase}$</p>
                  <p>{el.status ? "Active" : "Inactive"}</p>
                  <button className='w-[100%] p-[10px] bg-blue-600 text-white font-bold rounded mt-[20px]'>Save</button>
                </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home