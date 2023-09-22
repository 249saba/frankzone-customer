import ContentContainer from "@src/containers/contentContainer";
import LazyImage from "@src/shared/lazyImage";
import Clarks from "@assets/images/food/clarks.png";
import ClarksIcon from "@assets/images/icons/clarks.png";
import { Fragment } from "react";
import { Box } from "@mui/material";
import CustomButton from "@src/shared/customButton";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import ChatIcon from "@assets/images/icons/chat.svg";
import GoogleIcon from "@assets/images/icons/google.svg";
import StartYellowIcon from "@assets/images/icons/star_yellow.svg";
import NewIcon from "@assets/images/icons/new.png";
import ArrowBlack from "@assets/images/icons/arrow_right_black.png";
import QRCode from "@assets/images/icons/qr_code.png";

import { Avatar } from "@material-tailwind/react";
import { MdArrowForwardIos } from "react-icons/md";
import BackroundImage from "@src/shared/backgroundImage";
import BackgroundItemsList from "../../BackgroundItemsList";
import YelloBg from "@assets/images/gradients/yellow_gradient.svg";
import { DealItemsModel } from "@src/shared/models";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import Shoes from "@assets/images/food/shoes.png";
import HotDeal from "@assets/images/icons/hot_deal.png";
import ItemCard from "@src/shared/cards/itemCard";
import { useNavigate } from "react-router-dom";

const dealItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 2,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 3,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 4,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 5,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
]);

const allItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 2,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 3,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 4,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 5,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 6,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 7,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 8,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
  {
    id: 9,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Shoes,
  },
]);

const FranksShortsDetail = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="relative">
        <LazyImage
          src={Clarks}
          width="100%"
          alt=""
          className="object-contain   rounded-xl "
        />

        <Avatar
          src={ClarksIcon}
          size="xxl"
          className={
            "absolute h-[130px] w-[130px] sm:h-[60px] sm:w-[60px] sm:left-[20px] sm:bottom-[-20px] left-[80px] bottom-[-40px] border-white border-4 rounded-full"
          }
        ></Avatar>
        {/* <LazyImage
          src={ClarksIcon}
          alt=""
          width="auto"
          className="object-cover h-[130px] left-[80px] sm:h-[60px] sm:left-[20px] sm:bottom-[0px] absolute bottom-[-30px] border-white border-4 rounded-full  "
        /> */}
      </div>

      <div className="mt-12 sm:mt-5 flex sm:flex-col sm:gap-5 justify-between ">
        <div className="text-left">
          <h3 className="font-bold text-black-900">Clarks</h3>
          <h6 className="font-light text-gray-700">Berlin, Germany €€</h6>
          <div className="flex gap-3 pt-2">
            <CustomButton
              label={"Delivery"}
              type={"button"}
              icon={<img src={DeliveryIcon} className="mr-2" />}
              isLoading={false}
              variant={"outlined"}
              styleClass={
                "bg-green-900 normal-case bg-opacity-10 text-green-900 border-0 rounded-xl font-semibold"
              }
            />
            <CustomButton
              label={"Chat"}
              type={"button"}
              icon={<img src={ChatIcon} className="mr-2 !h-6 !w-6" />}
              isLoading={false}
              variant={"outlined"}
              styleClass={
                "bg-blue-900 normal-case bg-opacity-30 text-blue-900 border-0 rounded-xl font-semibold md:px-16 lg:px-16"
              }
            />
          </div>
        </div>
        <div className="flex-col sm:flex-row sm:flex sm:justify-between space-y-3">
          <div className="flex bg-green-800 bg-opacity-10 pl-3 py-1 rounded-md  gap-3 w-[150px] ml-auto sm:ml-0">
            <img src={GoogleIcon} className="w-[40px]" alt="google" />
            <div className="flex-col">
              <div className="flex items-center">
                <img
                  className="w-[25px] h-[25px]"
                  src={StartYellowIcon}
                  alt=""
                />
                <h4 className="mb-0">4.0</h4>
              </div>
              <h5 className="text-gray-900 font-light">(500)</h5>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-[35px] h-[35px]" src={StartYellowIcon} alt="" />
            <h4 className="font-normal">4.0</h4>
            <h4 className="text-gray-900">(500)</h4>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-5 flex sm:flex-col sm:gap-5  ">
        {/* <div className="flex sm:flex-col gap-6 w-full"> */}
        <div className="p-6 bg-green-800 bg-opacity-10 rounded-lg flex items-center w-[60%] sm:w-full justify-between mr-6">
          <div className="text-left space-y-1">
            <h4 className="text-black-900 font-medium indent-8">What's New</h4>
            <h5 className="text-green-700 items-center flex gap-2">
              <Avatar src={NewIcon} size="xs" /> This restaurant is currently
              renovating
            </h5>
          </div>
          <img src={ArrowBlack} className="w-6 h-6 " alt="" />
        </div>

        <img src={QRCode} className="w-[120px] sm:w-full sm:h-full" alt="" />
        <h4 className="text-blue-900 flex gap-2 items-center ml-auto">
          Reviews <MdArrowForwardIos size={22} />{" "}
        </h4>
        {/* </div> */}
      </div>
      <div className="mt-10 flex justify-evenly sm:flex-wrap sm:gap-5 bg-gray-800 py-8 rounded-lg sm:px-3  ">
        <h4 className="text-black-900 font-semibold hov-border half-border sm:text-sm  ">
          Hot Deals
        </h4>
        <h4 className="text-gray-900 font-extralight hov-border sm:text-sm ">
          24 Hr Deals
        </h4>
        <h4 className="text-gray-900 font-extralight hov-border sm:text-sm">
          50% Off Deals
        </h4>
        <h4 className="text-gray-900 font-extralight hov-border sm:text-sm">
          Weekly Deals
        </h4>
        <h4 className="text-gray-900 font-extralight hov-border sm:text-sm">
          Free To Eat Deals
        </h4>
      </div>
      <BackroundImage
        url={YelloBg}
        classes="relative bg-cover sm:bg-cover md:bg-cover bg-center bg-no-repeat h-full p-12 rounded-xl mt-5 "
      >
        <h3 className="font-bold text-black-900 italic flex  items-center pb-4">
          <LazyImage width="50px" parentClass="mr-2" src={HotDeal} alt="" />
          HOT DEALS
        </h3>
        <BackgroundItemsList
          handleClick={() => navigate("/vendors/vendorDetail/1/Item/1")}
          items={dealItems}
        ></BackgroundItemsList>
      </BackroundImage>

      <div className="space-y-3 mt-12">
        <div className="flex sm:flex-col sm:items-start">
          <h3 className="font-medium text-black-900  flex  items-center">
            {/* <LazyImage
              className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
              src={HotDeal}
              alt=""
            /> */}
            All Items
          </h3>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
          {allItems.map((item: any, index: number) => (
            <ItemCard
              key={index}
              handleClick={() => navigate("/vendors/vendorDetail/1/Item/1")}
              items={item}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default FranksShortsDetail;
