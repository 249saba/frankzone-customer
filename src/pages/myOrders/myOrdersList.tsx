import { useState, useEffect } from "react";
import ClarksIcon from "@assets/images/icons/clarks.png";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import multiVendor from "@assets/images/multi-vendor1.png";
import CustomCard from "@src/shared/cards/customCard";
import Checkbox from "@src/shared/checkbox/checkbox";
import LazyImage from "@src/shared/lazyImage";
import HeartIcon from "@assets/images/icons/heart.png";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import StatusButton from "@src/shared/statusButton";
import CustomButton from "@src/shared/customButton";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { formatedDate } from "@src/shared/dateFormat";
import BasicPagination from "@src/shared/pagination";
// import { IconButton } from "@mui/material";

const MyOrdersList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  useEffect(() => {
    getCartDetail(0);
  }, []);
  const getCartDetail = (pageNumber: any) => {
    backendCall({
      url: `/api/user/order?limit=10&offset=${pageNumber}&text&order=desc&status`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setRecordCount(Math.ceil(res?.data?.count / 10));
        setOrderList(res?.data?.rows);
      }
    });
  };
  const handleChangePage = (pageNumber: any) => {
    getCartDetail(pageNumber - 1);
  };
  return (
    <div className="flex flex-col gap-8">
      {orderList.map((order: any) => (
        <CustomCard
          styleClass="p-6 w-full cursor-pointer"
          onClick={() => navigate(`vendorOrder/${order?.id}`)}
        >
          <div className="flex flex-col gap-4 ">
            <div className="flex sm:flex-col items-stretch ">
              <div className="flex sm:flex-col items-start gap-3">
                <div className="flex items-start gap-3">
                  <LazyImage
                    className="w-[150px] h-[150px] sm:[w-60px] sm:h-[120px] rounded-lg object-cover"
                    src={
                      order?.vendor_count > 1
                        ? multiVendor
                        : 
                          order?.vendor_image
                    }
                  />
                </div>
                <div className="flex text-left flex-col items-start h-full">
                  <h5 className="font-medium">Order Number</h5>
                  <p className="font-normal text-sm text-gray-900 mt-4">
                    {order?.code}
                  </p>
                  {/* <div className="mt-4 ">
                    <StatusButton label={order?.state} />
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col items-end ml-auto sm:mt-3 gap-1">
                <p className="text-gray-900 text-sm">
                  {formatedDate(order?.order_placed_at)}
                </p>
                <h4 className=" font-semibold mt-auto ">
                  {" "}
                  Total: €{order?.grand_total}
                </h4>
              </div>
            </div>
          </div>
        </CustomCard>
      ))}
      {/* <CustomCard styleClass="p-6 w-full">
        <div className="flex flex-col gap-4 ">
          <div className="flex sm:flex-col items-stretch ">
            <div className="flex sm:flex-col items-start gap-3">
              <div className="flex items-start gap-3">
                <LazyImage
                  className="w-[200px] h-[200px] sm:[w-60px] sm:h-[120px] rounded-lg object-cover"
                  src={Burger_rectangle}
                />
              </div>
              <div className="flex text-left flex-col items-start h-full">
                <h5 className="font-medium">Black Shoes, Pure Leather Made</h5>
                <h3 className="mt-2 font-medium">$60</h3>
                <div className="mt-auto ">
                  <div className="flex  items-start  gap-2 sm:mt-2  ">
                    <LazyImage className=" h-[30px]" src={ClarksIcon} />
                    <h5 className="font-medium text-black-900 flex items-center gap-2">
                      Clarks |
                      <p className="font-normal text-sm text-gray-900">
                        Berlin, Germany
                      </p>
                    </h5>
                  </div>
                  <StatusButton label="pending" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end ml-auto sm:mt-3 gap-1">
              <p className="text-gray-900 text-xs">Jan 30,2023</p>
              <h5 className=" font-semibold mt-2 sm:mt-0"> QTY. 1</h5>
              <h4 className=" font-semibold mt-2 sm:mt-0"> Total: $60</h4>
              <CustomButton
                styleClass="btn-black mt-auto !rounded-lg "
                type={"button"}
                label="Reorder"
              />
            </div>
          </div>
        </div>
      </CustomCard> */}
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
export default MyOrdersList;
