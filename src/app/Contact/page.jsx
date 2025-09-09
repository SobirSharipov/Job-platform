"use client";
import { useTheme } from "@/components/ThemeContext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
  const { darkMode } = useTheme();
  const { t, i18n } = useTranslation();
  function TranslateClick(lang) {
    i18n.changeLanguage(lang);
  }
  let [name, setname] = useState('')
  let [email, setemail] = useState('')
  let [message, setmessage] = useState('')
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      return toast.error(t("Test.90"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error(t("Test.91"));
    }

    toast.success(
      `✅ ${t("Test.89")}\n\n👤 ${name}\n📧 ${email}\n💬 ${message}`
    );

    setname("");
    setemail("");
    setmessage("");
  }


  return (
    <div
      className={`min-h-screen flex flex-col items-center py-16 px-4 transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 to-black text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"
        }`}
    >
      <h2 className="text-4xl font-extrabold mb-4 text-center">
        {t("Test.38")}
      </h2>
      <p
        className={`mb-10 max-w-xl text-center ${darkMode ? "text-gray-400" : "text-gray-600"
          }`}
      >
        {t("Test.39")}
      </p>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl p-8 rounded-2xl shadow transition-all ${darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"
          }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={name} onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder={t("Test.40")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={email} onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder={t("Test.41")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <textarea
          value={message} onChange={(e) => setmessage(e.target.value)}
          placeholder={t("Test.42")}
          rows={5}
          className="w-full p-3 border rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition"
        >
          📩 {t("Test.43")}
        </button>
      </form>

      <div
        className={`mt-12 p-6 rounded-xl shadow-lg text-center space-y-2 w-full max-w-lg transition ${darkMode ? "bg-gray-800/70" : "bg-white"
          }`}
      >
        <p className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          {t("Test.44")}{" "}
          <span className="font-semibold">+992 915 22 16 10</span>
        </p>
        <p>
          ✉️ {t("Test.15")}: <span className="font-semibold">sobir@gmail.com</span>
        </p>
        <p className="flex items-center justify-center gap-2">
           <FaTelegramPlane /> Telegram: <span className="font-semibold">@Sobirjon_ll_04</span>
        </p>
      </div>


      <div className="lg:flex gap-8 mt-10">
        <a
          href="https://www.linkedin.com/in/sobirjon-sharipov-6934b4380/" 
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 transition ${darkMode ? "text-white" : ""}`}
        >
          <FaLinkedin className="text-3xl" />
          <span className="font-semibold">LinkedIn</span>
        </a>

        <a
          href="https://t.me/Sobirjon_ll_04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:underline transition"
        >
          <FaTelegramPlane className="text-3xl" />
          <span className="font-semibold">@Sobirjon_ll_04</span>
        </a>

        <a
          href="https://instagram.com/2.0.0.4.SOBIRSHARIPOV"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-pink-500 hover:underline transition"
        >
          <FaInstagram className="text-3xl" />
          <span className="font-semibold">@2.0.0.4.SOBIRSHARIPOV</span>
        </a>
      </div>


    </div>
  );
}
