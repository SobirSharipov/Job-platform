import React from 'react'
import img from '../.././public/img1.jpg'
import img1 from '../.././public/img2.jpg'
import img2 from '../.././public/img3.jpg'
import img4 from '../.././public/img.jpg'
import img5 from '../.././public/img4.jpg'
import img6 from '../.././public/img6.png'
import img7 from '../.././public/img7.jpg'
import img8 from '../.././public/img8.jpg'

import { Carousel } from 'antd';
import Image from 'next/image'
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}
const Swiper = () => {
    return (
        <div className='mb-[30px]'>
            <Carousel  autoplay={{ dotDuration: true }} autoplaySpeed={2000}>

                <div className='w-full h-[90vh] ' style={contentStyle} >
                    <div className='flex justify-around items-center h-[90vh]'>
                        <div className='w-[90%] rounded absolute  bg-gray-800/80 text-white  shadow-2xl p-10  max-w-2xl flex flex-col gap-2'>
                            <p className='font-bold text-2xl mb-[20px]'>🏗 Строим будущее вместе — работа для специалистов и компаний в строительстве.</p>
                            <p className='font-bold text-[15px]'> Найди работу или мастера в строительстве быстро и надежно!</p>
                            <p className='font-bold text-[15px]'>От фундамента до крыши — вакансии и специалисты здесь.</p>
                            <p className='font-bold text-[15px]'>Твоя карьера в строительстве начинается сегодня.</p>
                        </div>
                        <div className='w-[90%]'>

                            <Image className='w-full h-[90vh] rounded object-cover' src={img8} alt='test' />
                        </div>
                    </div>
                </div>

                <div className='w-full h-[90vh] ' style={contentStyle} >
                    <div className='flex justify-around items-center h-[90vh]'>
                        <div className='w-[90%] rounded absolute  bg-gray-800/60 text-white  shadow-2xl p-10  max-w-2xl flex flex-col gap-6'>
                            <p className='font-bold text-3xl mb-[20px]'>Найди свою IT-работу мечты!</p>
                            <p className='font-bold text-[15px]'>Мы объединяем талантливых разработчиков, дизайнеров, аналитиков и инженеров с компаниями, которым нужны современные специалисты.</p>
                            <p className='font-bold text-[15px]'>💻 Если ты выпускник или начинающий специалист — расскажи о себе, заполни профиль и получи шанс попасть в команду своей мечты.</p>
                            <p className='font-bold text-[15px]'>🏢 Если ты компания — найди кандидатов с актуальными навыками в программировании, дизайне и управлении проектами.</p>
                        </div>
                        <div className='w-[90%]'>

                            <Image className='w-full h-[90vh] rounded ' src={img5} alt='test' />
                        </div>
                    </div>
                </div>

                <div className='w-full h-[90vh] ' style={contentStyle} >
                    <div className='flex justify-around items-center h-[90vh]'>
                        <div className='w-[90%] rounded absolute mt-[-100px] bg-gray-800/60 text-white  shadow-2xl p-10  max-w-2xl flex flex-col gap-2'>
                            <p className='font-bold text-4xl mb-[20px]'>⚡ Надёжные электрики — работа и специалисты рядом!</p>
                            <p className='font-bold text-[15px]'>Найди заказ или мастера в сфере электрики за пару кликов.</p>
                            <p className='font-bold text-[15px]'>Твоя карьера в электрике начинается здесь.</p>
                            <p className='font-bold text-[15px]'>Электрики и вакансии — быстро, удобно, надёжно.</p>
                        </div>
                        <div className='w-[90%]'>

                            <Image className='w-full h-[90vh] rounded object-cover' src={img6} alt='test' />
                        </div>
                    </div>
                </div>




            </Carousel>
        </div>
    )
}

export default Swiper