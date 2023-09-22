import CustomCard from "@src/shared/cards/customCard";
import LazyImage from "@src/shared/lazyImage";
import StarYellow from "@assets/images/icons/star_yellow.png";
import pickup from "@assets/icons/pickup.png";
import delivery from "@assets/icons/delivery.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import BackIcon from "@assets/images/icons/arrow_back.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowNextIcon from "@src/shared/icons/arrow-next";

import { Link, useNavigate } from "react-router-dom";

const DealsListing = ({ dealIs }: any) => {
  const [dealData, setDealData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getDealById();
  }, [dealIs]);
  const getDealById = () => {
    backendCall({
      url: `/api/user/deal/${dealIs}?limit=-1&offset=0&order=desc&text`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setDealData(res?.data?.rows);
      }
    });
  };
  return (
    <>
      <Stack direction="row" alignItems="start" spacing={2}>
        {/*<LazyImage
          // routerLink={`/vendors/${params?.id}`}
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
          <p>
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              Deals
            </h5>
          </p>
        </Breadcrumbs> */}
      </Stack>
      <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 space-y-2 gap-4  justify-start items-end">
        {dealData.map((items: any) => (
          <CustomCard
            onClick={() => navigate(`/deals/${items?.id}`)}
            styleClass="shadow-sm h-full cursor-pointer"
          >
            <div className="relative">
              <LazyImage
                src={items.image_url}
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
              <div className="flex justify-between">
                <p className="opacity-90 text-black-100 text-sm w-10/12 text-left ">
                  {items.title}
                </p>
                {/* <p className="text-right flex justify-end text-sm text-black-900 ">
              <LazyImage className="w-9/12 pt-[1px]" src={StarYellow} alt="" />
              {items.rating || 4}
            </p> */}
              </div>
              <div className="flex">
                {items.delivery_type.includes("DELIVERY") ? (
                  <p className="opacity-90 bg-green-100 text-[#ECC74F] text-xs flex justify-center items-center text-left py-1 px-2 rounded-md">
                    <img src={delivery} className="w-4 h-4 mr-1" />
                    DELIVERY
                  </p>
                ) : null}
                {items.delivery_type.includes("PICKUP") ? (
                  <p className="ml-2 opacity-90 bg-red-200 text-red-900 text-xs  p-1 flex justify-center items-center text-left py-1 px-2 rounded-md">
                    <img src={pickup} className="w-4 h-4 mr-1" />
                    PICKUP
                  </p>
                ) : null}
              </div>
              {items.price && (
                <div className="flex items-center">
                  <h4 className="text-red-100 text-left inline-flex  font-semibold">
                    €{items.price}
                  </h4>
                  {items.was && (
                    <h5 className="text-gray-900 pl-3 line-through">
                      {" "}
                      €{items.was}{" "}
                    </h5>
                  )}
                </div>
              )}
            </div>
          </CustomCard>
        ))}
      </div>
    </>
  );
};

export default DealsListing;
