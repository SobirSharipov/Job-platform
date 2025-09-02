"use client"
import { useRegistrAddMutation } from "@/services/userApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import img from '../../../../public/img.jpg'
import img1 from '../../../../public/img1.jpg'
import img3 from '../../../../public/Test1.jpg'
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";





export default function Registor() {
  let [Add] = useRegistrAddMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter()
  const { t, i18n } = useTranslation();
  function TranslateClick(lang) {
    i18n.changeLanguage(lang);
  }


  const onSubmit = async (user) => {
    try {
      const newUser = {
        id: Date.now(),
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      };

      const res = await Add(newUser)
      if (res) {
        localStorage.setItem("currentUser", JSON.stringify(newUser))
        localStorage.setItem("Userid", JSON.stringify(newUser.id))
        toast.success("Registration successful!");
        reset()
        router.push("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }

    } catch (error) {
      console.error("Ошибка при добавлении:", error)
    }
  }






  return (
    <div className="flex  justify-center items-center min-h-screen bg-gray-900 relative">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img3.src})` }}
      ></div>

      <div className="relative bg-gray-800/80 rounded-3xl shadow-2xl p-10 w-[90%] max-w-2xl flex flex-col gap-6">

        <h2 className="text-3xl font-bold text-white mb-4 text-center">{t("Test.13")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input
            className="p-3 bg-gray-700/70 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-300 transition-all"
            placeholder={t("Test.14")}
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
          />
          <input
            className="p-3 bg-gray-700/70 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-300 transition-all"
            placeholder={t("Test.15")}
            {...register("firstName", { required: true, maxLength: 20 })}
          />

          <input
            className="p-3 bg-gray-700/70 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-300 transition-all"
            placeholder={t("Test.16")}
            type="password"
            {...register("password", { required: true })}
          />

          <button
            className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors"
            type="submit"
          >
            {t("Test.17")}
          </button>
          <hr className="border-gray-600" />
          <p className="flex items-center justify-center font-bold text-white">{t("Test.18")}
            <Link href={'/login'}>
              <span className="text-blue-400 mx-2">{t("Test.19")}</span>
            </Link>
          </p>
        </form>

      </div>
    </div>
  )

}