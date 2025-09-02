"use client"
import { useTheme } from '@/components/ThemeContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTelegramPlane,FaInstagram  } from 'react-icons/fa';

const About = () => {
  const { darkMode } = useTheme();
   const { t, i18n } = useTranslation();
      function TranslateClick(lang) {
        i18n.changeLanguage(lang);
      }
  return (
    <div className={` py-[30px] ${ darkMode ? "bg-gradient-to-br from-gray-900 to-black text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"}`}>

   <div className='max-w-5xl mx-auto space-y-10'>

      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">{t("Test.24")}</h2>
        <p className="">
         {t("Test.25")}
        </p>
      </section>

   
      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">{t("Test.26")}</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>{t("Test.27")}</li>
          <li>{t("Test.28")}</li>
          <li>{t("Test.29")}</li>
          <li>{t("Test.30")}</li>
        </ul>
      </section>


      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">{t("Test.31")}</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>{t("Test.32")}</li>
          <li>{t("Test.33")}</li>
        </ul>
      </section>


      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">{t("Test.34")}</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>{t("Test.35")}</li>
          <li>{t("Test.36")}</li>
          <li>{t("Test.37")}</li>
        </ul>
      </section>
   </div>
    </div>
  );
}

export default About;
