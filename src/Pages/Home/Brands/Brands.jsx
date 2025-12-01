import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import amazon_vector from "../../../assets/brands/amazon_vector.png";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonStar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import star_people from "../../../assets/brands/start_people.png";

const brandImages = [
  amazon_vector,
  amazon,
  casio,
  moonStar,
  randstad,
  star,
  star_people,
];

const slides = [...brandImages, ...brandImages];

const Brands = () => {
  return (
    <div className="padding-top">
      <h2 className="text-center text-[28px] font-extrabold pb-10">
        We've helped thousands of sales teams
      </h2>
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`brand-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
