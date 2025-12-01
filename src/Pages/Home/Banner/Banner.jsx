import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { FaArrowUp } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="padding-top relative">
      <div>
        <Carousel interval={3500} autoPlay infiniteLoop>
          <div>
            <img src={bannerImg1} />
          </div>
          <div>
            <img src={bannerImg2} />
          </div>
          <div>
            <img src={bannerImg3} />
          </div>
        </Carousel>
      </div>
      <div className="md:absolute top-18 left-22 space-y-2">
        <div className="flex items-center gap-2 md:gap-4 ">
          <div className="flex items-center">
            <button className=" bg-primary rounded-4xl font-bold text-lg px-2.5 py-1.5 md:px-8 md:py-4">
              Track Your parcel
            </button>
            <span className="md:w-11 md:h-11 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
              <FaArrowUp size={22} className="rotate-45" />
            </span>
          </div>
          <button className="font-bold text-lg border border-[#DADADA] px-1.5 py-1.5 md:px-8 md:py-4 rounded-xl">
            Be a Rider
          </button>
        </div>
        <p className="md:w-[629px] bg-gray-200 md:bg-transparent p-2 md:p-0 rounded-2xl text-[#C2C2C2]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
    </div>
  );
};

export default Banner;
