import CustomCard from "@src/shared/cards/customCard";
import CustomButton from "@src/shared/customButton";
import Radio from "@src/shared/radio/radio";
import MasterCard from "@assets/images/icons/masterCard.svg";
// import CircleTick from "@assets/images/icons/tickCircle.png";
import CircleTick from "@assets/images/icons/circle_tick_yellow.png";
import LazyImage from "@src/shared/lazyImage";
import PencilEditIcon from "@src/shared/icons/pencil-edit";
import SeperatorDashed from "@src/shared/seperator/seperatorDashed";
import Popup from "@src/shared/popup/popup";
import { useState, useEffect } from "react";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { useNavigate } from "react-router-dom";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import { ICrumbs } from "@src/shared/interfaces";
import BreadCrumb from "@src/shared/breadCrumbs/breadCrumb";

const PaymentCardListing = () => {
  const navigate = useNavigate();
  const stripe: any = useStripe();
  const element = useElements();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartPrice, setCartPrice] = useState<any>([]);
  const [cardInfo, setCardinfo] = useState<any>([]);
  const [addressInfo, setAddressInfo] = useState<any>({});
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<any>("");
  const [selectedCardId, setSelectedCardId] = useState<any>("");
  const [cartItems, setCartItems] = useState<any>([]);

  useEffect(() => {
    getCartDetail();
    getCartPrice(null);
    getCardInfo();
    getSelectedAddress();
  }, []);
  const getCartDetail = () => {
    backendCall({
      url: `/api/user/order/cart_information`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCartItems(res?.data);
      }
    });
  };
  const getCartPrice = (address: any) => {
    let _url = `/api/user/order/cart/price`;
    if (address) {
      _url = `/api/user/order/cart/price?lat=${address?.lat}&lng=${address?.lng}`;
    }
    backendCall({
      url: _url,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCartPrice(res?.data);
      }
    });
  };
  const getCardInfo = () => {
    backendCall({
      url: `/api/user/cards`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCardinfo(res?.data);
      }
    });
  };
  const getSelectedAddress = () => {
    backendCall({
      url: `/api/user/selected_address`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setSelectedAddress(res?.data);
        console.log("selected address ==", res?.data);
        setAddressInfo({
          delivery_address: res?.data?.location,
          lat: res?.data?.lat,
          lng: res?.data?.lng,
        });
      }
    });
  };
  const handleSelectCard = (e: any) => {
    setSelectedCardId(e.target.name === "STRIPE" ? e.target.id : "");
    setPaymentMethod(e.target.name);
  };

  const handlePaymentIntent = (clientSecret: any) => {
    stripe.confirmCardPayment(clientSecret).then(function (result: any) {
      console.log("payment intent result ==", result);
      // Handle result.error or result.paymentIntent
    });
  };
  const item: ICrumbs = { title: "Payment method", link: "/paymentMethod" };
  return (
    <>
       <BreadCrumb item={item} />
        <div className="gap-8 mt-5 pl-6 sm:pl-0">
      <div className="space-y-8 w-full">
        <CustomCard styleClass="text-left py-6 !w-[98%]">
          <h4 className="pl-6">Payment Method</h4>
          <SeperatorDashed />
          <div className="mt-5 flex flex-col justify-between items-start gap-5 px-6 sm:px-2">
            {cardInfo?.map((card: any, index: number) => (
              <div
                className="flex items-center  bg-gray-800 rounded-lg w-full p-4 gap-3"
                key={index}
              >
                <Radio
                  name={"STRIPE"}
                  id={card?.id}
                  labelClassName="block -top-3"
                  checked={selectedCardId === card?.id}
                  onClick={(e: any) => handleSelectCard(e)}
                />
                <div className="flex gap-3">
                  <LazyImage width="60px" height="100%" src={MasterCard} />
                  <div className="space-y-2">
                    <p className="text-sm text-black-900">{card?.brand}</p>
                    <h6 className="text-gray-900">**** {card?.last_four}</h6>
                  </div>
                </div>

                {/* <div className="ml-auto">
                  <PencilEditIcon className="w-10" />
                </div> */}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col justify-between items-start gap-5 px-6 sm:px-2">
            <div className="flex items-center  bg-gray-800 rounded-lg w-full p-4 gap-3">
              <Radio
                name="PAYPAL"
                id="PAYPAL"
                labelClassName="block -top-3"
                checked={paymentMethod === "PAYPAL"}
                onClick={(e: any) => handleSelectCard(e)}
              />
              <div className="flex gap-3 items-center">
                <LazyImage width="60px" height="100%" src={MasterCard} />
                <h6 className="text-black-100">Paypal</h6>
              </div>
              {/* 
              <div className="ml-auto">
                <PencilEditIcon className="w-10" />
              </div> */}
            </div>
          </div>
          <div className="mt-3 flex flex-col justify-between items-start gap-5 px-6 sm:px-2">
            <div className="flex items-center  bg-gray-800 rounded-lg w-full p-4 gap-3">
              <Radio
                name="COD"
                id="COD"
                labelClassName="block -top-3"
                checked={paymentMethod === "COD"}
                onClick={(e: any) => handleSelectCard(e)}
              />
              <div className="flex gap-3">
                <h6 className="text-black-100">Cash On Delivery</h6>
              </div>

              {/* <div className="ml-auto">
                <PencilEditIcon className="w-10" />
              </div> */}
            </div>
          </div>
          {/* {!paymentMethod ? (
            <p className="text-red-100 !mt-2 ml-6 text-left text-xs">
              Please Select Payment Method
            </p>
          ) : null} */}
          <div className="flex justify-center mt-8">
            <CustomButton
              handleButtonClick={() => navigate("/paymentMethod/addPaymentCard")}
              label={"+ Add More"}
              type={"button"}
              variant={"outlined"}
              styleClass={"btn-white w-[150px] !rounded-full !font-medium "}
            />
          </div>
        </CustomCard>

        {/* <div className="w-full flex  px-4 gap-6 justify-end">
          <CustomButton
            label={"Back"}
            type={"button"}
            variant={"outlined"}
            styleClass={"btn-gray w-[20%]  !rounded-xl !font-medium "}
          />
          <CustomButton
            handleButtonClick={handleConfirmPayment}
            label={"Confirm Appointment"}
            type={"button"}
            variant={"outlined"}
            styleClass={"btn-black w-full w-[20%]  !rounded-xl !font-medium "}
          />
        </div> */}
        {/* <CustomCard styleClass="text-left py-6 pb-16 !bg-green-800 !bg-opacity-10 !shadow-none !w-[98%]">
          <div className="flex justify-evenly  ">
            <h6 className="text-green-700 font-semibold">Order Id</h6>{" "}
            <h6 className="text-green-700 font-semibold">#487895566</h6>
          </div>
          <SeperatorDashed />
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1  justify-between items-center  gap-8 px-16 md:px-6 sm:px-6">
            <div>
              <h6 className=" font-bold"> Date: </h6>
              <h6 className="font-light">Wednesday, 11 Jan 2022</h6>
            </div>
            <div>
              <h6 className="font-bold"> Time: </h6>
              <h6 className="font-light">07:30 PM</h6>
            </div>

            <div>
              <h6 className=" font-bold"> Price: </h6>
              <h6 className="font-light">$80</h6>
            </div>
          </div>
        </CustomCard> */}
      </div>
    </div>
    </>

  );
};

export default PaymentCardListing;
