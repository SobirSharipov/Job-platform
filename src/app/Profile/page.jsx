"use client"
import { useTheme } from '@/components/ThemeContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Carousel, Input, Modal } from 'antd';
import { useDeleteInfoMutation, useDeletImgMutation, useGetUserQuery, useUpdateUserMutation } from '@/services/userApi';
import toast from 'react-hot-toast';

const Profile = () => {
    const { data, refetch } = useGetUserQuery();
    const [updateUser] = useUpdateUserMutation();
    let [deletImg] = useDeletImgMutation()
    const { darkMode } = useTheme();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem("Userid"));
    const currentUser = data?.find(el => el.userId == token);
    const [deleteInfo] = useDeleteInfoMutation();
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        age: '',
        city: '',
        number: '',
        university: '',
        graduationYear: '',
        experience: '',
        skills: '',
        goals: '',

    });
    let [Image, setImage] = useState(null)
    const [Images, setImages] = useState([]);


    useEffect(() => {
        if (data && !currentUser) {
            router.push('/JobForm');
        }
    }, [data, currentUser, router]);


    const showModal = () => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                specialty: currentUser.specialty || '',
                age: currentUser.age || '',
                city: currentUser.city || '',
                number: currentUser.number || '',
                university: currentUser.university || '',
                graduationYear: currentUser.graduationYear || '',
                experience: currentUser.experience || '',
                skills: currentUser.skills || '',
                goals: currentUser.goals || '',

            });
        }
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            await updateUser({
                id: currentUser.id,
                ...formData,
                image: Image || currentUser.image
            }).unwrap();

            toast.success('Профиль обновлён!');
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            toast.error('Ошибка при обновлении профиля');
        }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


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


    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = [];

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push({
                        id: Date.now(),
                        url: reader.result
                    });


                    if (newImages.length === files.length) {
                        setImages(prev => [...prev, ...newImages]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const saveImages = async () => {
        try {
            await updateUser({
                id: currentUser.id,
                ...currentUser,
                img: [...(currentUser.img || []), ...Images]
            }).unwrap();

            toast.success("Фото добавлены");
            setImages([]);
            refetch();
        } catch (error) {
            toast.error("Ошибка при сохранении фото");
        }
    };

    const handleDeleteImg = async (id) => {
        try {
            const newImages = currentUser.img.filter(photo => photo.id !== id);

            await updateUser({
                id: currentUser.id,
                ...currentUser,
                img: newImages
            }).unwrap();

            toast.success("Фото удалено!");
            refetch();
        } catch (error) {
            toast.error("Ошибка при удалении фото");
        }
    };




    return (
        <div >
            <Modal
                title="Редактировать профиль"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-3"
                />

                {Image && (
                    <img src={Image} alt="preview" className="w-32 h-32 object-cover rounded-full  my-2" />
                )}
                {Object.keys(formData).map((key) => (
                    <Input
                        key={key}
                        name={key}
                        value={formData[key]}
                        placeholder={key}
                        onChange={handleChange}
                        className="mb-3"
                    />
                ))}

            </Modal>


            <div className={` p-6 transition-colors duration-500  justify-center items-center min-h-[91vh] 
             ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100" : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"}`}>
                <div className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 backdrop-blur-sm
          ${darkMode ? "bg-gray-800/90  shadow-black" : "bg-white/90 hover:bg-gray-50 "}`}>

                    <div className="md:w-1/3 p-4 flex flex-col justify-center">
                        <button
                            onClick={() => handleDelete(currentUser.id)}
                            className="absolute text-red-500 top-5 left-5 hover:text-red-700 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        {currentUser && (
                            <>
                                <img
                                    src={currentUser.image}
                                    alt={currentUser.name}
                                    className={`h-full rounded-2xl shadow-lg w-full object-cover`}
                                />
                            </>
                        )}
                    </div>


                    <div className="md:w-2/3 flex flex-col gap-6 p-6">
                        {currentUser && (
                            <>
                                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                                    {currentUser.name}
                                </h1>
                                {/* {currentUser.specialty.map(el=>(
                                <p className={`text-2xl italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    {el.name}
                                </p>

                                    ))} */}
                                {Array.isArray(currentUser.specialty) ? currentUser.specialty.map(s => (
                                    <p key={s.id} className={`text-2xl italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        {s.name}
                                    </p>
                                )) : (
                                    <p className={`text-2xl italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        {currentUser.specialty?.name || "Без категории"}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg leading-relaxed">
                                    <p><span className="font-semibold text-blue-500">Возраст:</span> {currentUser.age}</p>
                                    <p><span className="font-semibold text-blue-500">Город:</span> {currentUser.city}</p>
                                    <p><span className="font-semibold text-blue-500">Телефон:</span> {currentUser.number}</p>
                                    <p><span className="font-semibold text-blue-500">Университет:</span> {currentUser.university}</p>
                                    <p><span className="font-semibold text-blue-500">Курс:</span> {currentUser.graduationYear}</p>
                                    <p><span className="font-semibold text-blue-500">Опыт:</span> {currentUser.experience}</p>
                                    {/* {currentUser.skills.map(el=>(
                                        <p><span className="font-semibold text-blue-500">Навыки:</span>{el.name} </p>

                                    ))} */}
                                    {Array.isArray(currentUser.skills) ? currentUser.skills.map(s => (
                                        <p key={s.id}><span className="font-semibold text-blue-500">Навыки: </span>
                                            {s.name}
                                        </p>
                                    )) : (
                                        <p><span className="font-semibold text-blue-500">Навыки: </span>
                                            {currentUser.skills?.name || ""}
                                        </p>
                                    )}
                                    <p className="md:col-span-2">
                                        <span className="font-semibold text-blue-500">О себе:</span> {currentUser.goals}
                                    </p>
                                </div>

                                <div>
                                    <button onClick={showModal} className="w-full py-3 flex justify-center items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                                        Edit <FaEdit className="text-xl" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                </div>
                <div className={`${darkMode ? "bg-gray-800/90  shadow-black" : "bg-white/90 hover:bg-gray-50 "} w-[88%] mt-[40px] mx-auto rounded-2xl`}>
                    <div className='flex justify-around  items-center py-[20px]'>
                        <h2 className="text-xl font-bold mb-2  ">
                            Поделиться своим новым достижением 🚀
                        </h2>
                        <div className="flex items-center gap-2">
                            <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
                            <button
                                onClick={saveImages}
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                    {currentUser?.img && currentUser.img.length > 0 && (
                        <div className="mt-6 rounded-xl overflow-hidden   dark:border-gray-700 shadow-lg p-4">

                            <div className="grid grid-cols-4 gap-[20px]">
                                {currentUser.img.map((photo, idx) => (
                                    <div key={`${photo.id}-${idx}`} className="justify-center items-center mb-4">
                                        <button onClick={() => handleDeleteImg(photo.id)} className='absolute text-black'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <img
                                            src={photo.url}
                                            alt={`Фото ${idx}`}
                                            className="w-full h-[200px] object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
                </div>

            </div>


        </div>
    );
};

export default Profile;
