"use client"
import Swiper from '@/components/Swiper'
import { useDeleteInfoMutation, useGetUserQuery } from '@/services/userApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import toast from 'react-hot-toast'
import { useTheme } from '@/components/ThemeContext'

const Home = () => {
  const { data = [], refetch } = useGetUserQuery();
  const [deleteInfo] = useDeleteInfoMutation();
  const [currentUser, setCurrentUser] = useState(null);
  const [Search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      router.push("/login");
    } else {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, [router]);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInfo(id).unwrap();
      toast.success("Ваш сиви удален!");
      refetch();
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении профиля");
    }
  };

  const { darkMode } = useTheme();

  return (
    <div className={`py-[30px] transition-colors duration-500 
  ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
        : "bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900"
      }`}
    >
      <Swiper />
      <div className="py-[100px]">
        <div className={`flex items-center mx-auto pl-[10px] rounded-lg w-[90%] mb-[30px] border shadow-md
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className={`size-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

          <input
            className={`w-full p-[10px] rounded-lg outline-none transition-colors
          ${darkMode ? "bg-gray-800 text-gray-200 placeholder-gray-400" : "bg-white text-gray-800 placeholder-gray-500"}`}
            placeholder="Search..."
            type="text"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] w-[90%] mx-auto">
          {data
            .filter(e => e.name.toLowerCase().includes(Search.toLowerCase()))
            .map(el => (
              <div key={el.id} data-aos="fade-up">
                <div className={`relative flex flex-col md:flex-row rounded-2xl h-[300px] overflow-hidden shadow-lg transition-all duration-500
              ${darkMode
                    ? "bg-gray-800 hover:bg-gray-700 shadow-gray-900"
                    : "bg-white hover:bg-gray-50 shadow-gray-300 hover:shadow-xl"}`}
                >
                  <div className="w-full md:w-[40%] relative">
                    {currentUser && el.userId === currentUser.id && (
                      <button
                        onClick={() => handleDelete(el.id)}
                        className="absolute text-red-500 top-3 left-3 hover:text-red-700 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                          className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    )}
                    <img
                      src={el.image}
                      alt="profile"
                      className="w-full h-full object-cover md:rounded-l-2xl"
                    />
                  </div>

                  <div className="flex flex-col justify-between px-6 py-4 w-full md:w-[60%]">
                    <div>
                      <h2 className={`text-2xl font-bold mb-1 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                        {el.name}
                      </h2>
                      <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {el.specialty}
                      </p>
                      <p className="text-blue-500 font-semibold text-lg mb-2">
                        {el.skills}
                      </p>
                      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        <span className="font-semibold">City:</span> {el.city}
                      </p>
                      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        <span className="font-semibold">Experience:</span> {el.experience}
                      </p>
                    </div>

                    <button
                      onClick={() => router.push(`/info/${el.id}`)}
                      className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>

  )
}

export default Home
