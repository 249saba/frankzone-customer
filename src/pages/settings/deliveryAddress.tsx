import CustomCard from "@src/shared/cards/customCard";
import CustomButton from "@src/shared/customButton";
import Radio from "@src/shared/radio/radio";
import MasterCard from "@assets/icons/MapLocation.png";
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
import { ICrumbs } from "@src/shared/interfaces";
import BreadCrumb from "@src/shared/breadCrumbs/breadCrumb";

const DeliveryAddress = () => {
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
    // getCartDetail();
    // getCartPrice(null);
    getCardInfo();
    // getSelectedAddress();
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
      url: `/api/user/address?limit=-1&offset=0&order=desc`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCardinfo(res?.data?.rows);
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
          setIsOpen(true);
        } else {
          handleToastMessage("error", res?.message);
          setIsLoading(false);
        }
      });
    }
  };
  const handleSetSelectedAddress = (id: Number) => {
    backendCall({
      url: `/api/user/select_address/${id}`,
      method: "PUT",
    }).then((res: any) => {
      if (res && !res.error) {
        navigate({
          search: `?id=${id}`,
          pathname: "/Setting/ConfirmLocation",
        });
      }
    });
  };
  const item: ICrumbs = { title: "Setting", link: "/Setting" };
  const item1: ICrumbs = {
    title: "Delivery Address",
    link: "/Setting/DeliveryAddress",
  };
  return (
    <>
      <div className="flex  justify-between  gap-2">
        <div className="text-left ">
          <BreadCrumb item={item} item1={item1} />
        </div>
      </div>
      <div className="gap-8 pl-6 sm:pl-0">
        <div className="space-y-8 w-full">
          {/* <CustomCard styleClass="text-left !w-[98%] relative">
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
        </CustomCard> */}
          <CustomCard styleClass="text-left py-6 !w-[98%] mt-4">
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
                    checked={card.is_selected === 1 ? true : false}
                    //   onClick={(e: any) => handleSelectCard(e)}
                  />
                  <LazyImage width="30px" height="30px" src={MasterCard} />
                  <div className="flex gap-3">
                    <div className="space-y-2">
                      <p className="text-sm text-black-900">{card?.title}</p>
                      <h6 className="text-gray-900">{card?.location}</h6>
                    </div>
                  </div>

                  <div
                    className="ml-auto"
                    onClick={() => handleSetSelectedAddress(card?.id)}
                  >
                    <PencilEditIcon className="w-10" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <CustomButton
                handleButtonClick={() => navigate("/Setting/AddNewAddress")}
                label={"+ Add More"}
                type={"button"}
                variant={"outlined"}
                styleClass={"btn-white w-[150px] !rounded-full !font-medium "}
              />
            </div>
          </CustomCard>
        </div>
      </div>
    </>
  );
};

export default DeliveryAddress;
