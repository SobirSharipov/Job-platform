"use client"
import Swiper from '@/components/Swiper'
import { useGetUserQuery } from '@/services/userApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from '@/components/ThemeContext'
import Categories from '@/components/Categories'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { data = [], refetch } = useGetUserQuery();
  const [Search, setSearch] = useState("");
  const router = useRouter();
  const { darkMode } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const { t, i18n } = useTranslation();
  function TranslateClick(lang) {
    i18n.changeLanguage(lang);
  }
 


  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    refetch()
  }, []);





  return (
    <div className={` transition-colors duration-500 
  ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
        : "bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900"
      }`}
    >
      <Swiper />
      <Categories />
      <div className="py-[100px]">

        <div
          className={`flex items-center mx-auto pl-3 pr-2 rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[90%] mb-[30px] border shadow-md transition
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            className={`w-full p-3 rounded-lg outline-none transition-colors
        ${darkMode
                ? "bg-gray-800 text-gray-200 placeholder-gray-400"
                : "bg-white text-gray-800 placeholder-gray-500"}`}
            placeholder={t("Test.23")}
            type="text"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[95%] sm:w-[90%] mx-auto">
          {data
            .filter((e) => e.name.toLowerCase().includes(Search.toLowerCase()))
            .map((el) => (
              <div key={el.id} data-aos="fade-up">
                <div
                  className={`relative flex flex-col md:flex-row rounded-2xl h-auto md:h-[280px] overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-[1.02]
              ${darkMode
                      ? "bg-gray-800 hover:bg-gray-700 shadow-gray-900"
                      : "bg-white hover:bg-gray-50 shadow-gray-300 hover:shadow-xl"}`}
                >
                  <div className="w-full md:w-[40%] h-[200px] md:h-auto relative">
                    <img
                      src={el.image}
                      alt="profile"
                      className="w-full h-full object-cover md:rounded-l-2xl"
                    />
                  </div>

                  <div className="flex flex-col justify-between px-6 py-4 w-full md:w-[60%]">
                    <div>
                      <h2
                        className={`text-xl md:text-2xl font-bold mb-1 ${darkMode ? "text-gray-100" : "text-gray-800"
                          }`}
                      >
                        {el.name}
                      </h2>

                      <p
                        className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                      >
                        {el.specialty?.name || "Без категории"}
                      </p>

                      <p className="text-blue-500 font-semibold text-lg mb-2">
                        {el.skills?.name || ""}
                      </p>
                      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {el.city}
                      </p>
                      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {el.experience}
                      </p>
                    </div>

                    <button
                      onClick={() => router.push(`/info/${el.id}`)}
                      className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition"
                    >
                      {t("Test.87")}
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
