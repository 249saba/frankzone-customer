import LazyImage from "@src/shared/lazyImage";
import HomeBg from "@assets/images/home_bg.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryWiseVendor from "@src/pages/e_commerce/vendors/categoryWiseVendor";
import SwiperCarousel, { Slide } from "@src/shared/swiperCarousel";
import VendorItemCard from "@src/shared/cards/vendorItemCard ";

const CategoryModule = ({ categoryData, categoryId }: any) => {
  // const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();
  const [vendorsItems, setVendorsItems] = useState<any>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  // useEffect(() => {
  //   getModuleCategory();
  // }, [categoryId, limit]);
  // const getModuleCategory = () => {
  //   backendCall({
  //     url: `/api/user/home/module/${categoryId}/categories?limit=${limit}`,
  //     method: "GET",
  //   }).then((res: any) => {
  //     if (res && !res.error) {
  //       setCategoryData(res?.data?.rows);
  //     }
  //   });
  // };
  useEffect(() => {
    // setSelectedCategoryId(categoryData[0]?.id);
    getVendors();
  }, [categoryData]);
  const getVendors = () => {
    backendCall({
      url: `/api/user/home/module/${categoryId}/vendors`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setVendorsItems(res?.data?.rows);
      }
    });
  };
  return (
    <>
      <div className="flex w-full flex-wrap ">
        <div className="  text-center  w-full  ">
          <SwiperCarousel
            settings={{
              pagination: false,
              navigation: true,
              loop: false,
              breakpoints: {
                340: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                660: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 9,
                  spaceBetween: 10,
                },
              },
            }}
          >
            {categoryData.map((item: any, index: number) => (
              <Slide key={item.id ? item.id : index}>
                <div
                  key={index}
                  onClick={() =>
                    // navigate(`/vendors/${categoryId}/categoryWiseVendor/${item?.id}`)
                    setSelectedCategoryId(item?.id)
                  }
                  className={`pt-4 cursor-pointer`}
                >
                  <LazyImage
                    src={
                      item.web_image_url
                    }
                    alt=""
                    className={`${
                      selectedCategoryId === item?.id
                        ? "border-4  border-yellow-800"
                        : null
                    } w-[139px] h-40 mx-2 rounded-md`}
                    caption={
                      <p className="opacity-90 text-black-100 text-sm pt-1">
                        {item.name}
                      </p>
                    }
                  />
                </div>
              </Slide>
            ))}
          </SwiperCarousel>
        </div>
      </div>
      {selectedCategoryId ? (
        <div className="space-y-5 mt-4">
          <CategoryWiseVendor
            selectedCategoryId={selectedCategoryId}
            categoryId={categoryId}
          />
        </div>
      ) : null}
      {!selectedCategoryId ? (
        <>
          <div className="flex justify-between items-start sm:flex-col sm:items-start">
            <h3 className="font-bold text-black-900 italic flex  items-center mt-4">
              SHOPS
            </h3>
          </div>
          {vendorsItems.length ? (
            <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-2  gap-10  justify-start items-end">
              {vendorsItems.map((item: any) => (
                <VendorItemCard items={item} categoryId={categoryId}/>
              ))}
            </div>
          ) : (
            <div className="text-3xl text-gray-500 italic flex justify-center">
              No Data Found
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default CategoryModule;
