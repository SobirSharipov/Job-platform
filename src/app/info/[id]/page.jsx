"use client";
import { useParams } from "next/navigation";
import { useGetUserQuery } from "@/services/userApi";
import { FaTelegramPlane } from "react-icons/fa";
import { useTheme } from "@/components/ThemeContext";
import { Carousel } from "antd";

export default function InfoPage() {
  const { id } = useParams();
  const { data = [] } = useGetUserQuery();
  const { darkMode } = useTheme();

  const user = data.find(u => String(u.id) === String(id));

  if (!user) return null;

  return (
    <div
      className={`min-h-[91vh] p-6 transition-colors duration-500  justify-center items-center
        ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
        }`}
    >
      <div
        className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-4 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 backdrop-blur-sm
          ${darkMode
            ? "bg-gray-800/90  shadow-black"
            : "bg-white/90  shadow-gray-400"
          }`}
      >

        <div className="md:w-1/3 p-4 flex flex-col justify-center">
          <img
            src={user.image}
            alt={user.name}
            className={`h-full   rounded-2xl shadow-lg w-full  object-cover`}
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-3 p-6">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {user.name}
          </h1>
          <p className={`text-2xl italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>   {user.specialty?.name || " "} </p>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg leading-relaxed">
            <p><span className="font-semibold text-blue-500">Возраст:</span> {user.age}</p>
            <p><span className="font-semibold text-blue-500">Город:</span> {user.city}</p>
            <p><span className="font-semibold text-blue-500">Телефон:</span> {user.number}</p>
            <p><span className="font-semibold text-blue-500">Университет:</span> {user.university}</p>
            <p><span className="font-semibold text-blue-500">Курс:</span> {user.graduationYear}</p>
            <p><span className="font-semibold text-blue-500">Опыт:</span> {user.experience}</p>
            <p><span className="font-semibold text-blue-500">Навыки: </span>   {user.skills?.name || ""} </p>
            <p className="md:col-span-2">   <span className="font-semibold text-blue-500">О себе:</span> {user.goals} </p>
          </div>

          <a
            href={`https://t.me/${user.Email}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" "
          >
            <button
              className="w-full py-4 flex justify-center items-center gap-3 rounded-xl 
      bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
      text-white text-lg font-bold shadow-xl hover:shadow-2xl 
      hover:scale-[1.02] transition-transform duration-300"
            >
              Связаться <FaTelegramPlane className="text-2xl" />
            </button>
          </a>

        </div>
      </div>
      <div
        className={` w-[88%] mt-8 mx-auto  p-[20px] rounded-2xl ${darkMode
          ? "bg-gray-800/90  shadow-black"
          : "bg-white/90  shadow-gray-400"
          }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Мои достижения и проекты 🚀
        </h2>
        <p className={`mb-6 text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Здесь я делюсь своими результатами, проектами и важными моментами,
          которые показывают мой путь и опыт.
        </p>

        {user.img && user.img.length > 0 && (
          <div className="mt-6 grid grid-cols-4 gap-[20px]">
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

    </div >
  );
}
