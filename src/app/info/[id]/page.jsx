"use client";
import { useParams } from "next/navigation";
import { useGetUserQuery } from "@/services/userApi";
import { FaTelegramPlane } from "react-icons/fa";
import { useTheme } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function InfoPage() {
  const { id } = useParams();
  const { data = [] } = useGetUserQuery();
  const { darkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const user = data.find((u) => String(u.id) === String(id));

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user) {
      const savedLikes = JSON.parse(localStorage.getItem("Like")) || [];
      const isLiked = savedLikes.some((el) => el.id === user.id);
      setLiked(isLiked);
    }
  }, [user?.id]);

  function Like(user) {
    let savedLikes = JSON.parse(localStorage.getItem("Like")) || [];

    if (liked) {
      savedLikes = savedLikes.filter((el) => el.id !== user.id);
      setLiked(false);
    } else {
      const newUser = {
        id: user.id,
        name: user.name,
        image: user.image,
        specialty: user.specialty,
        skills: user.skills,
        age: user.age,
        city: user.city,
        number: user.number,
        university: user.university,
        graduationYear: user.graduationYear,
        experience: user.experience,
        goals: user.goals,
        Email: user.Email
      };
      savedLikes.push(newUser);
      setLiked(true);
    }

    localStorage.setItem("Like", JSON.stringify(savedLikes));
  }

  if (!user) return null;

  return (
    <div
      className={`min-h-[91vh] p-6 transition-colors duration-500 justify-center items-center
        ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
        }`}
    >
      <div
        className={`w-full lg:h-[80vh] max-w-6xl mx-auto flex flex-col md:flex-row gap-4 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 backdrop-blur-sm
          ${darkMode
            ? "bg-gray-800/90 shadow-black"
            : "bg-white/90 shadow-gray-400"
          }`}
      >
        <div className="md:w-1/3 p-4 flex flex-col justify-center">
          <img
            src={user.image}
            alt={user.name}
            className="h-full rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-3 p-6">
          <div className="flex justify-between items-center">

            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              {user.name}
            </h1>

            <button
              className="p-2 w-12 h-12 flex justify-center items-center"
              onClick={() => Like(user)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={darkMode ? "white" : "black"} 
                fill={liked ? (darkMode ? "white" : "black") : "none"} 
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </button>

          </div>

          <p className={`text-2xl italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {user.specialty?.name || ""}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg leading-relaxed">
            <p>
              <span className="font-semibold text-blue-500">{t("Test.59")}:</span> {user.age}
            </p>
            <p>
              <span className="font-semibold text-blue-500">{t("Test.60")}:</span> {user.city}
            </p>
            <p>
              <span className="font-semibold text-blue-500">{t("Test.61")}:</span> {user.number}
            </p>
            <p>
              <span className="font-semibold text-blue-500">{t("Test.62")}:</span> {user.university}
            </p>
            <p>
              <span className="font-semibold text-blue-500">{t("Test.63")}:</span> {user.graduationYear}
            </p>
            <p>
              <span className="font-semibold text-blue-500">{t("Test.64")}:</span> {user.experience}
            </p>
            <p>
              <span className="font-semibold text-blue-500">{t("Test.65")}:</span> {user.skills?.name || ""}
            </p>
            <p className="md:col-span-2">
              <span className="font-semibold text-blue-500">{t("Test.66")}:</span> {user.goals}
            </p>
          </div>

          <a
            href={`https://t.me/${user.Email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="w-full py-4 flex justify-center items-center gap-3 rounded-xl 
      bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
      text-white text-lg font-bold shadow-xl hover:shadow-2xl 
      hover:scale-[1.02] transition-transform duration-300"
            >
              {t("Test.67")} <FaTelegramPlane className="text-2xl" />
            </button>
          </a>
        </div>
      </div>

      <div
        className={`lg:w-[88%] mt-8 mx-auto p-[20px] rounded-2xl ${darkMode ? "bg-gray-800/90 shadow-black" : "bg-white/90 shadow-gray-400"
          }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          {t("Test.68")}
        </h2>
        <p className={`mb-6 text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {t("Test.69")}
        </p>

        {user.img && user.img.length > 0 && (
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {user.img.map((photo, idx) => (
              <div key={`${photo.id}-${idx}`} className="flex justify-center items-center">
                <img
                  src={photo.url}
                  alt={`Фото ${idx}`}
                  className="w-full h-[200px] object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
