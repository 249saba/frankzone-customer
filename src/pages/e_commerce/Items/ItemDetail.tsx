import { useState, useEffect } from "react";
import LazyImage from "@src/shared/lazyImage";
import Shoes from "@assets/images/food/shoes_black.png";
import ImagesList from "@src/shared/sliderImages/ImagesList";
import { DealItemsModel, ItemDetailModel } from "@src/shared/models";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import YelloBg from "@assets/images/gradients/yellow_gradient.svg";
import StarYellow from "@assets/images/icons/star_yellow.png";
import noImage from "@assets/images/NoImage.png";
import rightArrow from "@assets/images/rightArrow.png";
import ClarksIcon from "@assets/images/icons/clarks.png";
import AllReview from "@assets/images/allReview.png";
import PersonIcon from "@assets/images/icons/person.png";
import copyIcon from "@assets/images/icons/copyIcon.png";
import HeartIcon from "@assets/images/icons/heart.svg";
import HeartIconRed from "@assets/images/icons/heart.png";
import { Card, IconButton } from "@mui/material";
import CustomButton from "@src/shared/customButton";
import SeeMore from "@assets/images/icons/see_more.png";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { handleToastMessage } from "@src/shared/toastify";
import Stack from "@mui/material/Stack";
import BackIcon from "@assets/images/icons/arrow_back.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowNextIcon from "@src/shared/icons/arrow-next";
import Popup from "@src/shared/popup/popup";
import Login from "@src/pages/auth/login";
import BackroundImage from "@src/shared/backgroundImage";
import BackgroundItemsList from "@src/pages/BackgroundItemsList";
import ProductItemCard from "@src/shared/cards/productItemCard";

const itemDetail: any = ItemDetailModel.adapt({
  id: 1,
  itemImages: [
    { id: 1, src: Burger_rectangle },
    { id: 2, src: Burger_rectangle },
    { id: 3, src: Burger_rectangle },
  ],
  title: "Zinger Burger With Crispy Fried Chicken",
  rating: 3,
  totalRatings: 400,
  brandIcon: ClarksIcon,
  location: "Berlin, Germany",
  price: 60,
  sizes: [37, 38, 39, 40, 41, 42, 43],
  colors: ["#000", "#964b00"],
  description:
    "Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Am Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores",
});

let dynamicAttributes: any = [];
let selectedAttributes: any = [];
const ItemDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log("params", params);
  const [productDetail, setProductDetail] = useState<any>({
    ProductVariants: [],
  });
  const [productVariantsAttribute, setProductVariantsAttribute] = useState<any>(
    []
  );
  const [singleVariant, setSingleVariant] = useState<any>({});
  const [popuatedImage, setPopuatedImage] = useState<any>("");
  const [itemQuantity, setItemQuantity] = useState<any>(1);
  const [linkReverse, setLinkReverse] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenLoginPopup, setIsOpenLoginPopup] = useState(false);
  const [frequentItems, setFrequentItems] = useState<any>([]);

  useEffect(() => {
    getProductDetail();
    getDeals();
  }, [params?.itemid]);
  const getDeals = () => {
    backendCall({
      url: `/api/user/home/similar_products/${params?.itemid}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setFrequentItems(res?.data);
      }
    });
  };

  const getProductDetail = () => {
    backendCall({
      url: `/api/user/home/product/${params?.itemid}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setProductDetail(res?.data);
        setSingleVariant(res?.data?.DefaultVariant);
        setProductVariantsAttribute(res?.data?.ProductAttributes);
      }
    });
  };
  const handleAddToCart = () => {
    setIsLoading(true);
    const obj = {
      product_variant_id: singleVariant?.id,
      quantity: itemQuantity,
    };
    backendCall({
      url: `/api/user/order/product/add_to_cart`,
      method: "POST",
      data: obj,
    }).then((res: any) => {
      if (res && !res.error) {
        setIsLoading(false);
        handleToastMessage("success", res?.message);
        navigate({
          pathname: "/cartManagement",
          search: `?vendor=${params?.id}&vendorDetail=${params?.vendorid}`,
        });
      } else {
        setIsLoading(false);
        setIsOpenLoginPopup(true);
        if (res?.message === "Invalid token") {
          navigate("/login");
        } else {
          handleToastMessage("error", res?.message);
        }
      }
    });
  };
  const handleVarient = (variant: any) => {
    setSingleVariant(variant);
    setPopuatedImage("");
  };
  const handleImages = (elem: any) => {
    setPopuatedImage(elem);
  };
  const handleAttributes = (
    attributeId: any,
    optionId: any,
    attributes: any
  ) => {
    let obj = {
      product_attribute_id: attributeId,
      product_option_id: optionId,
    };

    if (dynamicAttributes.length) {
      const _index = dynamicAttributes.findIndex(
        (att: any) => att.product_attribute_id === attributeId
      );
      if (_index !== -1) {
        dynamicAttributes[_index].product_option_id = optionId;
        const _dynamicAttributes = dynamicAttributes.slice(0, _index + 1);
        dynamicAttributes = _dynamicAttributes;
      } else {
        dynamicAttributes.push(obj);
      }
    } else {
      dynamicAttributes.push(obj);
    }
    if (selectedAttributes.length) {
      const _index = selectedAttributes.findIndex(
        (att: any) => att.id === attributeId
      );
      if (_index !== -1) {
        selectedAttributes[_index].selected = optionId;
        const _selectedAttributes = selectedAttributes.slice(0, _index + 1);
        selectedAttributes = _selectedAttributes;
      } else {
        selectedAttributes.push({ ...attributes, selected: optionId });
      }
    } else {
      selectedAttributes.push({ ...attributes, selected: optionId });
    }

    backendCall({
      url: `/api/user/home/product/${params?.itemid}/get_attributes`,
      method: "POST",
      data: { attributes: dynamicAttributes },
    }).then((res: any) => {
      if (res && !res.error) {
        let _data = [...selectedAttributes, ...res?.data];
        setProductVariantsAttribute(_data);
        if (!res.data.length) {
          // setProductVariantsAttribute(productDetail?.ProductAttributes);
          handleProductVariants();
        }
      } else {
        handleToastMessage("error", res?.message);
      }
    });
  };
  const handleProductVariants = () => {
    backendCall({
      url: `/api/user/home/product/${params?.itemid}/product_variant`,
      method: "POST",
      data: { attributes: dynamicAttributes },
    }).then((res: any) => {
      if (res && !res.error) {
        dynamicAttributes = [];
        selectedAttributes = [];
        setSingleVariant(res?.data);
        handleToastMessage("success", "variant found successfully");
        setLinkReverse(linkReverse + 1);
      } else {
        dynamicAttributes = [];
        selectedAttributes = [];
        handleToastMessage("error", res?.message);
      }
    });
  };
  const handleFavourite = (id: any) => {
    backendCall({
      url: `/api/user/deal/favourite/${id}`,
      method: "PUT",
    }).then((res: any) => {
      if (res && !res.error) {
        getProductDetail();
        handleToastMessage("success", res?.message);
        setLinkReverse(linkReverse + 1);
      } else {
        if (res?.message === "Invalid token") {
          navigate("/login");
        } else {
          handleToastMessage("error", res?.message);
        }
      }
    });
  };
  const onCopy = () => {
    handleToastMessage("success", "URL Copied.!");
    setLinkReverse(linkReverse + 1);
  };
  const resetCombination = () => {
    dynamicAttributes = [];
    selectedAttributes = [];
    setSingleVariant(productDetail?.DefaultVariant);
    setProductVariantsAttribute(productDetail?.ProductAttributes);
  };
  const handleLoginPopup = () => {
    setIsOpenLoginPopup(false);
  };
  console.log("productDetail", productDetail);
  return (
    <>
      <Stack direction="row" alignItems="start" spacing={2}>
        <LazyImage
          routerLink={`/vendors/${params?.id}/vendorDetail/${params?.vendorid}`}
          className=" h-8 sm:h-6 "
          src={BackIcon}
          alt=""
        />
        <Breadcrumbs
          separator={<ArrowNextIcon height="14" />}
          aria-label="breadcrumb"
        >
          <Link to="/">
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              Home
            </h5>
          </Link>
          <Link to="/">
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              E-commerce
            </h5>
          </Link>
          <p
            onClick={() => {
              navigate(`/vendors/${params?.id}`);
            }}
          >
            <h5
              className={`text-black-900 font-normal hover:underline hover:cursor-pointer `}
            >
              Vendors
            </h5>
          </p>

          <h5
            className={`text-blue-900 font-normal hover:underline hover:cursor-pointer `}
          >
            {productDetail?.name}
          </h5>
        </Breadcrumbs>
      </Stack>
      <div className="flex md:flex-col sm:flex-col gap-8  items-start">
        {/* <Popup
        isOpen={isOpenLoginPopup}
        width={900}
        handleClose={() => handleLoginPopup()}
        isShowHeader={true}
      >
        <Login />
      </Popup> */}
        <div className=" space-y-3  h-[500px] w-[25%] sm:w-full md:w-full sm:h-full md:h-full">
          {singleVariant?.cover_image_url || popuatedImage?.image_url ? (
            <LazyImage
              src={
              
                (popuatedImage?.id
                  ? popuatedImage?.image_url
                  : singleVariant?.cover_image_url)
              }
              alt=""
              className="object-auto h-[400px]   rounded-xl "
            />
          ) : (
            <LazyImage
              src={noImage}
              alt=""
              className="object-auto h-[400px]   rounded-xl "
            />
          )}
          <div className="">
            <ImagesList
              items={singleVariant?.ProductImages || []}
              handleClick={handleImages}
              selectedImageId={popuatedImage?.id}
            />
          </div>
        </div>

        <div className="flex flex-col items-start text-left gap-3 w-[72%] sm:w-[100%]">
          <h3 className="">{productDetail?.name}</h3>
          <div className="w-full">
            <div className="flex justify-between sm:flex-col sm:gap-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/vendors/${params?.id}/vendorDetail/${productDetail?.vendor_id}`
                    )
                  }
                >
                  <LazyImage
                    className="rounded-full w-10 h-10"
                    src={
                      productDetail?.Vendor?.DefaultShop?.image_url
                        ?
                          productDetail?.Vendor?.DefaultShop?.image_url
                        : noImage
                    }
                  />
                  <h5 className="text-black-900 font-medium">
                    {productDetail?.Vendor?.business_name}
                  </h5>{" "}
                </div>
                |
                <div className="flex items-center">
                  <LazyImage width="20px" height="16px" src={StarYellow} />
                  <h6 className="text-gray-900 ml-2">
                    {productDetail?.Vendor?.rating}
                  </h6>
                  <h6 className="text-gray-900 ml-2">
                    ({productDetail?.Vendor?.rating_count})
                  </h6>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <CopyToClipboard text={window.location.href} onCopy={onCopy}>
                  <span>
                    <LazyImage
                      className="max-w-[25px] cursor-pointer"
                      src={copyIcon}
                    />
                  </span>
                </CopyToClipboard>
                <div
                  className="cursor-pointer"
                  onClick={() => handleFavourite(productDetail?.id)}
                >
                  <LazyImage
                    className="max-w-[25px] cursor-pointer"
                    src={productDetail?.is_favourite ? HeartIconRed : HeartIcon}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-900 font-light sm:pt-6">
                {productDetail?.Vendor?.DefaultShop?.address}
              </p>
            </div>
          </div>
          <hr className="border border-gray-800 w-full" />
          <h6 className="text-black-900 font-medium">Price</h6>
          <h3 className="font-medium text-[#F44336]">
          €{singleVariant?.price}
          </h3>
          {/* <hr className="border border-gray-800 w-full mt-4" />
        <h6 className="text-black-900 font-medium">Varients</h6> */}
          {/* <div className="  text-center  w-[100%]  ">
          <SwiperCarousel
            settings={{
              navigation: true,
              zoom: true,
              loop: false,
              pagination: false,
              breakpoints: {
                340: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                660: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              },
            }}
          >
            <Slide className="max-h-[450px]">
              <div
                className={`!w-44 !h-32 ${
                  productDetail?.DefaultVariant?.id === singleVariant?.id
                    ? "border-4 border-green-700 "
                    : "border-0"
                } bg-white !text-green-700  rounded-md flex items-center justify-center`}
                onClick={() => {
                  handleVarient(productDetail?.DefaultVariant);
                }}
              >
                <div className="flex-1">
                  {productDetail?.DefaultVariant?.cover_image_url ? (
                    <LazyImage
                      src={
                        import.meta.env.VITE_REACT_API_URL +
                        "/" +
                        productDetail?.DefaultVariant?.cover_image_url
                      }
                      alt=""
                      className="object-auto w-full h-[120px] mt-[7px]"
                    />
                  ) : (
                    <LazyImage
                      src={noImage}
                      alt=""
                      className="object-auto w-full h-[120px] mt-[7px]"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-1 justify-around items-start ">
                  <div className="ml-2 text-left">
                    <p>
                      {
                        productDetail?.DefaultVariant?.ProductOptions?.[0]
                          ?.AttributeOption?.name
                      }
                    </p>
                    <p>
                      {
                        productDetail?.DefaultVariant?.ProductOptions?.[1]
                          ?.AttributeOption?.name
                      }
                    </p>
                    <p className="text-black-100 font-semibold text-xl">
                      $ {productDetail?.DefaultVariant?.price}
                    </p>
                  </div>
                </div>
              </div>
            </Slide>
            {productDetail?.ProductVariants.map((variant: any, index: any) => (
              <Slide className="max-h-[450px]" key={index}>
                <div
                  className={`!w-44 !h-32 ${
                    variant?.id === singleVariant?.id
                      ? "border-4 border-green-700 "
                      : "border-0"
                  } bg-white !text-green-700  rounded-md flex items-center justify-center`}
                  onClick={() => {
                    handleVarient(variant);
                  }}
                >
                  <div className="flex-1">
                    {variant?.cover_image_url ? (
                      <LazyImage
                        src={
                          import.meta.env.VITE_REACT_API_URL +
                          "/" +
                          variant?.cover_image_url
                        }
                        alt=""
                        className="object-auto w-full h-[120px] mt-[7px]"
                      />
                    ) : (
                      <LazyImage
                        src={noImage}
                        alt=""
                        className="object-auto w-full h-[120px] mt-[7px]"
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 justify-around items-start ">
                    <div className="ml-2 text-left">
                      <p>
                        {variant?.ProductOptions?.[0]?.AttributeOption?.name}
                      </p>
                      <p>
                        {variant?.ProductOptions?.[1]?.AttributeOption?.name}
                      </p>
                      <p className="text-black-100 font-semibold text-xl">
                        $ {variant?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Slide>
            ))}
          </SwiperCarousel>
        </div> */}
          {productVariantsAttribute.length ? (
            <hr className="border border-gray-800 w-full mt-4" />
          ) : null}
          <div className="flex justify-between w-full">
            <div>
              {productVariantsAttribute &&
                productVariantsAttribute.map((attributes: any) => {
                  return (
                    <>
                      <h6 className="text-black-900 font-medium mb-2">
                        {attributes?.VendorAttribute?.name}
                      </h6>
                      <div className="flex items-center gap-3">
                        {attributes?.ProductOptions &&
                          attributes?.ProductOptions.map(
                            (option: any, index: any) => (
                              <p
                                className={`bg-green-800 bg-opacity-10 text-green-700 rounded-full py-1 px-4 cursor-pointer mb-4
                        ${
                          attributes.selected === option?.id
                            ? "border-2  border-green-700"
                            : null
                        } 
                        `}
                                onClick={() =>
                                  handleAttributes(
                                    attributes?.id,
                                    option?.id,
                                    attributes
                                  )
                                }
                              >
                                {option?.AttributeOption?.name}
                              </p>
                            )
                          )}
                      </div>
                    </>
                  );
                })}
            </div>
            {productVariantsAttribute.length ? (
              <div>
                <CustomButton
                  label={"Reset"}
                  handleButtonClick={resetCombination}
                  type={"button"}
                  variant={"outlined"}
                  styleClass={
                    "btn-black px-10 sm:px-6 !rounded-xl !font-medium "
                  }
                />
              </div>
            ) : null}
          </div>
          <hr className="border border-gray-800 w-full mt-4" />
          <h6 className="text-black-900 font-medium">Description</h6>
          <p className="text-black-900 font-light">
            {productDetail?.description}
          </p>
          <div className="flex">
            <div className="mr-8">
              <h6 className="text-black-900 font-medium mb-4">Availability</h6>
              <p
                className={`bg-green-800 bg-opacity-10 text-green-700 rounded-full py-1 px-4 cursor-pointer`}
              >
                {singleVariant?.in_stock ? "In-Stock" : "Out of Stock"}
              </p>
            </div>
            <div>
              <h6 className="text-black-900 font-medium mb-4">Quantity</h6>
              <p
                className={`bg-green-800 bg-opacity-10 text-green-700 rounded-full text-center py-1 px-4 cursor-pointer`}
              >
                {singleVariant?.stock}
              </p>
            </div>
          </div>
          {productDetail?.Vendor?.ActivePlan?.Plan?.can_sell_products ? (
            <>
              <hr className="border border-gray-800 w-full mt-4" />
              <h6 className="text-black-900 font-medium">Quantity</h6>
              <div className="flex items-center justify-between w-2/4 sm:w-full">
                <div className="flex items-center gap-3">
                  <IconButton
                    aria-label="fingerprint"
                    size="small"
                    onClick={() => setItemQuantity((prev: any) => prev + 1)}
                    className={` !w-[35px] !h-[35px] !p-3 !bg-blue-100`}
                  >
                    +
                  </IconButton>
                  <h5 className="font-medium">{itemQuantity}</h5>
                  <IconButton
                    aria-label="fingerprint"
                    size="small"
                    disabled={itemQuantity <= 1}
                    onClick={() => setItemQuantity((prev: any) => prev - 1)}
                    className={` !w-[35px] !h-[35px] !p-3 !bg-blue-100`}
                  >
                    -
                  </IconButton>
                </div>
                <CustomButton
                  label={"Add To Cart"}
                  handleButtonClick={() => handleAddToCart()}
                  type={"submit"}
                  isLoading={isLoading}
                  variant={"outlined"}
                  styleClass={
                    "btn-black px-16 sm:px-6 !rounded-xl !font-medium "
                  }
                />
              </div>
            </>
          ) : null}
        </div>
        {/* <Card className="!bg-gray-600 !shadow-none !rounded-lg   ">
        <div className="flex justify-between items-center !p-4">
          <h5>Rating & Reviews</h5>
          <p className="flex items-center gap-2">
            See all <LazyImage className="h-4 mt-1" src={SeeMore} alt="" />
          </p>
        </div>
        <div className="max-h-[800px] !overflow-y-auto !p-4 space-y-6">
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <LazyImage width="60px" src={PersonIcon} />
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="flex font-medium text-sm">
                  <LazyImage width="20px" height="16px" src={StarYellow} /> 4.0
                </p>
              </div>
              <p className="text-gray-900 font-light text-xs ml-auto">
                08-03-2020
              </p>
            </div>
            <p className="text-black-900 font-light mt-2 text-xs text-left tracking-wide leading-relaxed">
              If you want a true outback experience, or perhaps an experience
              that feels as though you are on Mars, then look no further. If you
              want a true outback experience, or perhaps an experience that
              feels as though you are on Mars, then look no further.
            </p>
          </div>
        </div>
      </Card> */}
      </div>
      <div className="bg-[#757ff25c] h-20 w-full flex justify-start items-center mt-8">
        <div
          className="flex justify-between items-center mx-4 w-full px-12 cursor-pointer"
          onClick={() =>
            navigate(
              `/vendors/${params.id}/vendorDetail/${params.vendorid}/Item/${params.itemid}/reviews/${productDetail?.vendor_id}`
            )
          }
        >
          <div className="flex justify-start items-center ">
            <LazyImage
              src={AllReview}
              alt=""
              className="object-auto h-12 w-auto "
            />
            <p className="ml-4 text-[#7580F2] text-xl">Read All</p>
          </div>
          <LazyImage
            src={rightArrow}
            alt=""
            className="object-auto h-6 w-auto "
          />
        </div>
      </div>
      <BackroundImage
        url={YelloBg}
        classes="relative bg-cover sm:bg-cover md:bg-cover bg-center bg-no-repeat h-full p-8 "
      >
        <div className="flex justify-between items-end   lg:px-12">
          <h3 className="font-semibold text-black-900 flex  lg:items-center">
            Frequently Bought Together
          </h3>
          <h4 className="flex gap-3 text-black-900 items-center font-medium sm:ml-auto">
            <LazyImage className="w-7 h-6" src={SeeMore} alt="" />
          </h4>
        </div>
        <div className="mt-10 flex justify-evenly sm:flex-wrap sm:gap-5 rounded-lg sm:px-3 px-12">
          <div className="  text-center  w-full  ">
            <SwiperCarousel
              settings={{
                pagination: false,
                navigation: true,
                loop: false,
                breakpoints: {
                  340: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  660: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                },
              }}
            >
              {frequentItems.map((item: any, index: number) => (
                <Slide
                  className="max-h-[450px]"
                  key={item.id ? item.id : index}
                >
                  <ProductItemCard
                    items={item}
                    handleClick={(id: any) =>
                      navigate(
                        `/vendors/${params?.id}/vendorDetail/${params?.vendorid}/Item/${id}`
                      )
                    }
                  />
                </Slide>
              ))}
            </SwiperCarousel>
          </div>
        </div>
      </BackroundImage>
    </>
  );
};

export default ItemDetail;
