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
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import Input from "@src/shared/input";
import { Divider } from "@mui/material";
import GoogleMap from "@src/shared/googleMap";
import { handleToastMessage } from "@src/shared/toastify";
import AutoLocation from "@src/shared/autoLocation";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const ChoosePayment = () => {
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
  const [orderNumber, setOrderNumber] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [coupon, setCoupon] = useState<any>("");
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
  const handleMapData = (add: any) => {
    setAddressInfo(add);
    getCartPrice(add);
  };
  const handleConfirmPayment = () => {
    setIsLoading(true);
    let _obj;
    if (selectedCardId) {
      _obj = {
        delivery_address: addressInfo?.delivery_address,
        lat: addressInfo?.lat,
        lng: addressInfo?.lng,
        payment_method: paymentMethod,
        card_id: selectedCardId,
      };
    } else {
      _obj = {
        delivery_address: addressInfo?.delivery_address,
        lat: addressInfo?.lat,
        lng: addressInfo?.lng,
        payment_method: paymentMethod,
      };
    }
    if (addressInfo?.delivery_address && paymentMethod) {
      backendCall({
        url: `/api/user/order/confirm_order`,
        method: "POST",
        data: _obj,
      }).then((res: any) => {
        if (res && !res.error) {
          handleToastMessage("success", res?.message);
          // handlePaymentIntent(res?.data?.client_secret);
          setOrderNumber(res?.data?.code);
          setIsLoading(false);
          if (paymentMethod === "PAYPAL") {
            window.open(res?.data?.href, "_self");
          } else {
            setIsOpen(true);
          }
        } else {
          handleToastMessage("error", res?.message);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  };
  const handlePaymentIntent = (clientSecret: any) => {
    stripe.confirmCardPayment(clientSecret).then(function (result: any) {
      console.log("payment intent result ==", result);
      // Handle result.error or result.paymentIntent
    });
  };
  return (
    <div className="gap-8 pl-6 sm:pl-0">
      <div className="space-y-8 w-full">
        {/* <CustomCard styleClass="text-left py-6 !w-[98%]">
          <h4 className="pl-6">Personal Details</h4>
          <SeperatorDashed />

          <div className="mt-5 flex justify-around items-center md:px-3">
            <div className="space-y-4">
              <h6 className="font-medium"> Name:</h6>
              <h6 className="font-medium"> Address:</h6>
              <h6 className="font-medium"> Phone Number:</h6>
            </div>

            <div className="space-y-4">
              <h6 className="font-light"> William</h6>
              <h6 className="font-light"> Street ABC, City XYZ</h6>
              <h6 className="font-light"> 09123456789</h6>
            </div>
          </div>
        </CustomCard> */}
        <CustomCard styleClass="text-left !w-[98%] relative">
          <div className="absolute top-2 left-4 z-50 !w-[94%]">
            <AutoLocation
              suburbSelect={async (value: any) => {
                getCartPrice(value);
                setAddressInfo({
                  ...value,
                  delivery_address: value?.val,
                });
              }}
              selectedValue={addressInfo?.delivery_address}
            />
          </div>
          <GoogleMap
            handleMapData={handleMapData}
            addressInfo={addressInfo}
            zoom={addressInfo?.delivery_address ? 15 : ""}
          />
          {!addressInfo?.delivery_address ? (
            <p className="text-red-100 !mt-2 ml-4 text-left text-xs">
              Please Select location
            </p>
          ) : null}
        </CustomCard>
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

                <div className="ml-auto">
                  <PencilEditIcon className="w-10" />
                </div>
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

              <div className="ml-auto">
                <PencilEditIcon className="w-10" />
              </div>
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

              <div className="ml-auto">
                <PencilEditIcon className="w-10" />
              </div>
            </div>
          </div>
          {!paymentMethod ? (
            <p className="text-red-100 !mt-2 ml-6 text-left text-xs">
              Please Select Payment Method
            </p>
          ) : null}
          <div className="flex justify-center mt-8">
            <CustomButton
              handleButtonClick={() => navigate("/cartManagement/addCard")}
              label={"+ Add More"}
              type={"button"}
              variant={"outlined"}
              styleClass={"btn-white w-[150px] !rounded-full !font-medium "}
            />
          </div>
        </CustomCard>
        <CustomCard styleClass="text-left py-6 !w-[98%]">
          <h4 className="pl-6">Order Summery</h4>
          <SeperatorDashed />
          {cartItems.map((item: any, index: number) => (
            <>
              <div className="flex sm:flex-col m-6">
                <div className="flex sm:flex-col items-start gap-3">
                  <div>
                    <div className="flex text-left flex-col items-start">
                      <h4 className="font-medium">
                        {`${index + 1}. ${item?.ProductVariant?.Product?.name}`}
                      </h4>
                      <div className="flex">
                        {item?.ProductVariant?.ProductOptions.map(
                          (option: any, index: number) => (
                            <p className="font-normal text-sm text-gray-900 mt-2 mr-2">
                              {option?.AttributeOption?.name}
                              {index + 1 !==
                              item?.ProductVariant?.ProductOptions.length
                                ? ","
                                : null}
                            </p>
                          )
                        )}
                      </div>
                      <h4 className="mt-2 font-medium">
                      €{item?.ProductVariant?.price}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end ml-auto sm:mt-3">
                  <div className=" bg-light-green-100 w-max rounded-lg items-center  flex p-3 py-1 gap-1 ">
                    <LazyImage
                      src={DeliveryIcon}
                      alt=""
                      className="object-cover rounded-t-xl "
                    />
                    <span className="text-xs text-green-900 ">Delivery</span>
                  </div>
                </div>
              </div>
              <Divider />
            </>
          ))}
        </CustomCard>
        <CustomCard styleClass="text-left py-6 !w-[98%]">
          <div className="flex justify-between px-6">
            <h4>Apply Coupon</h4>
            <CustomButton
              handleButtonClick={() => setIsOpen(false)}
              label={"Next"}
              type={"button"}
              variant={"outlined"}
              styleClass={"btn-black w-full w-20 !rounded-xl !font-medium "}
            />
          </div>
          <SeperatorDashed />
          <div className=" p-4 w-full">
            <Input
              id="coupon"
              name="coupon"
              type="text"
              placeholder="Apply Coupon"
              handldChange={(e: any) => setCoupon(e.target.value)}
              value={coupon}
            />
          </div>
        </CustomCard>
        <CustomCard styleClass="text-left py-6 !w-[98%]">
          <h6 className="text-center text-green-700 font-medium py-2">
            Payment Details
          </h6>
          <SeperatorDashed />

          <div className="mt-5 flex justify-between px-6 items-center md:px-3">
            <div className="space-y-4">
              <h6 className="font-medium">Sub-Total</h6>
              {cartPrice?.hasOwnProperty("delivery_fee") ? (
                <h6 className="font-medium"> Delivery Fee</h6>
              ) : null}
              <h6 className="font-medium"> GST</h6>
            </div>

            <div className="space-y-4">
              <h6 className="font-light">€{cartPrice?.sub_total}</h6>
              {cartPrice?.hasOwnProperty("delivery_fee") ? (
                <h6 className="font-light"> €{cartPrice?.delivery_fee}</h6>
              ) : null}
              <h6 className="font-light"> €{cartPrice?.tax}</h6>
            </div>
          </div>

          <SeperatorDashed className="mt-4" />

          <div className="mt-5 flex justify-between px-6 items-center md:px-3">
            <h5 className="font-bold">Total</h5>

            <h5 className="font-bold">€{cartPrice?.total}</h5>
          </div>
          <div className="flex justify-end px-4">
            {/* <CustomButton
              label="Confirm Payment"
              styleClass="btn-black !rounded-lg font-medium w-[20%] sm:w-[200px] mt-12"
              type={"button"}
              handleButtonClick={() => {
                navigate("#");
              }}
            /> */}
            <CustomButton
              handleButtonClick={handleConfirmPayment}
              isLoading={isLoading}
              label={"Confirm Payment & Address"}
              type={"button"}
              variant={"outlined"}
              styleClass={
                "btn-black !rounded-lg font-medium sm:w-[200px] mt-12"
              }
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

      <Popup
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        isShowHeader={true}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <LazyImage src={CircleTick} className="h-[220px] mt-6" />
          <h5 className="font-semibold mt-5">Your order is placed</h5>
          <h6 className="font-semibold">{orderNumber}</h6>
          <p className="text-normal font-normal text-black-900">
            You can track your order in{" "}
            <span className="font-semibold">My Orders</span> section
          </p>
          <div className="space-y-3 mt-8">
            <CustomButton
              label={"Go To Your Orders"}
              type={"button"}
              variant={"outlined"}
              styleClass={"btn-black w-full  !rounded-xl !font-medium "}
              handleButtonClick={() => navigate("/myOrders")}
            />
            <CustomButton
              handleButtonClick={() => navigate("/")}
              label={"Close"}
              type={"button"}
              variant={"outlined"}
              styleClass={"btn-white w-full  !rounded-xl !font-medium "}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ChoosePayment;
