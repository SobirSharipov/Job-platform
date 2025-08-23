import React from 'react';
import { FaTelegramPlane,FaInstagram  } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">

      {/* О платформе */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">О платформе</h2>
        <p className="text-gray-700">
          Наша платформа создана для того, чтобы помочь выпускникам и соискателям показать свои навыки и опыт потенциальным работодателям. Здесь компании могут просматривать профили кандидатов и связываться с ними напрямую.
        </p>
      </section>

      {/* Основные функции */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Основные функции</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Регистрация и вход для пользователей.</li>
          <li>Создание и публикация профессионального профиля.</li>
          <li>Поиск и фильтрация профилей по категориям и подкатегориям.</li>
          <li>Удобная навигация по категориям для быстрого поиска нужных специалистов.</li>
        </ul>
      </section>

      {/* Для кого платформа */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Для кого платформа</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Выпускники и соискатели: размещение информации о себе, поиск возможностей для работы и развития.</li>
          <li>Компании и работодатели: поиск подходящих кандидатов и возможность связаться с ними напрямую.</li>
        </ul>
      </section>

      {/* Преимущества платформы */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Преимущества платформы</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Удобный и интуитивно понятный интерфейс.</li>
          <li>Быстрый поиск и фильтрация профилей.</li>
          <li>Прозрачная и актуальная информация о кандидатах.</li>
        </ul>
      </section>

      {/* Контакты */}
        <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Контакты</h2>
        <p className="text-gray-700 mb-2">
          Для вопросов и сотрудничества вы можете связаться со мной:
        </p>
        <div className='flex gap-[30px]'>

        <a 
          href="https://t.me/Sobirjon_ll_04" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline"
        >
          <FaTelegramPlane className="mr-2 text-2xl" /> @Sobirjon_ll_04
        </a>
         <a 
            href="https://instagram.com/2.0.0.4.SOBIRSHARIPOV" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-pink-500 hover:underline"
          >
            <FaInstagram className="mr-2 text-2xl" /> @2.0.0.4.SOBIRSHARIPOV
          </a>
        </div>
      </section>


    </div>
  );
}

export default About;
