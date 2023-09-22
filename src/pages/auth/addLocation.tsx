import { useState, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import CustomCard from "@src/shared/cards/customCard";
import homeIcon from "@assets/icons/Home.png";
import otherIcon from "@assets/icons/Other.png";
import WorkIcon from "@assets/icons/Work.png";
import picker from "@assets/icons/Picker.png";
import location from "@assets/icons/location.png";
import location_Icon from "@assets/icons/location_Icon.png";
import BackroundImage from "@src/shared/backgroundImage";
import HomeBg from "@assets/images/home_bg.png";
import CustomButton from "@src/shared/customButton";
import { ReactComponent as Fb } from "@assets/icons/facebook_blue.svg";
import { ReactComponent as Google_blue } from "@assets/icons/google_blue.svg";
import * as Yup from "yup";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { StorageI } from "@src/shared/interfaces";
import { GetStorage, SetStorage } from "@src/shared/utils/authService";
import ContentContainer from "@src/containers/contentContainer";
import Input from "@src/shared/input";
import SeperatorDashed from "@src/shared/seperator/seperatorLine";
import SeperatorLine from "@src/shared/seperator/seperatorLine";
import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import LazyImage from "@src/shared/lazyImage";
import Consultation from "@assets/images/Consultation.png";
import Ecommerce from "@assets/images/Ecommerce.png";
import handyman from "@assets/images/handman.png";
import Food from "@assets/images/Food.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { handleToastMessage } from "@src/shared/toastify";
import axios from "axios";
import AutoLocation from "@src/shared/autoLocation";

interface IloginImages {
  id: number;
  src: string;
}

export interface initialSchemaValues {
  lat: number;
  lng: number;
  location: string;
  street_number: string;
  address_type: string;
}

const loginImages: IloginImages[] = [
  { id: 1, src: Consultation },
  { id: 2, src: Ecommerce },
  { id: 3, src: handyman },
  { id: 4, src: Food },
];

const FormSchema = Yup.object().shape({
  // lat: Yup.number().required(),
  // lng: Yup.number().required(),
  // location: Yup.string().required(),
  // street_number: Yup.string().required("Enter Street No."),
  address_type: Yup.string(),
});

const initialValues: initialSchemaValues = {
  lat: 0,
  lng: 0,
  location: "",
  street_number: "",
  address_type: "CURRENT",
};

const AddLocation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit1 = () => {
  //   setIsLoading(true);
  //   let _obj = {
  //     ...values,
  //     title: values?.street_number,
  //   };
  //   backendCall({
  //     url: `/api/user/address`,
  //     method: "POST",
  //     data: _obj,
  //   }).then((res: any) => {
  //     if (res && !res.error) {
  //       console.log(res);
  //       const _storageData = GetStorage();
  //       const storageData: any = {
  //         ..._storageData,
  //         isLoggedIn: true,
  //       };

  //       SetStorage(storageData);
  //       setIsLoading(false);
  //       handleToastMessage("success", res?.message);
  //       navigate("/");
  //     } else {
  //       setIsLoading(false);
  //       handleToastMessage("error", res?.message);
  //     }
  //   });
  // };
  return (
    <ContentContainer styleClass="login-bg-gradient !h-screen !px-0 !pb-0">
      <div className="flex md:flex-col justify-between items-end h-full gap-16 ">
        <div className="w-[30%] md:w-[50%] sm:z-50 md:z-50 sm:w-[80%] mx-auto !mb-auto ">
          <Avatar
            variant="circular"
            size="lg"
            alt="candice wu"
            className="p-0.5 mt-2 w-20 h-20"
            src={location_Icon}
          />
          <h5 className="font-bold text-center sm:text-xl">
            Enable Your Location
          </h5>
          <p className="text-gray-900">
            Please enter your location or allow access to your location to find
            deals near you{" "}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={FormSchema}
            onSubmit={() => {}}
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
                  await handleFetchAddress(
                    position.coords.latitude,
                    position.coords.longitude
                  );
                  console.log(" ===", position.coords);
                });
              };
              const handleFetchAddress = async (lat: any, lng: any) => {
                const API_KEY =
                  "AIzaSyDjjNiKps3y27gM7TpL6cyxR01YBnvKcOQ&libraries=places";
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

                await axios
                  .get(url)
                  .then(async (response) => {
                    if (response.data.results.length > 0) {
                      await setFieldValue(
                        "location",
                        response.data.results[0].formatted_address
                      );
                      let title_arr =
                        response.data.results[0].formatted_address.split(",");

                      await setFieldValue("street_number", title_arr[0]);
                      let obj = {
                        address_type: "CURRENT",
                        lat: lat,
                        lng: lng,
                        location: response.data.results[0].formatted_address,
                        street_number: title_arr[0],
                        title: title_arr[0],
                      };
                      handleSubmit(obj);
                    } else {
                      await setFieldValue("location", "Address not found");
                    }
                  })
                  .catch((error) => {
                    setFieldValue("location", "Error fetching address");
                    console.error(error);
                  });
              };
              const handleSubmit = (values: any) => {
                setIsLoading(true);
                let _obj = {
                  ...values,
                  title: values?.street_number,
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
              return (
                <Form className="space-y-6  mt-8 ">
                  <div className="space-y-3 flex flex-col w-full justify-center  items-center">
                    {/* <div className=" flex items-end justify-center">
                      <div
                        className={`cursor-pointer`}
                        onClick={() => setFieldValue(`address_type`, "HOME")}
                      >
                        <img
                          src={homeIcon}
                          className={`h-12 w-12 mx-4 ${
                            values?.address_type === "HOME"
                              ? "border-4 rounded-full border-black-700"
                              : null
                          }`}
                        />{" "}
                        <p className="font-semibold">Home</p>
                      </div>
                      <div
                        className={`cursor-pointer `}
                        onClick={() => setFieldValue(`address_type`, "WORK")}
                      >
                        <img
                          src={otherIcon}
                          className={`h-12 w-12 mx-4 ${
                            values?.address_type === "WORK"
                              ? "border-4 rounded-full border-black-700"
                              : null
                          }`}
                        />{" "}
                        <p className="font-semibold">Work</p>
                      </div>
                      <div
                        className={`cursor-pointer `}
                        onClick={() => setFieldValue(`address_type`, "OTHER")}
                      >
                        <img
                          src={WorkIcon}
                          className={`h-12 w-12 mx-4 ${
                            values?.address_type === "OTHER"
                              ? "border-4 rounded-full border-black-700"
                              : null
                          }`}
                        />{" "}
                        <p className="font-semibold">Other</p>
                      </div>
                    </div> 
                    <ErrorMessage
                      name={`address_type`}
                      component={"span"}
                      className="text-xs text-red-100"
                    />*/}
                    
                      <CustomButton
                        handleButtonClick={handleLatLng}
                        icon={<img src={picker} className="" />}
                        label="Use Current Location"
                        type={"button"}
                        isLoading={isLoading}
                        styleClass="btn-black !rounded-lg w-[74%] sm:w-[80%] !mt-8 !gap-6 sm:!gap-2 !flex !justify-center !items-center"
                      />
                   

                    <div className="space-y-2 flex-col items-start hidden">
                      <AutoLocation
                        suburbSelect={async (value: any) => {
                          await setFieldValue(`location`, value?.val);
                          await setFieldValue(`lat`, value?.lat);
                          await setFieldValue(`lng`, value?.lng);
                        }}
                        // label="Business Address*"
                        selectedValue={values.location}
                        // error={errors.location}
                        // isError={!!(errors.location && touched.location)}
                      />
                      <ErrorMessage
                        name={`location`}
                        component={"span"}
                        className="text-xs text-red-100 "
                      />
                    </div>
                    {/* <Input
                      name="street_number"
                      type="street_number"
                      placeholder="House# IX-1175, Street 41"
                      handldChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.street_number}
                      touched={errors.street_number}
                      value={values.street_number}
                    /> */}
                    {/* <CustomButton
                        handleButtonClick={handleLatLng}
                        icon={<img src={location} className="mr-4" />}
                        label="Enter Address"
                        type={"button"}
                        isLoading={isLoading}
                        styleClass="btn-black !rounded-lg w-full !mt-2"
                      /> */}
                    <CustomButton
                      label="Enter Address"
                      icon={<img src={location}  />}
                      type={"button"}
                      isLoading={isLoading}
                      styleClass="btn-white !border-white !rounded-lg w-[74%] sm:w-[80%] !font-semibold !mt-8 pl-12 sm:pl-6 sm:pr-16  lg:pr-20  !flex !justify-between !items-center"
                      handleButtonClick={() => {
                        navigate("/newLocation");
                      }}
                    />
                  </div>
                  <p
                    className="text-[#3667F6] text-sm cursor-pointer "
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Skip for now{" "}
                  </p>
                  <div className="pt-16">
            <p className="text-xs text-gray-900">
              Read our
              <span
                className="text-blue-900 font-medium text-xs pl-1 cursor-pointer"
                onClick={() => {
                  navigate("/TermsAndConditions");
                }}
              >
                Terms & Conditions
              </span>
              <span className="text-gray-900 pr-1 "> &</span>
              <span
                className="text-blue-900 text-xs font-medium cursor-pointer"
                onClick={() => {
                  navigate("/PrivacyPolicy");
                }}
              >
                Privacy Policy
              </span>
            </p>
          </div>
                  {/* <div className="space-y-2">
                      <CustomButton
                        handleButtonClick={handleLatLng}
                        icon={<img src={location} className="mr-4" />}
                        label="Enter Address"
                        type={"button"}
                        isLoading={isLoading}
                        styleClass="btn-black !rounded-lg w-full !mt-2"
                      />
                    </div> */}
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="w-[40%] sm:w-[80%] sm:right-0  sm:absolute sm:bottom-0 md:w-[50%] md:absolute md:bottom-0  ">
          <div className="  text-center    ">
            <SwiperCarousel
              settings={{
                pagination: false,
                navigation: false,
                zoom: false,
                loop: true,
                autoplay: {
                  delay: 2000,
                  disableOnInteraction: false,
                },
              }}
            >
              {loginImages.map((item) => (
                <Slide>
                  <LazyImage src={item.src} alt="" />
                </Slide>
              ))}
            </SwiperCarousel>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default AddLocation;
