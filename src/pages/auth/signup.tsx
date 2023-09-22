import { useState } from "react";
import CustomCard from "@src/shared/cards/customCard";
import { ReactComponent as Logo_blue } from "@assets/logo_blue.svg";
import BackroundImage from "@src/shared/backgroundImage";
import HomeBg from "@assets/images/home_bg.png";
import CustomButton from "@src/shared/customButton";
import { ReactComponent as Fb } from "@assets/icons/facebook_blue.svg";
import { ReactComponent as Google_blue } from "@assets/icons/google_blue.svg";
import apple_icon from "@assets/icons/apple_icon.png";

import * as Yup from "yup";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { addUpdateUser } from "../e_commerce/chat";
import GoogleAuth from "@src/shared/socialLogin/googleLogin";
import FacebookAuth from "@src/shared/socialLogin/facebookLogin";
import AppleAuth from "@src/shared/socialLogin/appleLogin";

interface ISignupImages {
  id: number;
  src: string;
}

export interface initialSchemaValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const loginImages: ISignupImages[] = [
  { id: 1, src: Consultation },
  { id: 2, src: Ecommerce },
  { id: 3, src: handyman },
  { id: 4, src: Food },
];

const FormSchema = Yup.object().shape({
  email: Yup.string().email().label("Email").required(),
  password: Yup.string().min(8).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const initialValues: initialSchemaValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const register = (type: string) => {
    navigate(`/${type}`);
  };

  const handleSubmit = (values: any) => {
    console.log("sign up ==", values);
    const obj = {
      email: values?.email,
      password: values?.password,
    };
    backendCall({
      url: "/api/user",
      method: "POST",
      data: obj,
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(res);
        let dataSet = res.data;
        // dataSet.isLoggedIn = true;
        if (dataSet.email) {
          let _userFirebaseData = {
            id: dataSet.id + "_customer",
            userEmail: dataSet.email,
            online: true,
            userDisplayName: `${dataSet.name}`,
            userPhotoUrl: dataSet.image_url ? dataSet.image_url : "",
          };
          addUpdateUser(_userFirebaseData);
        }
        SetStorage(dataSet);
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        navigate("/sendOTP");
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  const handleAuthData = async (loginData: any) => {
    console.log("loginData ==", loginData);
    const formData = new FormData();
    // setIsLoading(true);
    formData.append("apiType", "register");
    let plan_id = Number(localStorage.getItem("plan_id"));
    let module_id = Number(localStorage.getItem("moduleId"));
    formData.append("social_media_token", loginData.social_media_token);
    formData.append("social_media_platform", loginData.social_media_platform);
    formData.append("email", loginData.email);
    formData.append("module_id", JSON.stringify(module_id));
    formData.append("plan_id", JSON.stringify(plan_id));

    backendCall({
      url: "/api/user/social_login",
      method: "POST",
      data: formData,
    }).then((res) => {
      if (res && !res.error) {
        let dataSet = res.data;
        dataSet.isLoggedIn = true;
        console.log("dataSet", dataSet);
        if (dataSet.email) {
          let _userFirebaseData = {
            id: dataSet.id + "_customer",
            userEmail: dataSet.email,
            online: true,
            userDisplayName: `${dataSet.name}`,
            userPhotoUrl: dataSet.image_url ? dataSet.image_url : "",
          };
          addUpdateUser(_userFirebaseData);
        }
        SetStorage(dataSet);
        setIsLoading(false);
        handleToastMessage("success", res?.message);

        navigate("/addLocation");
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  return (
    <ContentContainer styleClass="login-bg-gradient !h-full  !px-0 !pb-0">
      <div className="flex md:flex-col justify-between items-end h-full gap-16 ">
        <div className="w-[30%] md:w-[50%] sm:z-50 md:z-50 sm:w-[80%] mx-auto !mb-auto ">
          <h5 className="font-bold text-center sm:text-xl">Sign Up</h5>
          <p className="text-gray-900"> Create your account</p>

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
              <Form className="space-y-6  mt-8 ">
                <div className="space-y-3">
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    handldChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email}
                    touched={errors.email}
                  />

                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    handldChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={errors.password}
                    value={values.password}
                  />

                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    handldChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    touched={errors.confirmPassword}
                    value={values.confirmPassword}
                  />

                  <CustomButton
                    label="Sign Up"
                    type={"submit"}
                    styleClass="btn-black !rounded-lg w-full !mt-8"
                  />

                  <p className="flex items-start gap-6 whitespace-nowrap text-xs !my-8 sm:!my-4  ">
                    <SeperatorLine className="rotate-10 w-full" /> Or sign in
                    with
                    <SeperatorLine className="rotate-10 w-full" />
                  </p>
                  <div className="flex flex-col gap-6 sm:gap-2 ">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-2 sm:flex sm:items-center">
                      <GoogleAuth
                        className="btn-white justify-start text-center !font-medium  !rounded-lg w-full !border-none !shadow-none"
                        handleAuthData={handleAuthData}
                      />
                      <FacebookAuth
                        className="btn-white justify-start text-center !font-medium  !rounded-lg w-full !border-none !shadow-none"
                        handleAuthData={handleAuthData}
                      />
                      <AppleAuth
                        className="btn-white justify-start text-center !font-medium  !rounded-lg w-full !border-none !shadow-none"
                        handleAuthData={handleAuthData}
                      />
                      {/* <CustomButton
                        icon={<Google_blue />}
                        labelClass="w-full sm:hidden"
                        label="Google"
                        type={"submit"}
                        styleClass="btn-white justify-start text-center !text-black-100 !font-medium  !rounded-lg w-full !border-none !shadow-none"
                      />
                      <CustomButton
                        icon={<Fb />}
                        labelClass="w-full sm:hidden"
                        label="Facebook"
                        type={"submit"}
                        styleClass="btn-white justify-start text-center !font-medium  !rounded-lg w-full !border-none !shadow-none"
                      />
                      <CustomButton
                        icon={<img src={apple_icon} className="w-8 h-8" />}
                        labelClass="w-full sm:hidden"
                        label="Apple"
                        type={"submit"}
                        styleClass="btn-white justify-start text-center !font-medium !rounded-lg w-full !border-none !shadow-none"
                      /> */}
                    </div>

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
                </div>
              </Form>
            )}
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

export default SignUp;
