"use client"
import { useTheme } from '@/components/ThemeContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Carousel, Input, Modal } from 'antd';
import { useGetUserQuery, useUpdateUserMutation } from '@/services/userApi';
import toast from 'react-hot-toast';

const Profile = () => {
    const { data, refetch } = useGetUserQuery();
    const [updateUser] = useUpdateUserMutation();
    const { darkMode } = useTheme();
    const router = useRouter();

    const token = JSON.parse(localStorage.getItem("Userid"));
    const currentUser = data?.find(el => el.userId == token);

    useEffect(() => {
        if (data && !currentUser) {
            router.push('/JobForm');
        }
    }, [data, currentUser, router]);

    const [isModalOpen, setIsModalOpen] = useState(false);
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
        image: '',
    });


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
                image: currentUser.image || '',
            });
        }
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            await updateUser({ id: currentUser.id, ...formData }).unwrap();
            toast.success('Профиль обновлён!');
            setIsModalOpen(false);
            refetch()
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

    return (
        <div>
            <Modal
                title="Редактировать профиль"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
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

            <div
                className={`min-h-[91vh] p-6 transition-colors duration-500 flex justify-center items-center
        ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100" : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"}`}
            >
                <div
                    className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 backdrop-blur-sm
          ${darkMode ? "bg-gray-800/90  shadow-black" : "bg-white/90 hover:bg-gray-50 shadow-gray-400"}`}
                >

                    <div className="md:w-1/3 p-4 flex flex-col justify-center">
                        {currentUser && (
                            <>
                                <img
                                    src={currentUser.image}
                                    alt={currentUser.name}
                                    className={`${currentUser.img ? "h-[320px]" : "h-full"} rounded-2xl shadow-lg w-full object-cover`}
                                />

                                {currentUser.img && currentUser.img.length > 0 && (
                                    <div className="mt-6 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-lg">
                                        <Carousel arrows infinite autoplay dots>
                                            {currentUser.img.map((photo, idx) => (
                                                <div key={idx} className="flex justify-center items-center">
                                                    <img
                                                        src={photo}
                                                        alt={`Фото ${idx}`}
                                                        className="w-full h-[200px] object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                )}
                            </>
                        )}
                    </div>


                    <div className="md:w-2/3 flex flex-col gap-6 p-6">
                        {currentUser && (
                            <>
                                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                                    {currentUser.name}
                                </h1>
                                <p className={`text-2xl italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    {currentUser.specialty}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg leading-relaxed">
                                    <p><span className="font-semibold text-blue-500">Возраст:</span> {currentUser.age}</p>
                                    <p><span className="font-semibold text-blue-500">Город:</span> {currentUser.city}</p>
                                    <p><span className="font-semibold text-blue-500">Телефон:</span> {currentUser.number}</p>
                                    <p><span className="font-semibold text-blue-500">Университет:</span> {currentUser.university}</p>
                                    <p><span className="font-semibold text-blue-500">Курс:</span> {currentUser.graduationYear}</p>
                                    <p><span className="font-semibold text-blue-500">Опыт:</span> {currentUser.experience}</p>
                                    <p><span className="font-semibold text-blue-500">Навыки:</span> {currentUser.skills}</p>
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
            </div>
        </div>
    );
};

export default Profile;
