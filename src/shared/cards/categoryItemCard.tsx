import LazyImage from "../lazyImage";
import CustomCard from "./customCard";
import HomeBg from "@assets/images/home_bg.png";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import pickup from "@assets/icons/pickup.png";
import delivery from "@assets/icons/delivery.png";
import StarYellow from "@assets/images/icons/star_yellow.png";

const CategoryItemCard = ({ items, handleClick }: any) => {
  return (
    <CustomCard
      onClick={() => handleClick(items?.id)}
      styleClass="shadow-sm h-full cursor-pointer"
    >
      <div className="relative">
        <LazyImage
          src={
            items?.image_url
              ?  items?.image_url
              : HomeBg
          }
          alt=""
          className="object-cover w-full h-[260px] rounded-t-xl "
        />
        <p
          className={`p-3 bg-red-100 text-white rounded-md py-1 absolute top-5 left-5 ${
            !items.discount ? "hidden" : "block"
          }`}
        >
          -{items.discount}%
        </p>
      </div>
      <div className="px-4 py-4 space-y-2">
        <p className="opacity-90 text-black-100 text-sm w-10/12 text-left truncate">
          {items.title}
        </p>
        {/* <p className="bg-green-900 normal-case bg-opacity-10 text-green-900 border-0 rounded-xl font-semibold flex justify-center py-2 w-28">
          <img src={DeliveryIcon} className="mr-2 w-5 h-5" />
          {items.delivery_type}
        </p> */}
        <div className="flex">
          {items?.delivery_type[1] ? (
            <p className="opacity-90 bg-green-100 text-[#ECC74F] text-xs flex justify-center items-center text-left py-1 px-2 rounded-md">
              <img src={delivery} className="w-4 h-4 mr-1" />
              {items.delivery_type[1]}
            </p>
          ) : null}
          {items?.delivery_type[0] ? (
            <p className="ml-2 opacity-90 bg-red-200 text-red-900 text-xs  p-1 flex justify-center items-center text-left py-1 px-2 rounded-md">
              <img src={pickup} className="w-4 h-4 mr-1" />
              {items.delivery_type[0]}
            </p>
          ) : null}
        </div>
        {items?.designation && (
          <p className="opacity-90 text-green-900 text-md w-10/12 text-left ">
            {items.designation}
          </p>
        )}
        {items?.price && (
          <div className="flex items-center">
            <h4 className="text-red-100 text-left inline-flex  font-semibold">
              €{items.price}
            </h4>
            {items.was && (
              <h5 className="text-gray-900 pl-3 line-through">
                {" "}
                €{items?.was}{" "}
              </h5>
            )}
          </div>
        )}

        {items?.rating ? (
          <p className="text-right flex justify-end text-sm text-black-900 ">
            <LazyImage className="w-9/12 pt-[1px]" src={StarYellow} alt="" />
            {items?.rating}
          </p>
        ) : null}
      </div>
    </CustomCard>
  );
};

export default CategoryItemCard;
