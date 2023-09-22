import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";
import CategoryItemCard from "@src/shared/cards/categoryItemCard";

const BackgroundItemsList = ({ items, handleClick }: any) => {
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
          loop: false,
          pagination: false,
          breakpoints: {
            340: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            660: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          },
        }}
      >
        {items.map((elem: any, index: any) => (
          <>
            <Slide className="max-h-[450px]" key={elem.id ? elem.id : index}>
              {/* <LazyImage src={elem.src} alt="" /> */}

              <CategoryItemCard handleClick={handleClick} items={elem} />
              {/* <img
                className=" object-cover h-full  w-full"
                src={elem.src}
                alt="image"
              /> */}
            </Slide>
          </>
        ))}
      </SwiperCarousel>
    </div>
  );
};

export default BackgroundItemsList;
