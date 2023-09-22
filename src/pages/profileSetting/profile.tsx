import { useEffect, useState } from "react";
import { CartItemsModel } from "@src/shared/models";
import ClarksIcon from "@assets/images/icons/clarks.png";
import LockIcon from "@assets/icons/lock.png";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import CustomCard from "@src/shared/cards/customCard";
import Checkbox from "@src/shared/checkbox/checkbox";
import CustomButton from "@src/shared/customButton";
import noImage from "@assets/images/NoImage.png";
import Seperator from "@src/shared/seperator/seperatorDashed";
import LazyImage from "@src/shared/lazyImage";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import CartButtons from "@src/shared/cartButtons";
import SeperatorDashed from "@src/shared/seperator/seperatorDashed";
import SeperatorLine from "@src/shared/seperator/seperatorLine";
import { useNavigate } from "react-router-dom";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { Form, Formik, useFormik } from "formik";
import { ReactComponent as PencilIcon } from "@assets/icons/red-pencil.svg";
import Popup from "@src/shared/popup/popup";
import PaymentForm from "@src/shared/loadStripe/loadStripe";
import StripeElement from "@src/shared/loadStripe";
import { STORAGE } from "@src/shared/const";
import ImagePicker from "@src/shared/imagePicker/imagePicker";
import { handleToastMessage } from "@src/shared/toastify";
import Divider from "@mui/material/Divider";
import Input from "@src/shared/input";
import { addUpdateUser } from "../e_commerce/chat";
import { UploadFileS3Bucket } from "@src/shared/s3Bucket/index.js";
import { ModuleType } from "@src/shared/enum";

const cartItems: any = CartItemsModel.adapt([
  {
    id: 1,
    title: "Food",
    items: [
      {
        id: 1,
        title: "Zinger Burger With Cheez",
        dealType: "combo",
        price: 60,
        brandIcon: ClarksIcon,
        location: "Berlin, Germany",
        restaurantName: "kfc",
        pickupType: "delivery",
        items: 2,
        itemImage: Burger_rectangle,
      },
      {
        id: 2,
        title: "Zinger Burger With fries",
        dealType: "combo",
        price: 50,
        brandIcon: ClarksIcon,
        location: "Berlin, Germany",
        restaurantName: "kfc",
        pickupType: "delivery",
        items: 2,
        itemImage: Burger_rectangle,
      },
    ],
  },
  {
    id: 2,
    title: "e-commerce",
    items: [
      {
        id: 1,
        title: "Zinger Burger With Cheez",
        dealType: "combo",
        price: 60,
        brandIcon: ClarksIcon,
        location: "Berlin, Germany",
        restaurantName: "kfc",
        pickupType: "delivery",
        items: 2,
        itemImage: Burger_rectangle,
      },
    ],
  },
]);
const _initialValues1 = {
  image: '',
  first_name: "",
  email: "",
};
const Profile = () => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartPrice, setCartPrice] = useState<any>([]);
  const [avatar, setAvatar] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [initialValues1, setInitialValues1] = useState(_initialValues1);
  const _data: any = localStorage.getItem(STORAGE);
  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(_data);
    let initialData = {
      image: data?.image_url,
      first_name: data?.name,
      email: data?.email,
    };
    setInitialValues1(initialData);
    console.log("localStorage.getItem(STORAGE) ==", data);
  }, [_data]);
  useEffect(() => {
    getCartDetail();
    getCartPrice();
  }, []);
  const getCartDetail = () => {
    backendCall({
      url: `/api/user/order/cart_information`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        console.log("get cart ==", res?.data);
        setCartItems(res?.data);
      }
    });
  };
  const handleSubmit1 = (_values: any) => {
 
    setIsLoading1(true);
    const formData = new FormData();
    if (typeof _values.image !== "string" && _values.image?.[0] !== undefined) {
      formData.append("name", _values?.first_name);
      _values.image.forEach((file: any) => {
        formData.append(`image`, file);
      });
    } else {
      formData.append("name", _values?.first_name);
      formData.append(`image`, _values?.image);
      // formData.append("last_name", _values?.last_name);
    }
    backendCall({
      url: "/api/user/update_profile",
      method: "PUT",
      data: formData,
      contentType: "multipart/form-data;",
    }).then((res) => {
      if (res && !res.error) {
        const _data: any = localStorage.getItem(STORAGE);
        const data = JSON.parse(_data);
        const storageData = {
          ...data,
          ...res?.data,
        };
        localStorage.setItem(STORAGE, JSON.stringify(storageData));
        let dataSet = res.data;
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
        console.log(res);
        setIsLoading1(false);
        handleToastMessage("success", res?.message);
        navigate("/");
      } else {
        setIsLoading1(false);
        handleToastMessage("error", res?.message);
      }
    });
    console.log("profile Form 1==", _values);
  };
  const getCartPrice = () => {
    backendCall({
      url: `/api/user/order/cart/price`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        console.log(" cart price ==", res?.data);
        setCartPrice(res?.data);
      }
    });
  };
  const handleUploadClick = async (files: any, setFieldValue: any) => {
    const s3File: any = await UploadFileS3Bucket(files, ModuleType?.Profile);
    console.log("s3File ==", s3File);
    const fileReader: any = new FileReader();
    const myFiles = Array.from(files);
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setAvatar(s3File);
      }
    };
    setFieldValue("image", s3File);
    fileReader.readAsDataURL(files[0]);
    // onUploadImage(myFiles);
  };
  return (
    <div className="gap-8 ">
      <div className="flex flex-col w-full gap-8">
        {/* <CustomCard styleClass="p-6">
          <div className="flex items-center">
            <Checkbox name="selected_items" />
            <h5> Selected Items (2)</h5>
          </div>
        </CustomCard> */}

        <div className="flex flex-col gap-8 ">
          <CustomCard styleClass="text-left pt-6 !w-[98%]">
            <h6 className=" text-black-700 font-medium  px-5">
              Profile Setting
            </h6>
            <SeperatorLine className="!border-gray-800 px-3"></SeperatorLine>
            <Formik
              initialValues={initialValues1}
              enableReinitialize
              // validationSchema={FormSchema1}
              onSubmit={handleSubmit1}
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
                    <div className="flex gap-2 px-4 h-80 items-center">
                      <div className="border-r-2 w-[25%] h-80 px-8 ">
                        <ImagePicker
                          className="flex"
                          error={errors.image as string}
                          value={values.image}
                          resetValue={() => {
                            setFieldValue("image", []);
                          }}
                          removeImage={(index) => {
                            const temp_profile: any = values.image;
                            temp_profile.splice(index, 1);
                            setFieldValue("image", temp_profile);
                          }}
                          onChange={(files) => {
                            setFieldTouched("image", true);
                            return handleUploadClick(files, setFieldValue);
                          }}
                          onSizeError={(error) => {
                            handleToastMessage(
                              "error",
                              "please select image of size less than 10mb"
                            );
                          }}
                          touched={true}
                        >
                          <div className="relative">
                            <div className="absolute top-40 left-28 bg-white p-3 rounded-full border-2 cursor-pointer">
                              <PencilIcon />
                            </div>
                            {!avatar ? (
                              <LazyImage
                                src={values?.image ?? ''}
                                className="h-40 w-40 mt-14  border-2 rounded-full"
                              />
                            ) : (
                              <LazyImage
                                src={avatar}
                                className="h-40 w-40 mt-14  border-2 rounded-full"
                              />
                            )}
                          </div>
                        </ImagePicker>
                      </div>
                      {/* <Divider orientation="vertical" flexItem/> */}
                      <div className="flex flex-col w-[70%] p-4 gap-3">
                        <Input
                          id="first_name"
                          name="first_name"
                          type="text"
                          variant="outline"
                          placeholder="Name"
                          handldChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_name}
                          error={errors.first_name}
                          touched={touched.first_name}
                        />
                        <Input
                          id="email"
                          name="email"
                          type="text"
                          variant="outline"
                          placeholder="email"
                          handldChange={handleChange}
                          readOnly
                          onBlur={handleBlur}
                          value={values.email}
                          error={errors.email}
                          touched={touched.email}
                          rightIcon={
                            <LazyImage src={LockIcon} className="w-4 h-4" />
                          }
                        />
                        <div className="flex justify-end items-end mt-5">
                          <CustomButton
                            isLoading={isLoading1}
                            type={"submit"}
                            label={"Update"}
                            styleClass="btn-black !rounded-md"
                          />
                        </div>
                        <div className="flex justify-end items-end mt-5">
                          <CustomButton
                            type={"button"}
                            label={"Change Password"}
                            styleClass="btn-black !rounded-md"
                            handleButtonClick={() => {
                              navigate("/ChangePassword");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </CustomCard>
        </div>
        {/* {cartItems.map((item: CartItemsModel, index: number) => (
          <div className="flex flex-col gap-8">
            <CustomCard styleClass="p-6 ">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <Checkbox
                    id={String(item.id)}
                    key={index}
                    name={String(item.id)}
                  />
                  <h5 className=" capitalize">{item.title} Items</h5>
                  <CustomButton
                    label="Delete"
                    styleClass="btn-red !rounded-md !h-auto !py-2  ml-auto"
                    type={"button"}
                  />
                </div>
                <Seperator className="mt-0" />
                {item.items.map((itemDetail: any, index: number) => (
                  <div className="flex flex-col gap-4 ">
                    <div className="flex sm:flex-col ">
                      <div className="flex sm:flex-col items-start gap-3">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={String(itemDetail.title)}
                            key={index}
                            name={String(itemDetail.title)}
                          />
                          <LazyImage
                            className="w-[120px] h-[130px] sm:[w-80px] sm:h-[80px] rounded-lg"
                            src={Burger_rectangle}
                          />
                        </div>
                        <div>
                          <div className="flex text-left flex-col items-start">
                            <h6 className="font-medium">
                              Zinger Burger With Cheez
                            </h6>
                            <p className="text-gray-900">Combo</p>
                            <h5 className="mt-2 font-medium">$60</h5>
                            <div className="flex  items-start  gap-2 mt-2">
                              <LazyImage
                                className="w-[20px] h-[20px]"
                                src={ClarksIcon}
                              />
                              <p className="font-medium text-black-900 flex items-center gap-2">
                                KFC |
                                <p className="font-normal text-xs text-gray-900">
                                  Berlin, Germany
                                </p>{" "}
                              </p>
                            </div>
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
                          <span className="text-xs text-green-900 ">
                            Delivery
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-4 sm:mt-2">
                          <p className="font-medium text-black-900">
                            Estimated Delivery
                          </p>
                          <p className="text-blue-900"> 40 Min</p>
                        </div>
                        <CartButtons className="mt-5 sm:mt-2" noOfItems={1} />
                      </div>
                    </div>
                    {index !== item?.items?.length - 1 && (
                      <SeperatorLine className="!mt-0 mb-2" />
                    )}
                  </div>
                ))}
              </div>
            </CustomCard>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Profile;
