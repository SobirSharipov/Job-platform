"use client";
import { useTheme } from "@/components/ThemeContext";
import { useGetUserQuery } from "@/services/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTelegramPlane } from "react-icons/fa";

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const { darkMode } = useTheme();
    const { data = [], refetch } = useGetUserQuery();

    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem("Like")) || [];
        setBookmarks(savedLikes);
    }, []);
    const handleDelete = (id) => {
        const updated = bookmarks.filter(el => el.id !== id)
        setBookmarks(updated)
        localStorage.setItem('Like', JSON.stringify(updated))
        toast.success("User Удалён")
        refetch()
    }



    return (
        <div
            className={`p-6 min-w-[95%] min-h-[91vh] mx-auto ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                }`}
        >
            <h2 className="text-2xl font-bold mb-6 text-center">{bookmarks.length > 0 ?"Избранное":""}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {bookmarks.length > 0 ? (
                    bookmarks.map((user) => (
                        <div
                            key={user.id}
                            className={`border rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl backdrop-blur-md ${darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"} h-full`}
                        >
                            <button className="text-red-600 absolute z-30" onClick={() => handleDelete(user.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-inner">
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-extrabold text-xl mb-2 text-center">{user.name}</h3>
                            </div>

                            <div className="flex-1 text-start mb-4">
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-600">Специальность:</span> {user.specialty?.name || "-"}</p>
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-600">Навыки:</span> {user.skills?.name || "-"}</p>
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-600">Университет:</span> {user.university || "-"}</p>
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-600">Год выпуска:</span> {user.graduationYear || "-"}</p>
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-600">Опыт:</span> {user.experience || "-"}</p>
                                <p className="text-sm"><span className="font-semibold text-blue-600">Цели:</span> {user.goals || "-"}</p>
                            </div>

                            <a href={`https://t.me/${user.Email}`} target="_blank" rel="noopener noreferrer">
                                <button className="w-full flex justify-center items-center gap-2 py-2 mt-auto rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold shadow-lg hover:shadow-2xl transition">
                                    Связаться <FaTelegramPlane />
                                </button>
                            </a>
                        </div>
                    ))
                ) : (
                    <div className={`p-6 text-center ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                        Нет сохранённых пользователей
                    </div>
                )}


            </div>
        </div>
    );
};

export default Bookmark;
