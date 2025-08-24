"use client";
import { useParams } from "next/navigation";
import { useGetUserQuery } from "@/services/userApi";
import { FaTelegramPlane } from "react-icons/fa";
import { useTheme } from "@/components/ThemeContext";

export default function InfoPage() {
  const { id } = useParams();
  const { data = [] } = useGetUserQuery();
  const { darkMode } = useTheme();

  const user = data.find(u => String(u.id) === String(id));

  return (
    <div
      className={` h-[90vh] p-4 transition-colors duration-500
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <div
        className={`w-[90%] max-w-5xl my-[54px] mx-auto flex flex-col md:flex-row gap-8 rounded-xl shadow overflow-hidden transition-all duration-500
          ${darkMode ? "bg-gray-800 hover:bg-gray-700 shadow-gray-900" : "bg-white hover:bg-gray-50 shadow-gray-300"}`}
      >
        <div className="md:w-1/3 flex justify-center items-center ">
          <img
            src={user.image}
            alt={user.name}
            className="rounded-xl shadow-md w-full h-full object-cover"
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-4 p-4">
          <h1 className="text-4xl font-bold text-blue-500">{user.name}</h1>
          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {user.specialty}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <p><span className="font-semibold">Возраст:</span> {user.age}</p>
            <p><span className="font-semibold">Город:</span> {user.city}</p>
            <p><span className="font-semibold">Телефон:</span> {user.number}</p>
            <p><span className="font-semibold">Университет:</span> {user.university}</p>
            <p><span className="font-semibold">Курс:</span> {user.graduationYear}</p>
            <p><span className="font-semibold">Опыт:</span> {user.experience}</p>
            <p><span className="font-semibold">Навыки:</span> {user.skills}</p>
            <p className="md:col-span-2">
              <span className="font-semibold">О себе:</span> {user.goals}
            </p>
          </div>

          <a
            href={`https://t.me/${user.Email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full"
          >
            <button
              className="w-full py-3 flex justify-center items-center gap-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700
                text-white font-bold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition"
            >
              Связаться <FaTelegramPlane className="text-2xl" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
