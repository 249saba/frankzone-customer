import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import NewArrival1 from "@assets/images/new-arrival.png";
import Banner from "@assets/images/banner2.png";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";
import LazyImage from "@src/shared/lazyImage";
import BackroundImage from "@src/shared/backgroundImage";
import ItemCard from "@src/shared/cards/itemCard";

const ImagesList = ({ items, selectedImageId, handleClick }: any) => {
  const navigate = useNavigate();
  const routeTo = (link: string) => {
    navigate(link);
  };
  return (
    <div className="  text-center  w-full  ">
      <SwiperCarousel
        settings={{
          navigation: true,
          zoom: true,
          pagination: false,
          loop: false,
          breakpoints: {
            340: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            660: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          },
        }}
        styleClass={"!w-[75%]"}
      >
        {items.map((elem: any, index: any) => (
          <>
            <Slide key={elem.id ? elem.id : index}>
              <div
                className={`${
                  elem.id === selectedImageId
                    ? "border-4 border-green-700 "
                    : "border-0"
                }space-y-3  h-[50px] w-[50px] cursor-pointer`}
                onClick={() => handleClick(elem)}
              >
                <LazyImage
                  src={
                   elem.image_url
                  }
                  alt=""
                />
              </div>
            </Slide>
          </>
        ))}
      </SwiperCarousel>
    </div>
  );
};

export default ImagesList;
