import { useState, useEffect } from "react";
import ClarksIcon from "@assets/images/icons/clarks.png";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import CustomCard from "@src/shared/cards/customCard";
import Checkbox from "@src/shared/checkbox/checkbox";
import LazyImage from "@src/shared/lazyImage";
import HeartIcon from "@assets/images/icons/heart.png";
import { useNavigate } from "react-router-dom";
import noImage from "@assets/images/NoImage.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { handleToastMessage } from "@src/shared/toastify";
import BasicPagination from "@src/shared/pagination";

const FavouritesList = () => {
  const navigate = useNavigate();
  const [favouriteList, setFavouriteList] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  useEffect(() => {
    getCartDetail(0);
  }, []);
  const getCartDetail = (pageNumber: any) => {
    backendCall({
      url: `/api/user/home/favourite?limit=10&offset=${pageNumber}&order=desc`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setFavouriteList(res?.data?.rows);
        setRecordCount(Math.ceil(res?.data?.count / 10));
      }
    });
  };
  const handleFavourite = (id: any) => {
    backendCall({
      url: `/api/user/deal/favourite/${id}`,
      method: "PUT",
    }).then((res: any) => {
      if (res && !res.error) {
        getCartDetail(0);
        handleToastMessage("success", res?.message);
      }
    });
  };
  const handleChangePage = (pageNumber: any) => {
    getCartDetail(pageNumber - 1);
  };
  return (
    <div className="flex flex-col  gap-8  ">
      {favouriteList.map((favourite: any) => (
        <CustomCard styleClass="p-6 w-full">
          <div className="flex flex-col gap-4 ">
            <div className="flex sm:flex-col ">
              <div className="flex sm:flex-col items-start gap-3">
                <div className="flex items-start gap-3">
                  {/* <Checkbox id="1" key={1} name="1" /> */}
                  <LazyImage
                    className="w-[200px] h-[200px] sm:[w-60px] sm:h-[120px] rounded-lg object-cover"
                    src={
                      favourite?.Product?.DefaultVariant?.cover_image_url
                        ? 
                          favourite?.Product?.DefaultVariant?.cover_image_url
                        : noImage
                    }
                  />
                </div>
                <div>
                  <div className="flex text-left flex-col items-start">
                    <h5 className="font-medium">{favourite?.Product?.name}</h5>
                    <h3 className="mt-2 font-medium">
                    €{favourite?.Product?.DefaultVariant?.price}
                    </h3>
                    <div className="flex  items-start  gap-2 mt-2 absolute md:bottom-7 lg:bottom-7 sm:bottom-4">
                      <LazyImage
                        className=" h-[30px]"
                        src={
                          favourite?.Product?.Vendor?.image_url
                            ? 
                              favourite?.Product?.Vendor?.image_url
                            : noImage
                        }
                      />
                      <h5 className="font-medium text-black-900 flex items-center gap-2">
                        {favourite?.Product?.Vendor?.business_name}
                        {/* |
                        <p className="font-normal text-sm text-gray-900">
                          Berlin, Germany
                        </p> */}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col items-end ml-auto sm:mt-6 cursor-pointer"
                onClick={() => handleFavourite(favourite?.product_id)}
              >
                <LazyImage
                  src={HeartIcon}
                  className="object-cover rounded-t-xl w-10 h-full sm:w-6 "
                />
              </div>
            </div>
          </div>
        </CustomCard>
      ))}

      {recordCount !== 1 ? (
        <div className="flex justify-center">
          <BasicPagination
            perPageCount={recordCount}
            handleChangePage={handleChangePage}
          />
        </div>
      ) : null}
    </div>
  );
};
export default FavouritesList;
