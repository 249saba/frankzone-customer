import React, { Fragment, useState, useEffect } from "react";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import { Avatar } from "@material-tailwind/react";
import { Step, StepLabel, Stepper } from "@mui/material";
import LazyImage from "@src/shared/lazyImage";
import noImage from "@assets/images/NoImage.png";
import StarYellow from "@assets/images/icons/star_yellow.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { useParams } from "react-router-dom";
import CustomCard from "@src/shared/cards/customCard";
import CustomButton from "@src/shared/customButton";

const OrderDetail = () => {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState<any>({ OrderLines: [] });
  const [activeStep, setActiveStep] = React.useState(4);
  useEffect(() => {
    getOrderDetail();
  }, []);
  const getOrderDetail = () => {
    backendCall({
      url: `/api/user/order/${params?.id}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        console.log("res?.data ==", res?.data);
        setOrderDetail(res?.data);
      }
    });
  };
  return (
    <Fragment>
      <div className="relative">
        <LazyImage
          src={
            orderDetail?.Vendor?.DefaultShop?.cover_url
              ?
                orderDetail?.Vendor?.DefaultShop?.cover_url
              : noImage
          }
          width="100%"
          alt=""
          className="rounded-xl h-96"
        />
        <Avatar
          src={
            orderDetail?.Vendor?.image_url
              ? 
                orderDetail?.Vendor?.DefaultShop?.image_url
              : noImage
          }
          size="xxl"
          className={
            "absolute h-[130px] w-[130px] sm:h-[60px] sm:w-[60px] sm:left-[20px] sm:bottom-[-20px] left-[80px] bottom-[-40px] border-white border-4 rounded-full"
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="text-left">
          <h3 className="font-semibold text-black-900 mt-6">
            {orderDetail?.Vendor?.business_name}
          </h3>
          <p className="font-normal text-sm text-gray-900 mt-2">
            {orderDetail?.Vendor?.DefaultShop?.City?.name},{" "}
            {orderDetail?.Vendor?.DefaultShop?.Country?.name}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <LazyImage
            src={StarYellow}
            alt=""
            className="rounded-xl w-8 h-8 mr-2"
          />
          <h3 className="font-semibold text-black-900 mr-2">
            {orderDetail?.Vendor?.rating}
          </h3>
          <h4 className="font-normal text-gray-900">{`(${orderDetail?.Vendor?.rating_count})`}</h4>
        </div>
      </div>
      <div className="mt-10 bg-[#EEF9F8] text-left p-6 rounded-md">
        <h3 className="font-semibold">Order Detail</h3>
        <hr className="border-blue-gray-400 w-full my-4 " />
        <p className="text-center text-[#7580F2] my-4 text-lg">
          {orderDetail?.code}
        </p>
        <h4 className="font-semibold">Delivery Address</h4>
        <p className="text-gray-900 text-sm">{orderDetail?.shipping_address}</p>
      </div>
      <CustomCard styleClass="mt-8">
        <div className="p-6">
          {orderDetail?.OrderLines.map((order: any) => (
            <div className="flex flex-col  ">
              <div className="flex sm:flex-col items-stretch py-4">
                <div className="flex sm:flex-col items-start gap-3">
                  <div className="flex items-start gap-3">
                    <LazyImage
                      className="w-[100px] h-[100px] sm:[w-60px] sm:h-[120px] rounded-lg object-cover"
                      src={
                        order?.ProductVariant?.cover_image_url
                          ? 
                            order?.ProductVariant?.cover_image_url
                          : Burger_rectangle
                      }
                    />
                  </div>
                  <div className="flex text-left flex-col items-start h-full">
                    <h5 className="font-medium">
                      {order?.ProductVariant?.Product?.name}
                    </h5>
                    <div className="flex">
                      {order?.ProductVariant?.ProductOptions.map(
                        (option: any, index: number) => (
                          <p className="font-normal text-sm text-gray-900 mt-2 mr-2">
                            {option?.AttributeOption?.name}
                            {index + 1 !==
                            order?.ProductVariant?.ProductOptions.length
                              ? ","
                              : null}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end ml-auto sm:mt-3 gap-1">
                  <div className="mt-auto">
                    <h5 className=" font-semibold mt-2 sm:mt-0">
                      {" "}
                      {order?.quantity} X
                    </h5>
                    <h4 className=" font-semibold mt-2 sm:mt-0">
                      {" "}
                      €{order?.price}
                    </h4>
                  </div>
                </div>
              </div>
              <hr className="border-black-100 w-full " />
            </div>
          ))}
        </div>
      </CustomCard>
      <div className="flex mt-8">
        <h4 className="text-[#FF9900] bg-[#ff990061] p-2">In Transit</h4>
      </div>
      <div className="w-full py-4 px-8">
        <Stepper alternativeLabel activeStep={activeStep}>
          <Step>
            <StepLabel>{"Ordered"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{"Confirmed"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{"Preparing"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{"In Transit"}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{"Delivered"}</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div>
        <div className="mt-10 bg-[#EEF9F8] text-left p-6 rounded-md">
          <div className="flex justify-between">
            <h4>Delivery Fee</h4>
            <p className="text-gray-900 text-xl">
              €{orderDetail?.shipping_cost}
            </p>
          </div>
          <div className="flex justify-between">
            <h4>GST</h4>
            <p className="text-gray-900 text-xl">€{orderDetail?.tax || 0}</p>
          </div>
          <hr className="border-blue-gray-400 w-full my-4 " />
          <div className="flex justify-between">
            <h4 className="font-semibold">Total:</h4>
            <h4 className="font-semibold">€{orderDetail?.grand_total}</h4>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <CustomButton
          styleClass="btn-black mt-4 !rounded"
          type={"button"}
          label={"Reroder"}
          handleButtonClick={() => {}}
        />
      </div>
    </Fragment>
  );
};

export default OrderDetail;
