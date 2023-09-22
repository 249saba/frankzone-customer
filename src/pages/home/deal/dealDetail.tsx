import LazyImage from "@src/shared/lazyImage";
import Clarks from "@assets/images/food/clarks.png";
import ClarksIcon from "@assets/images/icons/clarks.png";
import { Fragment } from "react";
import { Avatar } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import VendorItemCard from "@src/shared/cards/vendorItemCard ";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import CategoryModule from "@src/pages/home/category/categoryModule";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import SeeMore from "@assets/images/icons/see_more.png";
import ProductItemCard from "@src/shared/cards/productItemCard";
import Stack from "@mui/material/Stack";
import BackIcon from "@assets/images/icons/arrow_back.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowNextIcon from "@src/shared/icons/arrow-next";
import DealProductItemCard from "@src/shared/cards/dealProductItemCard";

const DealDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState<any>({
    VendorDealCategories: [],
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState<any>();
  const [getCategory, setGetCatgegory] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [vendor, setvendor] = useState<any>();
  const [vendorDetail, setvendorDetail] = useState<any>();
  const [isDefaultVariant, setIsDefaultVariant] = useState<any>(0);
  const { id } = useParams();

  // let vendor = searchParams.get("vendor");
  // let vendorDetail = searchParams.get("vendorDetail");
  
  useEffect(() => {
    getModuleCategory();
  }, []);
  useEffect(() => {
    let vendor1 = searchParams.get("vendor");
    setvendor(searchParams.get("vendor"));
    setvendorDetail(searchParams.get("vendorDetail"));
  }, []);
  console.log("searchParams",vendorDetail,vendor)
  const getModuleCategory = () => {
    backendCall({
      url: `/api/user/deal/deal_by_id/${params?.dealid}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCategoryData(res?.data);
        handleCategoryHeading(res?.data?.VendorDealCategories?.[0]);
        setSelectedCategoryId(res?.data?.VendorDealCategories?.[0]?.id);
      }
    });
  };
  const handleCategoryHeading = (cate: any) => {
    setSelectedCategoryId(cate?.id);
    getCategories(cate?.id);
    setCategoryName(cate);
  };
  const getCategories = (id: any) => {
    backendCall({
      url: `/api/user/deal/deal_category_products/${id}?limit=10&offset=0&order=desc&text=`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setGetCatgegory(res?.data?.rows);
      }
    });
  };
  return (
    <Fragment>
      <Stack direction="row" alignItems="start" spacing={2}>
    <LazyImage
      routerLink={`/vendors/${vendor}/vendorDetail/${vendorDetail}`}
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
   <p >
   <h5
          className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
        >
          Deals
        </h5>
   </p>
      
        
    </Breadcrumbs>
  </Stack>
      <div className="relative flex justify-center bg-white border-2 rounded-2xl h-[387px]">
        {categoryData?.image_url ? (
          <LazyImage
            src={
               categoryData?.image_url
            }
            alt=""
            className="rounded-xl h-96"
          />
        ) : null}
      </div>
      <h3 className="font-semibold text-black-900 flex  items-center mt-6">
        {categoryData?.title}
      </h3>
      {/* <Avatar
          src={ClarksIcon}
          size="xxl"
          className={
            "absolute h-[130px] w-[130px] sm:h-[60px] sm:w-[60px] sm:left-[20px] sm:bottom-[-20px] left-[80px] bottom-[-40px] border-white border-4 rounded-full"
          }
        /> */}
      <div className="mt-10 ">
        <div className="flex justify-between items-start sm:flex-col sm:items-start mr-2">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            CATEGORIES
          </h3>
        </div>
        <div className="flex w-full flex-wrap ">
          {categoryData?.VendorDealCategories.map(
            (item: any, index: number) => (
              <div
                key={index}
                onClick={() => handleCategoryHeading(item)}
                className={`pt-4 relative `}
              >
                <LazyImage
                  src={
               
                    item?.Category?.image_url
                  }
                  alt=""
                  className={`w-[139px] h-40 mx-2 rounded-md ${
                    selectedCategoryId === item?.id
                      ? "border-4  border-yellow-800"
                      : null
                  }`}
                  caption={
                    <p className="opacity-90 text-black-100 text-sm pt-1">
                      {item?.Category?.name}
                    </p>
                  }
                />
                <p
                  className={`p-3 bg-red-100 text-white rounded-md py-1 absolute top-5 left-5 `}
                >
                  -{categoryData.discount}%
                </p>
              </div>
            )
          )}
        </div>
        {getCategory?.length ? (
          <h3 className="font-bold text-black-900 italic flex  items-center mt-10">
            {categoryName?.Category?.name}
          </h3>
        ) : null}
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end mt-4">
          {getCategory.map((item: any, index: number) => (
            <DealProductItemCard
              key={index}
              handleClick={(id: any) =>
                navigate({search:`?vendor=${vendor}&vendorDetail=${vendorDetail}`,pathname:`/deals/${params?.dealid}/productDetail/${item?.id}`})
              }
              items={item}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default DealDetail;
