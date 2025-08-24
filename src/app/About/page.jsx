"use client"
import { useTheme } from '@/components/ThemeContext';
import React from 'react';
import { FaTelegramPlane,FaInstagram  } from 'react-icons/fa';

const About = () => {
  const { darkMode } = useTheme();
  return (
    <div className={` py-[30px] ${ darkMode ? "bg-gradient-to-br from-gray-900 to-black text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"}`}>

   <div className='max-w-5xl mx-auto space-y-10'>

      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">О платформе</h2>
        <p className="">
          Наша платформа создана для того, чтобы помочь выпускникам и соискателям показать свои навыки и опыт потенциальным работодателям. Здесь компании могут просматривать профили кандидатов и связываться с ними напрямую.
        </p>
      </section>

   
      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">Основные функции</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>Регистрация и вход для пользователей.</li>
          <li>Создание и публикация профессионального профиля.</li>
          <li>Поиск и фильтрация профилей по категориям и подкатегориям.</li>
          <li>Удобная навигация по категориям для быстрого поиска нужных специалистов.</li>
        </ul>
      </section>


      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">Для кого платформа</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>Выпускники и соискатели: размещение информации о себе, поиск возможностей для работы и развития.</li>
          <li>Компании и работодатели: поиск подходящих кандидатов и возможность связаться с ними напрямую.</li>
        </ul>
      </section>


      <section className={`shadow-md rounded-lg p-6 ${  darkMode ? "bg-gray-800/70 text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold mb-4 ">Преимущества платформы</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>Удобный и интуитивно понятный интерфейс.</li>
          <li>Быстрый поиск и фильтрация профилей.</li>
          <li>Прозрачная и актуальная информация о кандидатах.</li>
        </ul>
      </section>
   </div>
    </div>
  );
}

export default About;
