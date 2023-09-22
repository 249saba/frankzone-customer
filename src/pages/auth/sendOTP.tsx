import { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import CustomCard from "@src/shared/cards/customCard";
import { ReactComponent as Logo_blue } from "@assets/logo_blue.svg";
import BackroundImage from "@src/shared/backgroundImage";
import HomeBg from "@assets/images/home_bg.png";
import CustomButton from "@src/shared/customButton";
import Phone_Icon from "@assets/icons/Phone_Icon.png";
import { ReactComponent as Google_blue } from "@assets/icons/google_blue.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import * as Yup from "yup";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { StorageI } from "@src/shared/interfaces";
import { SetStorage } from "@src/shared/utils/authService";
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

interface IloginImages {
  id: number;
  src: string;
}

export interface initialSchemaValues {
  phone: string;
}

const loginImages: IloginImages[] = [
  { id: 1, src: Consultation },
  { id: 2, src: Ecommerce },
  { id: 3, src: handyman },
  { id: 4, src: Food },
];

const FormSchema = Yup.object().shape({
  phone: Yup.string().min(10).required("Please enter your phone number"),
});

const initialValues: initialSchemaValues = {
  phone: "",
};

const SendOTP = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setIsLoading(true);

    backendCall({
      url: `/api/user/send_otp`,
      method: "POST",
      data: values,
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(res);
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        navigate(`/verifyOTP/${values?.phone}`);
        console.log("SendOTP ==", values);
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  return (
    <ContentContainer styleClass="login-bg-gradient !h-screen !px-0 !pb-0">
      <div className="flex md:flex-col justify-between items-end h-full gap-16 ">
        <div className="w-[30%] md:w-[50%] sm:z-50 md:z-50 sm:w-[80%] mx-auto !mb-auto flex h-full flex-col justify-between">
          <div>
            <div className="flex justify-center">
              <LazyImage src={Phone_Icon} alt="" className="h-16 w-16" />
            </div>
            <h5 className="font-bold text-center sm:text-xl">Verification</h5>
            <p className="text-gray-900">
              We will send you a one time password{" "}
            </p>
            <p className="text-gray-900"> on this mobile number</p>

            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                handleChange,
                handleBlur,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form className="space-y-6  mt-8 flex flex-col items-center justify-center ">
                  <div className="space-y-3">
                    <div className="space-y-2 space-x-5">
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        isValidPhoneNumber={true}
                        // defaultCountry="PK"
                        className="h-12 w-72  border border-gray-900 rounded-[4px] bg-white pl-4 pr-9 PhoneInputInput text-black-900 text-[14px]"
                        placeholder="Enter your phone number"
                        onChange={(event) => {
                          if (event) {
                            setFieldValue("phone", event);
                          }
                        }}
                        value={values.phone}
                      />
                      <ErrorMessage
                        name={`phone`}
                        component={"span"}
                        className="text-xs text-red-100 pt-1"
                      />
                    </div>

                    <CustomButton
                      label="Get OTP"
                      type={"submit"}
                      isLoading={isLoading}
                      styleClass="btn-black !rounded-lg w-full !mt-8"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="mb-10">
          <p className="text-xs text-gray-900">
                      Read our
                      <span
                        className="text-blue-900 font-medium text-xs pl-1 cursor-pointer"
                      onClick={()=>{navigate("/TermsAndConditions")}}
                      >
                        Terms & Conditions
                      </span>
                      <span className="text-gray-900 pr-1 ">&</span>
                      <span
                        className="text-blue-900 text-xs font-medium cursor-pointer"
                        onClick={()=>{navigate("/PrivacyPolicy")}}
                      >
                        Privacy Policy
                      </span>
                    </p>
          </div>
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

export default SendOTP;
