import { useState, useEffect } from "react";
import ContentContainer from "@src/containers/contentContainer";
import LazyImage from "@src/shared/lazyImage";
import Clarks from "@assets/images/food/clarks.png";
import ClarksIcon from "@assets/images/icons/clarks.png";
import { Box, Stack } from "@mui/material";
import CustomButton from "@src/shared/customButton";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import pickup from "@assets/icons/pickup.png";
import delivery from "@assets/icons/delivery.png";
import ChatIcon from "@assets/images/icons/chat.svg";
import GoogleIcon from "@assets/images/icons/google.svg";
import StartYellowIcon from "@assets/images/icons/star_yellow.svg";
import NewIcon from "@assets/images/icons/new.png";
import ArrowBlack from "@assets/images/icons/arrow_right_black.png";
import QRCode from "@assets/images/icons/qr_code.png";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowNextIcon from "@src/shared/icons/arrow-next";
import { Avatar } from "@material-tailwind/react";
import BackIcon from "@assets/images/icons/arrow_back.svg";
import { MdArrowForwardIos } from "react-icons/md";
import BackroundImage from "@src/shared/backgroundImage";
import BackgroundItemsList from "../../BackgroundItemsList";
import YelloBg from "@assets/images/gradients/yellow_gradient.svg";
import { DealItemsModel } from "@src/shared/models";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import Shoes from "@assets/images/food/shoes.png";
import HotDeal from "@assets/images/icons/hot_deal.png";
import ItemCard from "@src/shared/cards/itemCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import ProductItemCard from "@src/shared/cards/productItemCard";
import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import noImage from "@assets/images/NoImage.png";
import BasicPagination from "@src/shared/pagination";
import { IsLoggedIn } from "@src/shared/utils/authService";

const VendorDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [vendorDetail, setVendorDetail] = useState<any>([]);
  const [getDeal, setGetDeal] = useState<any>([]);
  const [getCategory, setGetCatgegory] = useState<any>([]);
  const [dealsName, setDealsName] = useState<any>([]);
  const [categoriesName, setCategoriesName] = useState<any>([]);
  const [dealId, setDealId] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<any>([]);
  const [whatNew, setWhatNew] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<any>(0);
  const [recordCount, setRecordCount] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getWhatNew();
    getDealsName();
    getCategoriesName();
    getBanners();
  }, []);
  const getBanners = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}/banners?limit=-1&offset=0&order=desc`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setBanners(res?.data?.rows);
        getVendors();
      }
    });
  };
  const getVendors = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setVendorDetail(res?.data);
        let _banners: any = [
          {
            image_url: res?.data?.DefaultShop?.cover_url,
          },
          ...banners,
        ];
        setBanners(_banners);
      }
    });
  };
  const getWhatNew = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}/whatsnew?limit=10&offset=0&order=desc&text=`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        // setCategoriesName(res?.data?.rows);
        const _whatNew = res?.data?.rows[0];
        if (_whatNew) {
          setWhatNew(_whatNew);
        }
      }
    });
  };
  const getDealsName = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}/deal_types?limit=-1`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setDealsName(res?.data?.rows);
        const _firstDeal = res?.data?.rows[0];
        if (_firstDeal?.id) {
          setDealId(_firstDeal);
          getDeals(_firstDeal?.id);
        }
      }
    });
  };
  const handleDealHeading = (id: any) => {
    setDealId(id);
    getDeals(id?.id);
  };
  const getDeals = (id: any) => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}/deals?limit=-1&deal_id=${id}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setGetDeal(res?.data?.rows);
      }
    });
  };
  const getCategoriesName = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}/categories?limit=-1&text=`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCategoriesName(res?.data?.rows);
        const _firstCate = res?.data?.rows[0]?.id;
        if (_firstCate) {
          setCategoryId(_firstCate);
          getCategories(_firstCate, 0);
          setPageNumber(0);
        }
      }
    });
  };
  const handleCategoryHeading = (id: any) => {
    setCategoryId(id);
    getCategories(id, 0);
    setPageNumber(0);
  };
  const getCategories = (id: any, pageNumber: number) => {
    backendCall({
      url: `/api/user/home/vendor/${params?.vendorid}/products?limit=20&offset=${pageNumber}&category_id=${id}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setRecordCount(Math.ceil(res?.data?.count / 20));
        setGetCatgegory(res?.data?.rows);
      }
    });
  };
  const handleChangePage = (pageNumber: any) => {
    setPageNumber(pageNumber - 1);
    getCategories(categoryId, pageNumber - 1);
  };
  return (
    <>
      <Stack direction="row" alignItems="start" spacing={2}>
        <LazyImage
          routerLink={`/vendors/${params?.id}`}
          className=" h-8 sm:h-6 "
          src={BackIcon}
          alt=""
        />
        <Breadcrumbs
          separator={<ArrowNextIcon height="14" />}
          aria-label="breadcrumb"
        >
          <Link to="/">
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              Home
            </h5>
          </Link>
          <Link to="/">
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              E-commerce
            </h5>
          </Link>
          <p
            onClick={() => {
              navigate(`/vendors/${params?.id}`);
            }}
          >
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              Vendors
            </h5>
          </p>

          <h5
            className={`text-blue-900 font-normal hover:underline hover:cursor-pointer `}
          >
            {vendorDetail?.business_name}
          </h5>
        </Breadcrumbs>
      </Stack>
      <div className="relative">
        {banners.length === 1 ? (
          <div className="h-96 w-full">
            <LazyImage
              src={
                vendorDetail?.DefaultShop?.cover_url
                  ? 
                    vendorDetail?.DefaultShop?.cover_url
                  : noImage
              }
              width="100%"
              alt=""
              className="rounded-xl h-96"
            />
          </div>
        ) : (
          <SwiperCarousel
            settings={{
              navigation: true,
              pagination: false,
              // zoom: true,
            }}
          >
            {banners.map((elem: any, index: any) => (
              <>
                <Slide
                  className="h-[520px] rounded bg-white"
                  key={elem.id ? elem.id : index}
                >
                  <LazyImage
                    src={
                    elem.image_url
                    }
                    alt=""
                    className="h-[520px] w-full rounded"
                  />
                </Slide>
              </>
            ))}
          </SwiperCarousel>
        )}
        <Avatar
          src={
            vendorDetail?.DefaultShop?.image_url
              ?
                vendorDetail?.DefaultShop?.image_url
              : noImage
          }
          size="xxl"
          className={
            "z-10 absolute h-[130px] w-[130px] sm:h-[60px] sm:w-[60px] sm:left-[20px] sm:bottom-[-20px] left-[80px] bottom-[-40px] border-white border-4 rounded-full"
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
          <h3 className="font-bold text-black-900">
            {vendorDetail?.business_name}
          </h3>
          <div className="flex">
            <h6
              className="font-light text-gray-500 w-52 truncate"
              title={vendorDetail?.DefaultShop?.address}
            >
              {vendorDetail?.DefaultShop?.address} €€
            </h6>
            <p className="ml-8">
            €{vendorDetail?.VendorSetting?.delivery_charges} Minimum
            </p>
          </div>
          <div className="gap-3 pt-2">
            <div className="flex xs:block mb-4">
              <p
                className={
                  "w-32 flex items-center mr-4 bg-green-100 text-[#ECC74F] normal-case bg-opacity-10 border-0 rounded-xl font-semibold px-4 py-2"
                }
              >
                <img src={delivery} className="w-4 h-4 mr-2" />
                {"DELIVERY"}
              </p>
              <p
                className={
                  "w-32 flex items-center bg-[#f4433653] normal-case bg-opacity-10 text-[#F44336] border-0 rounded-xl font-semibold px-4 py-2"
                }
              >
                <img src={pickup} className="w-4 h-4 mr-2" />
                {"PICKUP"}
              </p>
            </div>
            {vendorDetail?.VendorSetting?.chat_enabled && IsLoggedIn() ? (
              <CustomButton
                label={"Chat"}
                type={"button"}
                icon={<img src={ChatIcon} className="mr-2 !h-6 !w-6" />}
                isLoading={false}
                variant={"outlined"}
                styleClass={
                  "bg-blue-900 normal-case bg-opacity-30 text-blue-900 border-0 rounded-xl font-semibold md:px-16 lg:px-16"
                }
                handleButtonClick={() =>
                  navigate(`/vendors/vendorChat/${vendorDetail?.id}`)
                }
              />
            ) : null}
          </div>
        </div>
        <div className="flex-col sm:flex-row sm:flex sm:justify-between space-y-3">
          <div className="flex items-center gap-2">
            <img className="w-[35px] h-[35px]" src={StartYellowIcon} alt="" />
            <h4 className="font-semibold">{vendorDetail?.rating}</h4>
            <h4 className="text-gray-900">{`(${vendorDetail?.rating_count})`}</h4>
          </div>
          {/* <div className="flex bg-green-800 bg-opacity-10 pl-3 py-1 rounded-md  gap-3 w-[150px] ml-auto sm:ml-0">
            <img src={GoogleIcon} className="w-[40px]" alt="google" />
            <div className="flex-col">
              <div className="flex items-center">
                <img
                  className="w-[25px] h-[25px]"
                  src={StartYellowIcon}
                  alt=""
                />
                <h4 className="mb-0">{vendorDetail?.rating}</h4>
              </div>
              <h5 className="text-gray-900 font-light text-base">{`(${vendorDetail?.rating_count})`}</h5>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex justify-end sm:pt-6">
        <h4
          className="text-blue-900 flex gap-2 items-center ml-auto cursor-pointer"
          onClick={() => navigate(`/vendors/reviews/${vendorDetail?.id}`)}
        >
          Reviews <MdArrowForwardIos size={22} />{" "}
        </h4>
      </div>

      <div className="mt-5 sm:mt-5 flex sm:flex-col sm:gap-5  ">
        {/* <div className="flex sm:flex-col gap-6 w-full"> */}
        {whatNew?.description ? (
          <div
            className="p-6 bg-green-800 bg-opacity-10 rounded-lg flex items-center w-full justify-between cursor-pointer"
            onClick={() => navigate(`/vendors/whatsNew/${vendorDetail?.id}`)}
          >
            <div className="text-left space-y-1">
              <h4 className="text-black-900 font-medium indent-8">
                What's New
              </h4>
              <div className="flex">
                <Avatar src={NewIcon} className="w-8 h-8 rounded-full" />{" "}
                <h5 className="text-green-700 w-[80vw] truncate ml-4">
                  {whatNew?.description}
                </h5>
              </div>
            </div>
            <img src={ArrowBlack} className="w-6 h-6 " alt="" />
          </div>
        ) : null}

        {/* <img src={QRCode} className="w-[120px] sm:w-full sm:h-full" alt="" /> */}
        {/* <h4 className="text-blue-900 flex gap-2 items-center ml-auto">
          Reviews <MdArrowForwardIos size={22} />{" "}
        </h4> */}
        {/* </div> */}
      </div>
      {dealsName.length ? (
        <>
          <div className="mt-10 flex justify-evenly sm:flex-wrap sm:gap-5 bg-gray-800 py-8 rounded-lg sm:px-3">
            <div className="  text-center  w-full  ">
              <SwiperCarousel
                settings={{
                  pagination: false,
                  loop: false,
                  breakpoints: {
                    340: {
                      slidesPerView: 5,
                      spaceBetween: 20,
                    },
                    660: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                  },
                }}
              >
                {dealsName?.map((deal: any, index: number) => (
                  <Slide
                    className="max-h-[450px]"
                    key={deal.id ? deal.id : index}
                  >
                    <h4
                      className={`${
                        dealId?.id === deal.id
                          ? "text-black-900 font-semibold hov-border half-border sm:text-sm"
                          : "text-gray-900 font-extralight hov-border sm:text-sm"
                      }`}
                      onClick={() => handleDealHeading(deal)}
                    >
                      {deal?.name}
                    </h4>
                  </Slide>
                ))}
              </SwiperCarousel>
            </div>
          </div>
          <BackroundImage
            url={YelloBg}
            classes="relative bg-cover sm:bg-cover md:bg-cover bg-center bg-no-repeat h-full p-12 rounded-xl mt-5 "
          >
            <h3 className="font-bold text-black-900 italic flex  items-center pb-4">
              <LazyImage
                width="50px"
                parentClass="mr-2"
                src={
                   dealId?.image_url
                }
                alt=""
              />
              {dealId?.name}
            </h3>
            <BackgroundItemsList
              handleClick={(id: any) =>
                navigate({
                  search: `?vendor=${params?.id}&vendorDetail=${params?.vendorid}`,
                  pathname: `/deals/${id}`,
                })
              }
              items={getDeal}
            ></BackgroundItemsList>
          </BackroundImage>
        </>
      ) : null}

      {categoriesName.length ? (
        <div className="space-y-3 mt-12">
          <div className="mt-10 flex justify-evenly sm:flex-wrap sm:gap-5 bg-gray-800 py-8 rounded-lg sm:px-3">
            <div className="  text-center  w-full  ">
              <SwiperCarousel
                settings={{
                  pagination: false,
                  loop: false,
                  breakpoints: {
                    340: {
                      slidesPerView: 5,
                      spaceBetween: 20,
                    },
                    660: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                  },
                }}
              >
                {categoriesName?.map((cate: any, index: number) => (
                  <Slide
                    className="max-h-[450px]"
                    key={cate.id ? cate.id : index}
                  >
                    <h4
                      className={`${
                        categoryId === cate.id
                          ? "text-black-900 font-semibold hov-border half-border sm:text-sm"
                          : "text-gray-900 font-extralight hov-border sm:text-sm"
                      }`}
                      onClick={() => handleCategoryHeading(cate?.id)}
                    >
                      {cate?.name}
                    </h4>
                  </Slide>
                ))}
              </SwiperCarousel>
            </div>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
            {getCategory.map((item: any, index: number) => (
              <ProductItemCard
                key={index}
                handleClick={(id: any) =>
                  navigate(
                    `/vendors/${params?.id}/vendorDetail/${params?.vendorid}/Item/${id}`
                  )
                }
                items={item}
              />
            ))}
          </div>
          {recordCount !== 1 ? (
            <div className="flex justify-center">
              <BasicPagination
                perPageCount={recordCount}
                avtivePage={pageNumber + 1}
                handleChangePage={handleChangePage}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      <ContentContainer styleClass="bg-black-200 !h-96 !min-h-[320px] sm:!h-auto !pt-0 mt-4 sm:!px-2">
        <div className="flex w-full  h-72 lg:items-end ">
          <div className="flex flex-1 border-gray-400 border-r-2 h-56  sm:flex-col sm:py-8">
            <div className="lg:w-[30%] flex justify-center ">
              <img
                width="100px"
                height="100px"
                className="rounded-full lg:mr-4 h-28 w-28 sm:h-16 sm:w-16"
                src={
                  vendorDetail?.image_url
                    ?
                      vendorDetail?.image_url
                    : noImage
                }
                alt=""
              />
            </div>
            <div className="w-[70%] text-left sm:w-full sm:text-center">
              <h3 className="font-semibold ">
                {vendorDetail?.first_name + " " + vendorDetail?.last_name}
              </h3>
              <p className="text-gray-500 break-words">{vendorDetail?.email}</p>
              <p className="text-gray-500">
                TAX NO. {vendorDetail?.DefaultShop?.tax_no}
              </p>
              <p className="text-light-blue-700 underline cursor-pointer">
                Contact Us
              </p>
            </div>
          </div>
          <div className="flex lg:justify-end flex-1 h-56 sm:py-8 sm:pl-2">
            <div className=" text-right w-[50%] mr-12 sm:w-full">
              <div className="text-left sm:text-center">
                <h3 className="font-semibold">Owner of</h3>
                <div className="flex sm:flex-col ">
                  <img
                    width="100px"
                    height="100px"
                    className="rounded-full mr-4 h-28 w-28 sm:w-16 sm:h-16"
                    src={
                      vendorDetail?.DefaultShop?.image_url
                        ? 
                          vendorDetail?.image_url
                        : noImage
                    }
                    alt=""
                  />
                  <div className="lg:ml-4">
                    <h3 className="font-semibold">
                      {vendorDetail?.business_name}
                    </h3>
                    <p className="text-gray-500">
                      {vendorDetail?.DefaultShop?.City.name+', '+vendorDetail?.DefaultShop?.Country.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="italic text-2xl w-1/2 sm:w-full sm:px-4">
            {`"${vendorDetail?.DefaultShop?.quotes}"`}
          </p>
        </div>
      </ContentContainer>
    </>
  );
};

export default VendorDetail;
