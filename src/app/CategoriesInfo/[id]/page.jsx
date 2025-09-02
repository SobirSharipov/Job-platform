'use client'
import { useTheme } from '@/components/ThemeContext'
import { useGetUserQuery } from '@/services/userApi'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'

const CategoriesInfo = () => {
  const { id } = useParams()
  const { data = [] } = useGetUserQuery()
  const { darkMode } = useTheme()
  const router = useRouter()

  const users = data.filter(u => String(u.skills.id) === String(id))

  if (!users.length) return <p className="text-center mt-10">{darkMode ? 'Нет пользователей' : 'No users found'}</p>

  return (
    <div className={`min-h-[91vh] p-6 transition-colors duration-500
      ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="w-[100%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

        {users.map(user => (
          <div
            key={user.id}
            className={`flex rounded h-70  overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105
              ${darkMode ? "bg-gray-800/90 shadow-black" : "bg-white/90 shadow-gray-300"}`}
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-[50%] h-full object-cover"
            />

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className={`text-sm italic mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {user.specialty?.name || ""}
              </p>

              <div className="text-sm mb-3 space-y-1">
                <p><span className="font-semibold text-blue-500">Город:</span> {user.city}</p>
                <p><span className="font-semibold text-blue-500">Университет:</span> {user.university}</p>
                <p><span className="font-semibold text-blue-500">Навыки:</span> {user.skills?.name || ""}</p>
              </div>

              <button
                onClick={() => router.push(`/info/${user.id}`)}
                className="mt-auto w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition"
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default CategoriesInfo
