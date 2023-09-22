import { useEffect, useState } from "react";
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
import { backendCall } from "@src/shared/utils/backendService/backendCall";

const cardData = [
  {
    id: 1,
    src: NewArrival1,
  },
  {
    id: 2,
    src: Banner,
  },
  {
    id: 3,
    src: NewArrival1,
  },
  {
    id: 4,
    src: NewArrival1,
  },
  {
    id: 5,
    src: NewArrival1,
  },
];

const CategoriesSlider = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);
  const routeTo = (link: string) => {
    navigate(link);
  };
  useEffect(() => {
    backendCall({
      url: "/api/user/home/banners?limit=-1&offset=0&order=desc",
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        const _banner = res?.data?.rows;
        setBanner(_banner);
      }
    });
  }, []);
  return (
    // <BackroundImage
    //   url={SectionWorkNow}
    //   classes="relative bg-cover sm:bg-cover md:bg-cover bg-center bg-no-repeat h-full "
    // >
    <div className="  text-center  w-full  h-[550px]">
      <SwiperCarousel
        settings={{
          navigation: true,
          zoom: true,
        }}
      >
        {banner.map((elem: any, index: any) => (
          <>
            <Slide className="h-[550px]" key={elem.id ? elem.id : index}>
              <LazyImage
                src={elem.image_url}
                alt=""
                className="h-[520px] w-full mt-3"
              />

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
    // </BackroundImage>
  );
};

export default CategoriesSlider;
