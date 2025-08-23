"use client"
import React from 'react'
import { useLoginUserMutation } from "@/services/userApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import img1 from '../../../../public/img1.jpg'

import Link from "next/link";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser({
        lastName: data.lastName,
        password: data.password
      });

      if (res.data?.length > 0) {
        localStorage.setItem("currentUser", JSON.stringify(res.data[0]));
        toast.success("Login successful!");
        reset();
        router.push("/");
      } else {
        toast.error("Неверные данные");
      }
    } catch (err) {
      toast.error("Произошла ошибка");
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img1.src})` }}></div>
      <div className="relative bg-gray-800/80 rounded-3xl shadow-2xl p-10 w-[90%] max-w-2xl flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Authorization</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            placeholder="User Name"
            {...register("lastName", { required: true, maxLength: 20 })}
            className="p-3 bg-gray-700/70 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-300 transition-all"
          />

          <input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
            className="p-3 bg-gray-700/70 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-300 transition-all"
          />

          <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors">
            Log In
          </button>
        </form>

        <hr className="border-gray-600" />
        <p className="flex items-center justify-center text-white">
         Don't have an account?
          <Link href="/registor">
            <span className="text-blue-400 mx-2">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}


export default Login
