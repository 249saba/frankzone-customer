import { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import CustomButton from "@src/shared/customButton";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "@src/containers/contentContainer";
import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import Security_Icon from "@assets/icons/Security_Icon.png";
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
  otp: string;
}

const loginImages: IloginImages[] = [
  { id: 1, src: Consultation },
  { id: 2, src: Ecommerce },
  { id: 3, src: handyman },
  { id: 4, src: Food },
];

const FormSchema = Yup.object().shape({
  otp: Yup.string().required("Please enter your otp"),
});

const initialValues: initialSchemaValues = {
  otp: "",
};

const verifyOTP = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setIsLoading(true);
    console.log("SendOTP ==", values);
    backendCall({
      url: `/api/user/verify_otp`,
      method: "POST",
      data: values,
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(res);
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        navigate("/addLocation");
      } else {
        setIsLoading(false);
        handleToastMessage("error", res?.message);
      }
    });
  };
  const handleResendOtp = (values: any) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("phone", values);

    backendCall({
      url: `/api/user/send_otp`,
      method: "POST",
      data: formData,
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(res);
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        // navigate(`/verifyOTP/${values}`);
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
        <div className="w-[30%] md:w-[50%] sm:z-50 md:z-50 sm:w-[80%] mx-auto !mb-auto flex h-full flex-col justify-between items-center">
          <div>
            <div className="flex justify-center">
              <LazyImage src={Security_Icon} alt="" className="h-16 w-16" />
            </div>
            <h5 className="font-bold text-center sm:text-xl">
              OTP Verification
            </h5>
            <p className="text-gray-900">Enter the OTP send to </p>
            <p className="text-[#3667F6] text-sm">{params?.id} </p>

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
                  <div className="space-y-3 ">
                    <div className="space-y-2 ">
                      <OtpInput
                        value={values.otp}
                        inputType={"number"}
                        onChange={(event: any) => {
                          console.log("event ==", event);
                          if (event) {
                            setFieldValue("otp", event);
                          }
                        }}
                        numInputs={6}
                        inputStyle={`focus:outline-transparent bg-white border-2 flex  border-black-900 text-2xl font-normal text-black-900 rounded-lg !h-14 !w-14 sm:!w-10 sm-!h-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
                        renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
                        renderInput={(props: any) => <input {...props} />}
                      />
                      <ErrorMessage
                        name={`otp`}
                        component={"span"}
                        className="text-xs text-red-100 pt-1"
                      />
                    </div>

                    <CustomButton
                      label="Verify & Proceed"
                      type={"submit"}
                      isLoading={isLoading}
                      styleClass="btn-black !rounded-lg w-full !mt-8"
                    />
                    <div>
                      <span className="text-gray-900 pt-3">
                        Didn't received the OTP?{" "}
                      </span>
                      <span
                        className="text-[#3667F6] text-sm cursor-pointer"
                        onClick={() => {
                          handleResendOtp(params?.id);
                        }}
                      >
                        Resend OTP
                      </span>
                      <p
                        className="text-[#3667F6] text-sm cursor-pointer"
                        onClick={() => {
                          navigate("/sendOTP");
                        }}
                      >
                        Change number{" "}
                      </p>
                    </div>
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

export default verifyOTP;
