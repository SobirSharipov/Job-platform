import { useGetCategoriesQuery } from '@/services/userApi';
import { Dropdown } from 'antd';
import React from 'react';
import { useTheme } from './ThemeContext';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const { darkMode } = useTheme();
  const router = useRouter();

  if (isLoading) 
    return <p className="text-center mt-10">{darkMode ? 'Загрузка...' : 'Loading...'}</p>;
  
  if (error) 
    return <p className={`text-center mt-10 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Ошибка загрузки</p>;

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
      {data && data.map(category => {
        const items = category.subcategories.map(sub => ({
          key: sub.id,
          label: (
            <span
              onClick={() => router.push(`/CategoriesInfo/${sub.id}`)}
              className={`cursor-pointer block px-4 py-2 rounded-md transition-colors
                ${darkMode 
                  ? 'hover:bg-gray-700 hover:text-blue-400' 
                  : 'hover:bg-gray-100 hover:text-blue-600'}`}
            >
              {sub.name}
            </span>
          ),
        }));

        return (
          <Dropdown
            key={category.id}
            menu={{ items }}
            placement="bottomLeft"
            arrow
            trigger={['click']}
          >
            <button
              className={`
                w-full h-20 flex justify-center items-center rounded-xl shadow-md font-semibold
                transition transform duration-200 hover:scale-105
                ${darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-800'}
              `}
            >
              {category.name}
            </button>
          </Dropdown>
        );
      })}
    </div>
  );
};

export default Categories;
