
import CustomCard from "@src/shared/cards/customCard";
import LazyImage from "@src/shared/lazyImage";
import PersonIcon from "@assets/vendor/icons/person.png";
import React, { useState, useEffect } from "react";
import { Form, Formik, useFormik } from "formik";
import CustomButton from "@src/shared/customButton";
import Input from "@src/shared/input";
import ImagePicker from "@src/shared/imagePicker/imagePicker";
import { ReactComponent as PencilIcon } from "@assets/icons/red-pencil.svg";
import { STORAGE } from "@src/shared/const";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { handleToastMessage } from "@src/shared/toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export interface initialSchemaValues {
current_password:string,
  new_password: string;
  confirm_password: string;
}
const FormSchema = Yup.object().shape({
  current_password: Yup.string().required("Password is required"),
  new_password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("new_password"), null], "Password must match"),
});
const _initialValues1 = {
  image: [],
  first_name: "",
  last_name: "",
  email: "",
};
const _initialValues2 = {
  current_password:"",
  new_password: "",
  confirm_password: "",
};
const ChangePassword = () => {
  const [avatar, setAvatar] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [initialValues1, setInitialValues1] = useState(_initialValues1);
  const [initialValues2, setInitialValues2] = useState(_initialValues2);
  const _data: any = localStorage.getItem(STORAGE);
  const navigate = useNavigate();
//   useEffect(() => {

//     const data = JSON.parse(_data);
//     let initialData = {
//       image: data?.image_url,
//       first_name: data?.first_name,
//       last_name: data?.last_name,
//       email: data?.email,
//     };
//     setInitialValues1(initialData);
//     console.log("localStorage.getItem(STORAGE) ==", data);
//   },[_data]);

  const handleSubmit2 = (_values: any) => {
    console.log("profile Form 2 ==", _values);
    setIsLoading2(true);
    const formData = new FormData();
    formData.append("current_password", _values?.current_password);
    formData.append("new_password", _values?.new_password);
   
    backendCall({
      url: "/api/user/update_password",
      method: "PUT",
      data: formData,
    }).then((res) => {
      if (res && !res.error) {
        console.log(res);
        setIsLoading2(false);
        handleToastMessage("success", res?.message);
      navigate("/")
      } else {
        setIsLoading2(false);
        handleToastMessage("error", res?.message);
      }
    });
  };


  return (
  <Formik
        initialValues={initialValues2}
        enableReinitialize
        validationSchema={FormSchema}
        onSubmit={handleSubmit2}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          touched,
          values,
          setFieldTouched,
          setFieldValue,
          setValues,
        }) => {
          return (
            <Form className="space-y-6" autoComplete="off">
              <CustomCard styleClass="p-4">
                <div className="text-left">
                  <h4>Change Password</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 justify-between  text-left mt-4">
                <Input
                    id="current_password"
                    name="current_password"
                    type="password"
                    variant="outline"
                    placeholder="Enter Current Password"
                    handldChange={handleChange}
                    onBlur={handleBlur}
                    value={values.current_password}
                    error={errors.current_password}
                    touched={touched.current_password}
                  />
                  <Input
                    id="new_password"
                    name="new_password"
              
                    type="password"
                    variant="outline"
                    placeholder="Enter New Password"
                    handldChange={handleChange}
                    onBlur={handleBlur}
                    value={values.new_password}
                    error={errors.new_password}
                    touched={touched.new_password}
                  />
                   <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    variant="outline"
                    placeholder="Enter Confirm Password"
                    handldChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                    error={errors.confirm_password}
                    touched={touched.confirm_password}
                  />
                </div>

                <div className=" text-right mt-4">
                  <CustomButton
                    isLoading={isLoading2}
                    type={"submit"}
                    label={"Update"}
                    styleClass="btn-black !rounded-md"
                  />
                </div>
              </CustomCard>
            </Form>
          );
        }}
      </Formik>
  
  );
};

export default ChangePassword;
