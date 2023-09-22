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
import homeIcon from "@assets/icons/Home.png";
import otherIcon from "@assets/icons/Other.png";
import WorkIcon from "@assets/icons/Work.png";
import picker from "@assets/icons/Picker.png";
import location from "@assets/icons/location.png";
import location_Icon from "@assets/icons/location_Icon.png";
import * as Yup from "yup";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import Input from "@src/shared/input";
import { Divider } from "@mui/material";
import GoogleMap from "@src/shared/googleMap";
import axios from "axios";
import AutoLocation from "@src/shared/autoLocation";
import { handleToastMessage } from "@src/shared/toastify";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { GetStorage, SetStorage } from "@src/shared/utils/authService";
import { ICrumbs } from "@src/shared/interfaces";
import BreadCrumb from "@src/shared/breadCrumbs/breadCrumb";
import ContentContainer from "@src/containers/contentContainer";
export interface initialSchemaValues {
  lat: number;
  lng: number;
  location: string;
  street_number: string;
  address_type: string;
  title:string
}
const FormSchema = Yup.object().shape({
  lat: Yup.number().required(),
  lng: Yup.number().required(),
  location: Yup.string().required(),
  address_type: Yup.string().required("Select the address place"),
});

const initialValues: initialSchemaValues = {
  lat: 0,
  lng: 0,
  location: "",
  street_number: "",
  address_type: "",
  title:""
};
const NewLocation = () => {
  const navigate = useNavigate();
  const stripe: any = useStripe();
  const element = useElements();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartPrice, setCartPrice] = useState<any>([]);
  const [cardInfo, setCardinfo] = useState<any>([]);
  const [addressInfo, setAddressInfo] = useState<any>({ initialValues });
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<any>("");
  const [selectedCardId, setSelectedCardId] = useState<any>("");
  const [cartItems, setCartItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id");
  //   useEffect(() => {
  //     getCartDetail();
  //     getCartPrice(null);
  //     getCardInfo();
  //     getSelectedAddress();
  //   }, []);
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
      url: `/api/user/address?limit=10&offset=0&order=desc`,
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
          title: res?.data?.title,
          address_type: res?.data?.address_type,
          street_number: res?.data?.street_number,
        });
      }
    });
  };

  const handleMapData = (add: any) => {
    console.log("fffff", add);
    console.log("fffff", addressInfo);
    setAddressInfo({
      ...addressInfo,
      delivery_address: add.delivery_address,
      lat: add.lat,
      lng: add.lng,
    });
    getCartPrice(add);
  };
  const handleLocation = () => {
    setIsOpen(true);
  };
  const handlePaymentIntent = (clientSecret: any) => {
    stripe.confirmCardPayment(clientSecret).then(function (result: any) {
      console.log("payment intent result ==", result);
      // Handle result.error or result.paymentIntent
    });
  };
  const handleSubmit = (values: any) => {
    setIsLoading(true);
    console.log("_obj", values);
    let title_arr=addressInfo?.delivery_address.split(",");
    // console.log("title_arr",title_arr)
    // setAddressInfo({
    //   ...addressInfo,
    //   title: title_arr[0],
    // });
    let _obj = {
      ...values,
      title: title_arr[0],
      address_type: addressInfo?.address_type,
      lat: addressInfo?.lat,
      lng: addressInfo?.lng,
      location: addressInfo?.delivery_address,
      street_number: addressInfo?.street_number,
    };
    backendCall({
      url: `/api/user/address`,
      method: "POST",
      data: _obj,
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(res);
        const _storageData = GetStorage();
        const storageData: any = {
          ..._storageData,
          isLoggedIn: true,
        };

        SetStorage(storageData);
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        navigate("/");
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  const item: ICrumbs = { title: "Setting", link: "/Setting" };
  const item1: ICrumbs = {
    title: "Delivery Address",
    link: "/Setting/DeliveryAddress",
  };
  return (
    <ContentContainer styleClass="login-bg-gradient !h-screen !px-0 !pb-0"> 
      
      <div className="gap-8 pl-6 sm:pl-0">
        <div className="space-y-8 w-full">
          <Formik
            initialValues={initialValues}
            // validationSchema={FormSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              handleChange,
              handleBlur,
              touched,
              values,
              setFieldTouched,
              setFieldValue,
            }) => {
              const handleLatLng = () => {
                navigator.geolocation.getCurrentPosition(async function (
                  position
                ) {
                  await setFieldValue("lat", position.coords.latitude);
                  await setFieldValue("lng", position.coords.longitude);
                  handleFetchAddress(
                    position.coords.latitude,
                    position.coords.longitude
                  );
                });
              };
              const handleFetchAddress = (lat: any, lng: any) => {
                const API_KEY =
                  "AIzaSyDjjNiKps3y27gM7TpL6cyxR01YBnvKcOQ&libraries=places";
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

                axios
                  .get(url)
                  .then((response) => {
                    if (response.data.results.length > 0) {
                      setFieldValue(
                        "location",
                        response.data.results[0].formatted_address
                        
                      );
                    //   let title_arr=response.data.results[0].formatted_address.split(",");
                    //   console.log("title_arr",title_arr)
                    //   setAddressInfo({
                    //     ...addressInfo,
                    //     title: title_arr[0],
                    //   });
                    //   setFieldValue("street_number", title_arr[0]);
                    } else {
                      setFieldValue("location", "Address not found");
                    }
                  })
                  .catch((error) => {
                    setFieldValue("location", "Error fetching address");
                    console.error(error);
                  });
              };
              return (
                <CustomCard styleClass="p-6 ">
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
                        searchIcon="yes"
                        searchbtn="yes"
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
                  <h6 className="text-black-100 text-left font-medium px-4 pt-6">
                    Your Address
                  </h6>
                  <CustomCard styleClass="p-6 rounded-lg">
                    <div className="flex items-center text-left  rounded-lg w-full  gap-3">
                      <LazyImage width="30px" height="30px" src={MasterCard} />
                      <div className="flex gap-3 w-full">
                        <div className="w-full">
                          {/* <p className="text-sm text-black-900 font-medium">
                            {"Address"}
                          </p> */}
                          {/* <h6 className="text-gray-900">
                            {addressInfo?.delivery_address}
                          </h6> */}
                          <AutoLocation
                             suburbSelect={async (value: any) => {
                                getCartPrice(value);
                                setAddressInfo({
                                  ...value,
                                  delivery_address: value?.val,
                                });
                              }}
                              placeholder="Enter Address Title"
                            label="Address"
                            selectedValue={addressInfo?.delivery_address}
                         
                            // error={errors.address}
                            // isError={!!(errors.address && touched.address)}
                          />
                          {/* <Input
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Enter Address Title"
                            // handldChange={(event: any) => {
                            //     setFieldTouched("title", true);
                            //     handleChange
                           
                            // }}
                            handldChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.title}
                            touched={errors.title}
                            value={values.title}
                          /> */}
                             {!addressInfo?.delivery_address ? (
                      <p className="text-red-100 !mt-2 ml-4 text-left text-xs">
                        Please Select title
                      </p>
                    ) : null}
                        </div>
                      </div>
                    </div>
                  </CustomCard>
                  {!isOpen ?  <div className="flex gap-4 items-start mt-5">
                    <CustomButton
                    type={"button"}
                    label={"Confirm Location"}
                    styleClass="btn-black !rounded-md"
                    handleButtonClick={() => {
                      handleLocation();
                    }}
                    
                  />
                  
                  </div>:""}
                
                  {addressInfo?.delivery_address && isOpen? <Form className="space-y-6">
                    <div className="space-y-3">
                      <h6 className="text-black-100 text-left font-medium px-4 pt-6">
                        Add Label
                      </h6>
                      <div className=" flex items-start justify-start">
                        <div
                          className={`cursor-pointer`}
                          // onClick={() => setFieldValue(`address_type`, "HOME")}
                          onClick={() =>
                            setAddressInfo({
                              ...addressInfo,
                              address_type: "HOME",
                            })
                          }
                        >
                          <img
                            src={homeIcon}
                            className={`h-12 w-12 mx-4 ${
                              addressInfo.address_type === "HOME"
                                ? "border-4 rounded-full border-black-700"
                                : null
                            }`}
                          />{" "}
                          <p className="font-semibold text-black-100">Home</p>
                        </div>
                        <div
                          className={`cursor-pointer `}
                          onClick={() =>
                            setAddressInfo({
                              ...addressInfo,
                              address_type: "WORK",
                            })
                          }
                          // onClick={() => setFieldValue(`address_type`, "WORK")}
                        >
                          <img
                            src={otherIcon}
                            className={`h-12 w-12 mx-4 ${
                              addressInfo.address_type === "WORK"
                                ? "border-4 rounded-full border-black-700"
                                : null
                            }`}
                          />{" "}
                          <p className="font-semibold text-black-100">Work</p>
                        </div>
                        <div
                          className={`cursor-pointer `}
                          onClick={() =>
                            setAddressInfo({
                              ...addressInfo,
                              address_type: "OTHER",
                            })
                          }
                        
                        >
                          <img
                            src={WorkIcon}
                            className={`h-12 w-12 mx-4 ${
                              addressInfo.address_type === "OTHER"
                                ? "border-4 rounded-full border-black-700 bg-blue-100"
                                : null
                            }`}
                          />{" "}
                          <p className="font-semibold text-black-100">Other</p>
                        </div>
                      </div>
                      {!addressInfo.address_type ? (
                      <p className="text-red-100 !mt-2 ml-4 text-left text-xs">
                        Please Select label
                      </p>
                    ) : null}
                    </div>
                    <div className="flex gap-5 justify-start items-start mt-5">
                      <CustomButton
                        type={"submit"}
                        label={"Save & Continue"}
                        styleClass="btn-black !rounded-md"
                      />
                        <CustomButton
                    type={"button"}
                    label={"Back"}
                    styleClass="btn-gray !rounded-md"
                    handleButtonClick={() => {
                      navigate("/addLocation")
                    }}
                    
                  />
                    </div>
                  </Form>:""}
                 
                </CustomCard>
              );
            }}
          </Formik>
        </div>
      </div>
    </ContentContainer>
  );
};

export default NewLocation;
