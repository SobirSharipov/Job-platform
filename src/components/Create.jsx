"use client"
import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { useTheme } from './ThemeContext';
import { useAddProfileMutation, useGetProfileQuery } from '@/services/userApi';

const Create = () => {
     const { data: ProfileData, refetch} = useGetProfileQuery()
    const { darkMode } = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [AddProfile] = useAddProfileMutation()
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
  const token = JSON.parse(localStorage.getItem("Userid"))
    let [Addname, setAddname] = useState("")
    let [Addage, setAddage] = useState("")
    let [Addcity, setAddcity] = useState("")
    let [Addemail, setAddemail] = useState("")
    let [AddSkills, setAddSkills] = useState("")

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function Add() {
        let newProfile = {
            name: Addname,
            userid:token,
            age: Addage,
            city: Addcity,
            email: Addemail,
            skills: AddSkills,
            avatar: previewUrl 
        }
        await AddProfile(newProfile)
        setIsModalOpen(false);
        refetch()
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={showModal}
                className={`px-4 py-2 rounded-xl mt-4 font-medium transition ${darkMode
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
            >
                Редактировать профиль
            </button>

            <Modal
                title="Редактировать профиль"
                open={isModalOpen}
                onOk={Add}
                onCancel={handleCancel}
            >
                {/* Загрузка фото */}
                <div className="mb-4 flex flex-col items-center">
                    {!previewUrl ? (
                        <label className="cursor-pointer border p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <span className="text-sm text-gray-600">Загрузить фото</span>
                        </label>
                    ) : (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-28 h-28 object-cover rounded-full border shadow-md"
                        />
                    )}
                </div>

                {/* Поля */}
                <Input value={Addname} onChange={(e) => setAddname(e.target.value)} placeholder='Name...' className="mb-2" />
                <Input value={Addcity} onChange={(e) => setAddcity(e.target.value)} placeholder='City...' className="mb-2" />
                <Input value={Addage} onChange={(e) => setAddage(e.target.value)} placeholder='Age...' className="mb-2" />
                <Input value={Addemail} onChange={(e) => setAddemail(e.target.value)} placeholder='Email...' className="mb-2" />
                <Input value={AddSkills} onChange={(e) => setAddSkills(e.target.value)} placeholder='Skills...' className="mb-2" />
            </Modal>
        </div>
    )
}

export default Create
