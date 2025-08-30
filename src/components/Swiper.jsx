import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

import img5 from "../.././public/img4.jpg";
import img6 from "../.././public/img6.png";
import img8 from "../.././public/img8.jpg";

const Swiper = () => {
  return (
    <div className="mb-10">
      <Carousel autoplay autoplaySpeed={3000} dots infinite>
       
        <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh]">
        
          <Image
            src={img8}
            alt="Строительство"
            fill
            className="object-cover rounded"
            priority
          />
      
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded" />
        
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white gap-3">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl">
              🏗 Строим будущее вместе
            </h2>
            <p className="text-sm md:text-lg lg:text-xl">
              Работа для специалистов и компаний в строительстве.
            </p>
            <p className="text-sm md:text-lg lg:text-xl">
              От фундамента до крыши — вакансии и специалисты здесь.
            </p>
          </div>
        </div>

      
        <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh]">
          <Image
            src={img5}
            alt="IT"
            fill
            className="object-cover rounded"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent rounded" />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white gap-4">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl">
              💻 Найди свою IT-работу мечты!
            </h2>
            <p className="text-sm md:text-lg lg:text-xl max-w-xl">
              Мы объединяем разработчиков, дизайнеров, аналитиков и инженеров с компаниями, которым нужны специалисты.
            </p>
          </div>
        </div>

       
        <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh]">
          <Image
            src={img6}
            alt="Электрики"
            fill
            className="object-cover rounded"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent rounded" />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white gap-3">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl">
              ⚡ Надёжные электрики рядом
            </h2>
            <p className="text-sm md:text-lg lg:text-xl">
              Найди заказ или мастера в сфере электрики за пару кликов.
            </p>
            <p className="text-sm md:text-lg lg:text-xl">
              Электрики и вакансии — быстро, удобно, надёжно.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Swiper;
