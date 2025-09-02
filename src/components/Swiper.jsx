import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

import img5 from "../.././public/img4.jpg";
import img6 from "../.././public/img6.png";
import img8 from "../.././public/img8.jpg";
import { useTranslation } from "react-i18next";

const Swiper = () => {
   const { t, i18n } = useTranslation();
      function TranslateClick(lang) {
          i18n.changeLanguage(lang);
      }
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
              🏗 {t("Test.5")}
            </h2>
            <p className="text-sm md:text-lg lg:text-xl">
             {t("Test.6")}
            </p>
            <p className="text-sm md:text-lg lg:text-xl">
             {t("Test.7")}
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
              💻 {t("Test.8")}
            </h2>
            <p className="text-sm md:text-lg lg:text-xl max-w-xl">
              {t("Test.9")}
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
              ⚡ {t("Test.10")}
            </h2>
            <p className="text-sm md:text-lg lg:text-xl">
              {t("Test.11")}
            </p>
            <p className="text-sm md:text-lg lg:text-xl">
              {t("Test.12")}
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Swiper;
