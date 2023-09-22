import React, { useEffect, useState } from "react";
import CustomCard from "@src/shared/cards/customCard";
import StartYellowIcon from "@assets/images/icons/star_yellow.svg";
import noImage from "@assets/images/NoImage.png";
import LazyImage from "@src/shared/lazyImage";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { Link, useParams } from "react-router-dom";
import { formatedDate } from "@src/shared/dateFormat";
import Stack from "@mui/material/Stack";
import BackIcon from "@assets/images/icons/arrow_back.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowNextIcon from "@src/shared/icons/arrow-next";

const Reviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState<any>();
  useEffect(() => {
    getReviews();
  }, []);
  console.log("pa",params)
  const getReviews = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.reviewid}/reviews?text&limit=-1&offset=0&order=desc`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setReviews(res?.data);
      }
    });
  };
  return (
    <>
       <Stack direction="row" alignItems="start" spacing={2}>
    <LazyImage
      routerLink={`/vendors/${params.id}/vendorDetail/${params.vendorid}/Item/${params.itemid}`}
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
       <CustomCard key={Math.random()} styleClass=" h-full cursor-pointer p-8">
      <div className="flex mb-8">
        <h1 className="text-7xl">{reviews?.vendor?.rating}</h1>
        <div className="flex flex-col justify-center ml-2">
          <div className="flex">
            <LazyImage
              className="w-[25px] h-[25px]"
              src={StartYellowIcon}
              alt=""
            />
            <LazyImage
              className="w-[25px] h-[25px]"
              src={StartYellowIcon}
              alt=""
            />
            <LazyImage
              className="w-[25px] h-[25px]"
              src={StartYellowIcon}
              alt=""
            />
            <LazyImage
              className="w-[25px] h-[25px]"
              src={StartYellowIcon}
              alt=""
            />
          </div>
          <h5 className="text-gray-900">
            {reviews?.vendor?.rating_count} Reviews
          </h5>
        </div>
      </div>
      <hr />
      <div className="pt-4">
        {reviews?.rows.map((review: any, index: number) => (
          <>
            <div className="py-4">
              <div className="flex justify-between items-center ">
                <div className="flex items-center">
                  <div>
                    <LazyImage
                      className="w-[90px] h-[90px] rounded-full"
                      src={
                        review?.User?.image_url
                          ?
                            review?.User?.image_url
                          : noImage
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-black-100 font-semibold">
                      {review?.User?.name}
                    </p>
                    <div className="flex">
                      <LazyImage
                        className="w-[15px] h-[15px]"
                        src={StartYellowIcon}
                        alt=""
                      />
                      <p className="text-black-100 font-semibold">
                        {review?.rating}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-black-100">
                  {formatedDate(review?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-black-100 text-left">{review?.review}</p>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </CustomCard>
    </>
 
  );
};

export default Reviews;
