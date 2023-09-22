import BackroundImage from "@src/shared/backgroundImage";
import HomeBg from "@assets/images/home_bg.png";
import MainVideo from "@assets/videos/videoMain.mp4";
import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import { useDispatch } from "react-redux";
import { setLayout } from "@src/shared/slices/LayoutSlice";
import ContentContainer from "@src/containers/contentContainer";
import Input from "@src/shared/input";
import CustomButton from "@src/shared/customButton";
import SearchSuggestion from "@src/shared/searchSuggestion";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import { ReactComponent as SearchFilledIcon } from "@assets/icons/Search-filled.svg";

import { ReactComponent as ExpandIcon } from "@assets/icons/Arrow.svg";
import CustomCard from "@src/shared/cards/customCard";
import { Avatar } from "@material-tailwind/react";
import {
  CategoryModel,
  DealItemsModel,
  CategoryItemsModel,
  NearRestaurantsModel,
} from "@src/shared/models";
import CategoriesSlider from "../categoriesSlider";
import { Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import LazyImage from "@src/shared/lazyImage";
import BackgroundImage from "@src/shared/backgroundImage";
import ItemCard from "@src/shared/cards/itemCard";
import { useNavigate } from "react-router-dom";
import Burger from "@src/assets/icons/burger.png";
import Burger_square from "@assets/images/burger_item.png";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import Pizza from "@assets/images/food/pizza.png";
import Tv from "@assets/images/food/tv.png";
import Led from "@assets/images/food/led.png";
import Vegan1 from "@assets/images/food/vegan1.png";
import VegCooked from "@assets/images/food/veg_cooked.png";
import Consultation1 from "@assets/images/food/consultation_1.png";
import Consultation2 from "@assets/images/food/consultation_2.png";
import SeeMore from "@assets/images/icons/see_more.png";
import NearYou from "@assets/images/icons/Near.svg";
import ShortS from "@assets/icons/ShortS.svg";
import HotDeal from "@assets/images/icons/hot_deal.png";
import VeganDeals from "@assets/images/icons/vegan.png";
import OnlineConsultation from "@assets/images/icons/consultation.png";
import Dessert from "@assets/images/desserts.png";
import RestaurantIcon from "@assets/images/gradients/restaurants.svg";
import YellowGradient from "@assets/images/gradients/yellow_gradient.svg";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import CategoryModule from "./category/categoryModule";
import DealsListing from "./deal/dealsListing";
import Popup from "@src/shared/popup/popup";
import VideoPlayer from "@src/shared/utils/videoPlayer";
import Footer from "@src/shared/footer";

const _categories: any = CategoryModel.adapt([
  {
    id: 1,
    icon: Burger,
    title: "Food",
    rows: [
      { id: 1, title: "Burgers" },
      { id: 2, title: "Chinese" },
      { id: 2, title: "Pizza" },
      { id: 2, title: "Fried Chicken" },
      { id: 2, title: "Mexicans Food" },
      { id: 2, title: "Pasta" },
      { id: 2, title: "Roasts" },
      { id: 2, title: "Deserts" },
      { id: 2, title: "Sushi" },
      { id: 2, title: "Soups" },
      { id: 2, title: "Breakfast" },
      { id: 2, title: "Coffee" },
      { id: 2, title: "Italian Food" },
    ],
  },
  {
    id: 2,
    icon: Burger,
    title: "E-Commerce",
    rows: [
      // { id: 1, title: "Burgers" },
      // { id: 2, title: "Chinese" },
    ],
  },
  {
    id: 3,
    icon: Burger,
    title: "Doctors",
    rows: [
      { id: 1, title: "Burgers" },
      { id: 2, title: "Chinese" },
    ],
  },
  {
    id: 4,
    icon: Burger,
    title: "Online Consultation",
    rows: [
      { id: 1, title: "Burgers" },
      { id: 2, title: "Chinese" },
    ],
  },
  {
    id: 5,
    icon: Burger,
    title: "Handyman",
    rows: [
      { id: 1, title: "Burgers" },
      { id: 2, title: "Chinese" },
    ],
  },
  {
    id: 6,
    icon: Burger,
    title: "Hotel & Travel Reservation",
    rows: [
      { id: 1, title: "Burgers" },
      { id: 2, title: "Chinese" },
    ],
  },
  {
    id: 7,
    icon: Burger,
    title: "Beauty & Health",
    rows: [
      { id: 1, title: "Burgers" },
      { id: 2, title: "Chinese" },
    ],
  },
]);

const _categoryItems: any = CategoryItemsModel.adapt([
  {
    id: 1,
    title: "Food Items",
    rows: [
      { id: 1, icon: Burger_square, title: "Burgers" },
      { id: 2, icon: Dessert, title: "Desserts" },
      { id: 3, icon: Burger_square, title: "Coffee" },
    ],
  },

  {
    id: 2,
    title: "E-Commerce",
    rows: [
      { id: 1, icon: Burger_square, title: "Appliances" },
      { id: 2, icon: Burger_square, title: "Toys" },
      { id: 3, icon: Burger_square, title: "Furniture" },
    ],
  },

  {
    id: 3,
    title: "Doctors",
    rows: [
      {
        id: 1,
        icon: Burger_square,
        title: "Dermatologist",
      },
      { id: 2, icon: Burger_square, title: "Urologist" },
      {
        id: 3,
        icon: Burger_square,
        title: "Pediatrician",
      },
    ],
  },
]);

const nearRestaurantItems: any = NearRestaurantsModel.adapt([
  {
    id: 1,
    icon: RestaurantIcon,
    bg_icon: YellowGradient,
    amount: 60,
    title: "Restaurants",
  },
  {
    id: 1,
    icon: RestaurantIcon,
    bg_icon: YellowGradient,
    amount: 60,
    title: "Stores",
  },
  {
    id: 1,
    icon: RestaurantIcon,
    bg_icon: YellowGradient,
    amount: 60,
    title: "Consultants",
  },
  {
    id: 1,
    icon: RestaurantIcon,
    bg_icon: YellowGradient,
    amount: 60,
    title: "Handyman",
  },
  {
    id: 1,
    icon: RestaurantIcon,
    bg_icon: YellowGradient,
    amount: 60,
    title: "Hotels & Travel",
  },
]);

const dealItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
]);
const twentyFourHourDealItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Pizza With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Pizza,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
]);
const discountedItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Pizza With Crispy Fried Chicken",
    price: "320",
    was: "640",
    discountPercent: "-50%",
    rating: "4.0",
    icon: Tv,
  },
  {
    id: 2,
    title: "Pizza With Crispy Fried Chicken",
    price: "240",
    was: "640",
    discountPercent: "-50%",
    rating: "4.0",
    icon: Burger_rectangle,
  },

  {
    id: 3,
    title: "Pizza With Crispy Fried Chicken",
    price: "430",
    was: "640",
    discountPercent: "-50%",
    rating: "4.0",
    icon: Pizza,
  },
  {
    id: 4,
    title: "Pizza With Crispy Fried Chicken",
    price: "60",
    was: "640",
    discountPercent: "-50%",
    rating: "4.0",
    icon: Pizza,
  },
  {
    id: 5,
    title: "Pizza With Crispy Fried Chicken",
    price: "80",
    was: "640",
    discountPercent: "-50%",
    rating: "4.0",
    icon: Pizza,
  },
]);

const viewedItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "LED Tv High Resolution 40",
    price: "60",
    rating: "4.0",
    icon: Led,
  },
  {
    id: 1,
    title: "Decoration Wooden Stand",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Swiss Watch Round Dail",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
  {
    id: 1,
    title: "Zinger Burger With Crispy Fried Chicken",
    price: "60",
    rating: "4.0",
    icon: Burger_rectangle,
  },
]);

const veganItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Egg Plant With Chilli Sauce",
    price: "60",
    rating: "4.0",
    icon: Vegan1,
  },
  {
    id: 1,
    title: "Veg Platter With Cheese",
    price: "60",
    rating: "4.0",
    icon: VegCooked,
  },
  {
    id: 1,
    title: "Peas With Special Masala",
    price: "60",
    rating: "4.0",
    icon: VegCooked,
  },
  {
    id: 1,
    title: "Veg Cooked With Sauce",
    price: "60",
    rating: "4.0",
    icon: VegCooked,
  },
  {
    id: 1,
    title: "Veg Platter With Cheese",
    price: "60",
    rating: "4.0",
    icon: Vegan1,
  },
]);

const consultationItems: any = DealItemsModel.adapt([
  {
    id: 1,
    title: "Dr. John Doe",
    designation: "Dental Specialist",
    rating: "4.0",
    icon: Consultation1,
  },
  {
    id: 2,
    title: "Sophia",
    designation: "Influencer",
    rating: "4.3",
    icon: Consultation2,
  },
  {
    id: 3,
    title: "Dr. John Doe",
    designation: "Dental Specialist",
    rating: "4.0",
    icon: Consultation1,
  },
  {
    id: 4,
    title: "Sophia",
    designation: "Influencer",
    rating: "4.3",
    icon: Consultation2,
  },
  {
    id: 54,
    title: "Sophia",
    designation: "Influencer",
    rating: "4.3",
    icon: Consultation2,
  },
]);

const ITEM_HEIGHT = 48;
const Home = () => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryItems, setCategoryItems] = useState<any>([]);
  const [frankshortsItems, setFrankshortsItems] = useState<any>([]);
  const [deals, setDeals] = useState<any>([]);
  const [nearYou, setNearYou] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenVideoPopup, setIsOpenVideoPopup] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    getModules();
    getFrankshorts();
    getDeals();
    getNearYou();
  }, []);

  const getModules = () => {
    backendCall({
      url: "/api/user/home/modules",
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        console.log("modules ==", res);
        setCategoryItems(res?.data?.rows);
      }
    });
  };
  const getFrankshorts = () => {
    backendCall({
      url: "/api/user/home/frank_shorts?limit=5&offset=0&order=desc",
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setFrankshortsItems(res?.data?.rows);
      }
    });
  };
  const getDeals = () => {
    backendCall({
      url: "/api/user/home/deals?limit=-1&offset=0&order=desc",
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setDeals(res?.data?.rows);
      }
    });
  };
  const getNearYou = () => {
    backendCall({
      url: "/api/user/home/near_you",
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        console.log("near ==", res);
        setNearYou(res?.data?.stores);
      }
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    if (item.title === "E-Commerce") {
      navigate("/vendors");
    }
  };
  const handleClickFrankShort = (_videoUrl: any) => {
    console.log("item cscx ==", _videoUrl);
    setVideoUrl(_videoUrl);
    setIsOpenVideoPopup(true);
  };

  const handleChange = (elem: any) => {
    setSearchValue(elem.target.value);
    console.log(elem.target.value);
  };

  return (
    <>
      <ContentContainer styleClass="gap-10">
        <div className="w-6/12 sm:w-full md:w-full mx-auto">
          <SearchSuggestion
            type={"text"}
            name={"search"}
            placeholder="Search here..."
            handldChange={handleChange}
            inputClassName={"h-16 !rounded-[32px]"}
            variant="normal"
            leftIcon={<SearchIcon className="!left-8" />}
            rightIcon={
              <CustomButton
                label={"Search"}
                type={"submit"}
                isLoading={false}
                variant={"outlined"}
                styleClass={"btn-black"}
              />
            }
          >
            <div
              className={`absolute w-full top-[70px] z-50  ${
                searchValue ? "" : "hidden"
              }`}
            >
              <CustomCard styleClass="text-left px-7 py-4">
                <p className="text-gray-900"> Recent searches</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  <div className="rounded-md border-blue-900 bg-blue-900 px-3 py-1">
                    <p className=" opacity-90 text-sm">Zinger burger</p>
                  </div>
                  <div className="rounded-md border-blue-900 bg-blue-900 px-3 py-1">
                    <p className=" opacity-90 text-sm">Black shoes</p>
                  </div>
                  <div className="rounded-md border-blue-900 bg-blue-900 px-3 py-1">
                    <p className=" opacity-90 text-sm">Air fryer</p>
                  </div>
                </div>

                <div className="space-y-1 mt-5">
                  <div className="gap-3 flex items-center">
                    <SearchFilledIcon className="w-7" />
                    <p className="text-black-900">Hand bags</p>
                  </div>
                  <div className="gap-3 flex items-center">
                    <SearchFilledIcon className="w-7" />
                    <p className="text-black-900">Mobile phones</p>
                  </div>
                  <div className="gap-3 flex items-center">
                    <SearchFilledIcon className="w-7" />
                    <p className="text-black-900">Mobile accessories</p>
                  </div>
                  <div className="gap-3 flex items-center">
                    <SearchFilledIcon className="w-7" />
                    <p className="text-black-900">Hand bags</p>
                  </div>
                  <div className="gap-3 flex items-center">
                    <SearchFilledIcon className="w-7" />
                    <p className="text-black-900">Mobile phones</p>
                  </div>
                  <div className="gap-3 flex items-center">
                    <SearchFilledIcon className="w-7" />
                    <p className="text-black-900">Mobile accessories</p>
                  </div>
                </div>
              </CustomCard>
            </div>
          </SearchSuggestion>
        </div>
        <CustomCard styleClass="shadow-3xl">
          <div className="px-6 py-3 flex  sm:flex-col-reverse md:flex-col-reverse gap-6 ">
            {/* <div className="w-[30%] sm:w-full md:w-full text-left pt-4 ">
            <div className="space-y-2">
              <h5 className="font-semibold text-black-900">Categories</h5>
              <hr className="border border-gray-700" />
            </div>
            <div className="space-y-1 mt-5  ">
              {_categories.map((item: any, index: any) => (
                <>
                  <div
                    onClick={() => handleSelectItem(item)}
                    className={`flex items-center justify-between px-2 py-1 hover:text-blue-900   ${
                      selectedItem?.id == item.id ? "shadow-4xl" : ""
                    }  ${!item.rows.length ? "cursor-pointer" : ""} `}
                  >
                    <div
                      className="flex justify-between w-full items-center"
                      onClick={(e: any) => handleClick(e)}
                    >
                      <div className="gap-3 flex items-center">
                        <Avatar
                          src={item.icon}
                          alt="avatar"
                          variant="circular"
                        />
                        <p className="opacity-90 font-normal text-black-900 ">
                          {item.title}
                        </p>
                      </div>

                      <ExpandIcon
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className="w-6 cursor-pointer"
                      />
                    </div>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      PaperProps={{
                        style: {
                          width: "30ch",
                          marginLeft: "30px",
                          marginTop: "-50px",
                          boxShadow: "0px 6px 14px #00000029",
                          background: "#fff",
                          borderRadius: "15px",
                          opacity: "0.5",
                          padding: "0.4em",
                        },
                      }}
                    >
                      {selectedItem?.rows.map((itm: any, index: any) => (
                        <MenuItem
                          className="hover:text-blue-900 hover:!bg-blue-900 !text-sm"
                          onClick={handleClose}
                        >
                          {itm.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </>
              ))}
            </div>
          </div> */}

            <div className="w-full sm:w-full md:w-full ">
              <CategoriesSlider />
            </div>
          </div>
        </CustomCard>
        <div className="space-y-3 pt-8">
          <div className="flex justify-between items-start sm:flex-col sm:items-start">
            <h3 className="font-bold text-black-900 italic flex  items-center">
              {/* <LazyImage
              className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
              src={ShortS}
              alt=""
            /> */}
              CATEGORY
            </h3>
            <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto cursor-pointer">
              <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
            </h4>
          </div>
          <div className=" space-y-2 gap-4 ">
            <div className="text-center  w-full  ">
              <SwiperCarousel
                settings={{
                  pagination: false,
                  loop: false,
                  breakpoints: {
                    340: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    660: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  },
                }}
              >
                {categoryItems.map((item: any, index: number) => (
                  <Slide
                    className="max-h-[450px]"
                    key={item.id ? item.id : index}
                  >
                    <div onClick={() => navigate(`/vendors/${item?.id}`)}>
                      <BackroundImage
                        classes=" bg-cover  bg-no-repeat h-[320px]  rounded-2xl cursor-pointer"
                        url={
                          item.image
                        }
                      >
                        <h5 className="text-left font-semibold pt-6 overflow-hidden flex-wrap-reverse truncate px-6">
                          {item?.name}
                        </h5>
                      </BackroundImage>
                    </div>
                  </Slide>
                ))}
              </SwiperCarousel>
            </div>
          </div>
        </div>
        <div className="space-y-3 pt-8">
          <div className="flex justify-between items-end sm:flex-col sm:items-start">
            <h3 className="font-bold text-black-900 italic flex  items-center">
              <LazyImage
                className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
                src={ShortS}
                alt=""
              />
              FRANKSHORTS
            </h3>
            <h4
              className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto cursor-pointer"
              onClick={() => navigate("/frankshorts")}
            >
              <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
            </h4>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 space-y-2 gap-4  justify-start items-end">
            {frankshortsItems.map((item: any) => (
              <div>
                <div
                  onClick={() =>
                    handleClickFrankShort(
                      item?.video_url
                    )
                  }
                >
                  <BackroundImage
                    classes=" bg-cover  bg-no-repeat h-[320px] rounded-2xl "
                    url={
                      item.image_url
                    }
                  >
                    <div className="flex items-center flex-col justify-end h-full ">
                      <div className="font-semibold text-left flex justify-start items-start w-full pl-6 mt-12">
                        <LazyImage
                          src={
                          
                            item.Vendor?.image_url
                          }
                          alt=""
                          className="rounded-full w-10 h-10"
                        />
                        <h4 className=" ml-2 text-white">{item.title}</h4>
                      </div>
                    </div>
                  </BackroundImage>
                </div>
                <Popup
                  isOpen={isOpenVideoPopup}
                  width={800}
                  handleClose={() => setIsOpenVideoPopup(false)}
                  isShowHeader={true}
                >
                  <VideoPlayer url={videoUrl} />
                </Popup>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 pt-8">
          <div className="flex justify-between items-end sm:flex-col sm:items-start">
            <h3 className="font-bold text-black-900 italic flex  items-center">
              <LazyImage
                className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
                src={NearYou}
                alt=""
              />
              NEAR YOU
            </h3>
            <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
              <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
            </h4>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 space-y-2 gap-4  justify-start items-end">
            {nearRestaurantItems.map((item: any) => (
              <BackroundImage
                classes=" bg-cover  bg-no-repeat h-[320px] rounded-2xl "
                url={item.bg_icon}
              >
                <div className="flex items-center flex-col justify-center h-full ">
                  <LazyImage
                    src={item.icon}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                  <div className="font-semibold text-left items-start w-full pl-6 mt-12">
                    <h4 className="text-black-700 ">{item.title}</h4>
                    <h4 className="text-black-700 pt-2 ">{nearYou}</h4>
                  </div>
                </div>
              </BackroundImage>
            ))}
          </div>
        </div>
        {deals?.map((_deal: any, index: number) => {
          return (
            <div className="space-y-3 pt-8" key={index}>
              <div className="flex justify-between items-end sm:flex-col sm:items-start">
                <h3 className="font-bold text-black-900 italic flex  items-center">
                  <LazyImage
                    className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
                    src={
                 
                      _deal?.image_url
                    }
                    width="50px"
                    alt=""
                  />
                  {_deal?.name}
                </h3>
                <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
                  <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
                </h4>
              </div>
              <DealsListing dealIs={_deal?.id} />
            </div>
          );
        })}
        {/* <div className="space-y-3 pt-8">
        <div className="flex justify-between items-end sm:flex-col sm:items-start">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            <LazyImage
              className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
              src={HotDeal}
              alt=""
            />
            24 HOUR DEALS
          </h3>
          <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
            See More <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
          {twentyFourHourDealItems.map((item: any) => (
            <ItemCard items={item} />
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-8">
        <div className="flex justify-between items-end sm:flex-col sm:items-start">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            <LazyImage
              className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
              src={HotDeal}
              alt=""
            />
            FLAT 50% OFF
          </h3>
          <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
            See More <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
          {discountedItems.map((item: any) => (
            <ItemCard items={item} />
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-8">
        <div className="flex justify-between items-end sm:flex-col sm:items-start">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            <LazyImage
              className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
              src={HotDeal}
              alt=""
            />
            MOST VIEWED DEALS
          </h3>
          <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
            See More <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
          {viewedItems.map((item: any) => (
            <ItemCard items={item} />
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-8">
        <div className="flex justify-between items-end sm:flex-col sm:items-start">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            <LazyImage
              className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
              src={VeganDeals}
              alt=""
            />
            VEGAN DEALS
          </h3>
          <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
            See More <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
          {veganItems.map((item: any) => (
            <ItemCard items={item} />
          ))}
        </div>
      </div> */}
        <div className="space-y-3 pt-8">
          <div className="flex justify-between items-end sm:flex-col sm:items-start">
            <h3 className="font-bold text-black-900 italic flex  items-center">
              <LazyImage
                className="w-9/12 sm:w-[30px] sm:mr-2 h-9/12"
                src={OnlineConsultation}
                alt=""
              />
              ONLINE CONSULTATION
            </h3>
            <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
              <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
            </h4>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
            {consultationItems.map((item: any) => (
              <ItemCard items={item} />
            ))}
          </div>
        </div>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Home;
