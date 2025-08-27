"use client"
import { useGetCategoriesQuery } from '@/services/userApi';
import React, { useState } from 'react';

const Prak = () => {
    const { data, isLoading, error } = useGetCategoriesQuery();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p className="text-red-500">Ошибка загрузки</p>;


    // Находим выбранную категорию
    const selectedCategory = data.find(cat => cat.id === selectedCategoryId);

    return (
        <div>
            <div>
                {/* Селект 1: категории */}
                <select onChange={e => setSelectedCategoryId(Number(e.target.value))}>
                    <option value="">Выберите категорию</option>
                    {data && data.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Селект 2: подкатегории выбранной категории */}
                <select disabled={!selectedCategory}>
                    <option value="">Выберите подкатегорию</option>
                    {selectedCategory?.subcategories.map(sub => (
                        <option key={sub.id} value={sub.id}>
                            {sub.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Prak;
