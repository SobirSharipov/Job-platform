"use client"
import { useAddUserMutation } from '@/services/userApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useTheme } from '@/components/ThemeContext'

const Profile = () => {
  let [add] = useAddUserMutation()
  let router = useRouter()
  const { darkMode } = useTheme()

  const [imageFile, setImageFile] = useState(null);     
  const [previewUrl, setPreviewUrl] = useState(null);   
  const token = JSON.parse(localStorage.getItem("Userid"))

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.target;

    const userData = {
      userId: token,
      name: form.Name.value,
      age: form.age.value,
      city: form.city.value,
      number: form.number.value,
      university: form.university.value,
      specialty: form.specialty.value,
      graduationYear: form.graduationYear.value,
      experience: form.experience.value,
      skills: form.skills.value,
      Email: form.Email.value,
      goals: form.goals.value,
      image: previewUrl, 
    };

    console.log("Отправка данных:", userData);

    try {
      await add(userData).unwrap();
      router.push('/')
      toast.success("Профиль успешно сохранён!")
      form.reset();
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      alert("Не удалось сохранить профиль");
    }
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // здесь base64
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className={`flex justify-around items-start py-[50px] ${darkMode ? "bg-gray-900" : ""}`}>
      <form
        onSubmit={handleSubmit}
        className={`w-[50%] p-6 shadow rounded-lg space-y-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
      >
        <h2 className="text-2xl font-bold mb-4">{darkMode ? "Создание профиля" : "Создание профиля"}</h2>

        <input type="text" name="Name" placeholder="ФИО" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="number" name="age" placeholder="Возраст" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="city" placeholder="Город" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="number" name="number" placeholder="Телефон" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />

        <input type="text" name="university" placeholder="Университет" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="specialty" placeholder="Специальность" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="graduationYear" placeholder="Курс или Год окончания" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />

        <input type="text" name="experience" placeholder="Oпыть " className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="skills" placeholder="Навыки " className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="Email" placeholder="Телеграм " className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />

        <textarea
          name="goals"
          placeholder="Мои навыки и умения"
          className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`}
          rows={4}
        />

        <button
          type="submit"
          className={`w-full py-2 rounded ${darkMode ? "bg-blue-700 hover:bg-blue-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Сохранить профиль
        </button>
      </form>

      <div className={`p-4 w-[30%] h-[80vh] border-2 border-dashed shadow rounded-lg flex justify-center items-center ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
        {!previewUrl ? (
          <input type="file" accept="image/*" onChange={handleImageChange} className={darkMode ? "text-white" : ""}/>
        ) : (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  )
}

export default Profile;
