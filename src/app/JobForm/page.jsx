"use client"
import { useAddUserMutation, useGetCategoriesQuery } from '@/services/userApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/ThemeContext';

const JobForm = () => {
  const [add] = useAddUserMutation();
  const { data: categories, refetch } = useGetCategoriesQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [Images, setImages] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const token = JSON.parse(localStorage.getItem("Userid"));
  const { darkMode } = useTheme();
  const router = useRouter();

  const selectedCategory = categories?.find(cat => cat.id === selectedCategoryId);
  const selectedSub = selectedCategory?.subcategories.find(sub => sub.id === selectedSubId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!selectedCategory || !selectedSub ||   !form.Name.value || !form.age.value || !form.city.value || !form.number.value  || !form.experience.value || !form.Email.value ) {
      toast.error("Выберите категорию и подкатегорию!");
      return;
    }

    const userData = {
      userId: token,
      name: form.Name.value,
      age: form.age.value,
      city: form.city.value,
      number: form.number.value,
      university: form.university.value,
      specialty: {
        id: selectedCategory.id,
        name: selectedCategory.name,
        subcategories: selectedCategory.subcategories || []
      },
      skills: {
        id: selectedSub.id,
        name: selectedSub.name
      },
      graduationYear: form.graduationYear.value,
      experience: form.experience.value,
      Email: form.Email.value,
      goals: form.goals.value,
      image: previewUrl,
      img: Images
    };


    try {
      await add(userData).unwrap();
      toast.success("Ваш профиль успешно сохранён!");
      form.reset();
      setImages([]);
      setPreviewUrl(null);
      setSelectedCategoryId(null);
      setSelectedSubId(null);
      refetch();
      router.push('/');
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      toast.error("Не удалось сохранить профиль");
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({ id: new Date().getTime(), url: reader.result });
        if (newImages.length === files.length) {
          setImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={`lg:flex lg:p x-0 px-[10px] justify-around items-start py-[50px] ${darkMode ? "bg-gray-900" : ""}`}>
      <form
        onSubmit={handleSubmit}
        className={`lg:w-[50%] p-6 shadow rounded-lg space-y-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
      >
        <h2 className="text-2xl font-bold mb-4">Создание профиля</h2>

        <input type="text" name="Name" placeholder="ФИО" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="number" name="age" placeholder="Возраст" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="city" placeholder="Город" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="number" name="number" placeholder="Телефон" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="university" placeholder="Университет" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />

        <div>
          <select
            name='specialty'
            value={selectedCategoryId || ""}
            onChange={e => {
              setSelectedCategoryId(Number(e.target.value));
              setSelectedSubId(null);
            }}
            className={`w-full p-2 border rounded mb-4 ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
          >
            <option value="">Выберите категорию</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            name='skills'
            value={selectedSubId || ""}
            onChange={e => setSelectedSubId(Number(e.target.value))}
            disabled={!selectedCategory}
            className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
          >
            <option value="">Выберите подкатегорию</option>
            {selectedCategory?.subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>

        <input type="text" name="graduationYear" placeholder="Курс или Год окончания" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="experience" placeholder="Опыт" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <input type="text" name="Email" placeholder="Телеграм" className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`} />
        <textarea
          name="goals"
          placeholder="Мои навыки и умения"
          rows={4}
          className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-300" : ""}`}
        />

        <button
          type="submit"
          className={`w-full py-2 rounded ${darkMode ? "bg-blue-700 hover:bg-blue-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          Сохранить профиль
        </button>
      </form>

      <div className='lg:w-[30%] lg:mt-0 mt-10'>
        <div className={`p-4 w-[100%] lg:h-[75vh] h-[40vh] border-2 border-dashed shadow rounded-lg flex justify-center items-center ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
          {!previewUrl ? (
            <input type="file" accept="image/*" onChange={handleImageChange} className={darkMode ? "text-white" : ""} />
          ) : (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          )}
        </div>

        <div className={`text-center mt-2 ${darkMode ? "text-white" : ""}`}>
          <p className='font-bold text-2xl'>Достижение!</p>
        </div>

        <div className={`p-4 w-[100%] h-[50vh] mt-[20px] border-2 border-dashed shadow rounded-lg grid grid-cols-2 gap-2 overflow-auto ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
          {Images.length === 0 ? (
            <input type="file" accept="image/*" onChange={handleImages} multiple className={darkMode ? "text-white" : ""} />
          ) : (
            Images.map((img, idx) => (
              <img key={`${img.id}-${idx}`} src={img.url} alt={`Preview `} className="w-[100%] h-[150px] object-cover rounded-lg" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobForm;
