import { useNavigate } from "react-router-dom";
import LazyImage from "../lazyImage";
import CustomCard from "./customCard";
import ratingStar from "@assets/images/icons/star_yellow.png";
import HomeBg from "@assets/images/home_bg.png";
import delivery from "@assets/icons/delivery_green.png";
import pickup from "@assets/icons/pickup.png";

const VendorItemCard = ({ items, selectedCategoryId, categoryId }: any) => {
  const navigate = useNavigate();
  const handleClick = ({ id }: any) => {
    {
      console.log("items ==", id);
    }
    navigate(`/vendors/${categoryId}/vendorDetail/${id}`);
  };
  return (
    <CustomCard
      key={Math.random()}
      onClick={() => handleClick(items)}
      styleClass=" h-full cursor-pointer "
    >
      <div className="relative">
        <LazyImage
          src={
            items?.DefaultShop?.cover_url
              ? 
                items?.DefaultShop?.cover_url
              : HomeBg
          }
          alt=""
          className="object-cover w-full h-[260px] rounded-t-xl "
        />
      </div>
      <div className="px-4 py-4 space-y-2">
        <div className="flex gap-3 items-center">
          <LazyImage
            src={
              items?.DefaultShop?.image_url
                ? 
                  items?.DefaultShop?.image_url
                : HomeBg
            }
            alt=""
            className="object-cover rounded-full h-14 w-14"
          />

          <div className="space-y-1">
            <div className="flex items-center">
              <h5 className="text-black-900 text-left mr-4 font-semibold">
                {items?.business_name}
              </h5>
              <p className="text-right flex justify-end text-sm text-black-900 ">
                <LazyImage
                  className="w-9/12 pt-[1px]"
                  src={ratingStar}
                  alt=""
                />
                {items?.rating || 0}
                <span className="text-gray-900 pl-1">
                  ({items?.rating_count || 0})
                </span>
              </p>
            </div>
            <div className="flex">
              <p className="text-black-100">
                {items?.VendorSetting?.delivery_type === "FIXED"
                  ? `Delivery Charges: €${items?.VendorSetting?.delivery_charges}`
                  : `Per Km Delivery Charges: €${items?.VendorSetting?.delivery_charges}`}
              </p>
            </div>
          </div>
          <p className="text-right ml-auto flex justify-end text-sm text-black-900 ">
            <div className="flex">
              {items?.ActivePlan?.Plan?.can_deliver ? (
                <div className=" bg-light-green-100 w-max rounded-lg items-center  flex p-3 py-1 gap-1 mr-2">
                  <LazyImage
                    src={delivery}
                    alt=""
                    width="15px"
                    className="object-cover rounded-t-xl "
                  />
                  <span className="text-xs text-green-900 ">Delivery</span>
                </div>
              ) : null}
              {items?.ActivePlan?.Plan?.can_pickup ? (
                <div className=" bg-red-200 w-max rounded-lg items-center  flex p-3 py-1 gap-1 ">
                  <LazyImage
                    src={pickup}
                    alt=""
                    width="15px"
                    className="object-cover rounded-t-xl "
                  />
                  <span className="text-xs text-red-900 ">Pickup</span>
                </div>
              ) : null}
            </div>
          </p>
        </div>
      </div>
    </CustomCard>
  );
};

export default VendorItemCard;
