import LazyImage from "../lazyImage";
import CustomCard from "./customCard";
import HomeBg from "@assets/images/home_bg.png";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import StarYellow from "@assets/images/icons/star_yellow.png";

const DealProductItemCard = ({ items, handleClick }: any) => {
  return (
    <CustomCard
      onClick={() => handleClick(items?.id)}
      styleClass="shadow-sm h-full cursor-pointer"
    >
      <div className="relative">
        <LazyImage
          src={
            items?.Product?.DefaultVariant?.cover_image_url
              ?
                items?.Product?.DefaultVariant?.cover_image_url
              : HomeBg
          }
          alt=""
          className="object-cover w-full h-[260px] rounded-t-xl "
        />
        <p
          className={`p-3 bg-red-100 text-white rounded-md py-1 absolute top-5 left-5 ${
            !items.discount_percentage ? "hidden" : "block"
          }`}
        >
          -{items.discount_percentage}%
        </p>
      </div>
      <div className="px-4 py-4 space-y-2">
        <p className="opacity-90 text-black-100 text-sm w-10/12 text-left ">
          {items?.Product?.name}
        </p>
        {items?.discountedPrice && (
          <div className="flex items-center">
            <h4 className="text-red-100 text-left inline-flex  font-semibold">
              €{items?.discountedPrice}
            </h4>
            {items?.Product?.DefaultVariant?.price && (
              <h5 className="text-gray-900 pl-3 line-through">
                {" "}
                €{items?.Product?.DefaultVariant?.price}{" "}
              </h5>
            )}
          </div>
        )}

        {items?.rating ? (
          <p className="text-right flex justify-end text-sm text-black-900 ">
            <LazyImage className="w-9/12 pt-[1px]" src={StarYellow} alt="" />
            {'4.0'}
          </p>
        ) : null}
      </div>
    </CustomCard>
  );
};

export default DealProductItemCard;
