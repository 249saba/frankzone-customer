import { useState, useEffect } from "react";
import VendorItemCard from "@src/shared/cards/vendorItemCard ";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryModule from "@src/pages/home/category/categoryModule";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import LazyImage from "@src/shared/lazyImage";
import Stack from "@mui/material/Stack";
import BackIcon from "@assets/images/icons/arrow_back.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowNextIcon from "@src/shared/icons/arrow-next";
import SeeMore from "@assets/images/icons/see_more.png";
import SeeAllCategory from "@src/pages/home/category/seeAllCategory";

const VendorList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [vendorsItems, setVendorsItems] = useState<any>([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getVendors();
    getModuleCategory();
  }, []);
  const getVendors = () => {
    backendCall({
      url: `/api/user/home/module/${params?.id}/vendors`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setVendorsItems(res?.data?.rows);
      }
    });
  };

  const getModuleCategory = () => {
    backendCall({
      url: `/api/user/home/module/${params?.id}/categories?limit=-1`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCategoryData(res?.data?.rows);
      }
    });
  };
  return (
    <>
      <Stack direction="row" alignItems="start" spacing={2}>
        <LazyImage
          routerLink={"/"}
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

          <h5
            className={`text-blue-900 font-normal hover:underline hover:cursor-pointer `}
          >
            Vendors
          </h5>
        </Breadcrumbs>
      </Stack>
      <div className=" ">
        <div className="flex justify-between items-start sm:flex-col sm:items-start mr-2">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            SUBCATEGORIES
          </h3>
          {/* <h4
            className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto cursor-pointer"
            onClick={() => navigate(`seeAllCategory/${params?.id}`)}
          >
            <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4> */}
        </div>
        <CategoryModule categoryId={params?.id} categoryData={categoryData} />
      </div>
      {/*<div className="space-y-5 mt-4">
         <div className="flex justify-between items-start sm:flex-col sm:items-start mr-2">
          <h3 className="font-bold text-black-900 italic flex  items-center">
            SHOPS
          </h3>
          <h4
            className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto cursor-pointer"
            onClick={() => navigate(`seeAllVendor/${params?.id}`)}
          >
            See More <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4>
        </div> 
        <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-2  gap-10  justify-start items-end">
          {vendorsItems.map((item: any) => (
            <VendorItemCard items={item} />
          ))}
        </div>
      </div>*/}
    </>
  );
};
export default VendorList;
