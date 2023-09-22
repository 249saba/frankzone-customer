import { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import CustomCard from "@src/shared/cards/customCard";
import { ReactComponent as Logo_blue } from "@assets/logo_blue.svg";
import BackroundImage from "@src/shared/backgroundImage";
import HomeBg from "@assets/images/home_bg.png";
import CustomButton from "@src/shared/customButton";
import { ReactComponent as Fb } from "@assets/icons/facebook_blue.svg";
import { ReactComponent as Google_blue } from "@assets/icons/google_blue.svg";

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

interface IloginImages {
  id: number;
  src: string;
}

export interface initialSchemaValues {
  email: string;
}

const loginImages: IloginImages[] = [
  { id: 1, src: Consultation },
  { id: 2, src: Ecommerce },
  { id: 3, src: handyman },
  { id: 4, src: Food },
];

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .label("Email"),
});

const initialValues: initialSchemaValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const register = (type: string) => {
    navigate(`/${type}`);
  };

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    console.log("ForgotPassword ==", values);
    backendCall({
      url: `/api/user/send_reset_password/${values?.email}`,
      method: "PATCH",
      data: values,
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(res);
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        // navigate("/resetPassword");
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  return (
    <ContentContainer styleClass="login-bg-gradient !h-screen !px-0 !pb-0">
      <div className="flex md:flex-col justify-between items-end h-full gap-16 ">
        <div className="w-[30%] md:w-[50%] sm:z-50 md:z-50 sm:w-[80%] mx-auto !mb-auto ">
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5 my-8"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <h5 className="font-bold text-center sm:text-xl">Forgot Password</h5>
          <p className="text-gray-900"> Enter your email address we'll send</p>
          <p className="text-gray-900"> you a link to reset your password</p>

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

                  <CustomButton
                    label="Send Link"
                    type={"submit"}
                    isLoading={isLoading}
                    styleClass="btn-black !rounded-lg w-full !mt-8"
                  />
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

export default ForgotPassword;
