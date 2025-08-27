import { useGetCategoriesQuery } from '@/services/userApi';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import { useTheme } from './ThemeContext';

const Categories = () => {
    const { data, isLoading, error } = useGetCategoriesQuery();
    const { darkMode } = useTheme();

    if (isLoading) return <p className="text-center mt-10">{darkMode ? 'Загрузка...' : 'Loading...'}</p>;
    if (error) return <p className={`text-center mt-10 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Ошибка загрузки</p>;

    return (
        <div className='grid grid-cols-4 gap-6 p-6 w-[87%] mx-auto'>
            {data && data.map(category => {
                const items = category.subcategories.map(sub => ({
                    key: sub.id,
                    label: <span className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>{sub.name}</span>,
                }));

                return (
                    <Dropdown
                        key={category.id}
                        menu={{ items }}
                        placement="bottomLeft"
                        arrow
                    >
                        <a 
                            onClick={e => e.preventDefault()} 
                            className={`
                                cursor-pointer 
                                transition-colors p-[20px] rounded-lg px-4 flex justify-between items-center shadow-md
                                ${darkMode 
                                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                                    : 'bg-white hover:bg-gray-100 text-gray-800'}
                            `}
                        >
                                {category.name}
                                <DownOutlined />
                        </a>
                    </Dropdown>
                );
            })}
        </div>
    );
};

export default Categories;
