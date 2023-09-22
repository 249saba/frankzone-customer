import React, { useEffect, useState } from "react";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import { ReactComponent as Arrow } from "@assets/icons/Arrow.svg";
import ClarksIcon from "@assets/images/icons/clarks.png";
import CustomCard from "@src/shared/cards/customCard";
import LazyImage from "@src/shared/lazyImage";
import StatusButton from "@src/shared/statusButton";
import CustomButton from "@src/shared/customButton";
import { useNavigate, useParams } from "react-router-dom";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { formatedDate } from "@src/shared/dateFormat";

const VendorOrder = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getCartDetail();
  }, []);
  const getCartDetail = () => {
    backendCall({
      url: `/api/user/order/${params?.id}/vendor_orders?limit=-1&offset=0&text&order=desc&status`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setOrderList(res?.data?.rows);
      }
    });
  };

  return (
    <div className="flex flex-col  gap-8  ">
      {orderList.map((order: any) => (
        <CustomCard styleClass="p-6 w-full">
          <div className="flex flex-col gap-4 ">
            <div className="flex sm:flex-col items-stretch ">
              <div className="flex sm:flex-col items-start gap-3">
                <div
                  className="flex items-start gap-3 cursor-pointer"
                  onClick={() => navigate(`/myOrders/orderDetail/${order?.id}`)}
                >
                  <LazyImage
                    className="w-[150px] h-[150px] sm:[w-60px] sm:h-[120px] rounded-lg object-cover"
                    src={
                      order?.Vendor?.DefaultShop?.image_url
                        ? 
                          order?.Vendor?.DefaultShop?.image_url
                        : Burger_rectangle
                    }
                  />
                </div>
                <div className="flex text-left flex-col items-start h-full">
                  <h5 className="font-medium">{order?.shipping_address}</h5>
                  <p className="font-normal text-sm text-gray-900 mt-4">
                    {order?.code}
                  </p>
                  <div className="mt-4 ">
                    <StatusButton label="Order Pending" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end ml-auto sm:mt-3  gap-1 sm:items-start sm:justify-start sm:w-full">
                <p className="text-gray-900 text-sm">
                  {formatedDate(order?.order_placed_at)}
                </p>
                <div className="mt-auto">
                  <h5 className=" font-semibold mt-2 sm:mt-0">
                    {" "}
                    {order?.items_count} Items
                  </h5>
                  <h4 className=" font-semibold mt-2 sm:mt-0">
                    {" "}
                    Totals: €{order?.grand_total}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-black-100 w-full mt-4 " />
          <ItemDeatil order={order} />
        </CustomCard>
      ))}
    </div>
  );
};

export default VendorOrder;

const ItemDeatil = ({ order }: any) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const getOrderDetail = (id: number) => {
    if (!isOpenDetail) {
      backendCall({
        url: `/api/user/order/${id}`,
        method: "GET",
      }).then((res: any) => {
        if (res && !res.error) {
          setOrderDetail(res?.data?.OrderLines);
          setIsOpenDetail(true);
        }
      });
    } else {
      setIsOpenDetail(false);
    }
  };
  return (
    <>
      <CustomButton
        styleClass="btn-white m-auto !rounded-full !min-w-fit !h-[70px] mt-4"
        type={"button"}
        icon={
          <Arrow
            className={`w-5 ${
              isOpenDetail ? "rotate-90 " : ""
            }transition-transform duration-500`}
          />
        }
        handleButtonClick={() => getOrderDetail(order?.id)}
      />
      {isOpenDetail ? (
        <div className="mt-8">
          {orderDetail.map((order: any) => (
            <div className="flex flex-col gap-4 ">
              <div className="flex sm:flex-col items-stretch ">
                <div className="flex sm:flex-col items-start gap-3">
                  <div className="flex items-start gap-3">
                    <LazyImage
                      className="w-[100px] h-[100px] sm:[w-60px] sm:h-[120px] rounded-lg object-cover"
                      src={
                        order?.ProductVariant?.cover_image_url
                          ? 
                            order?.ProductVariant?.cover_image_url
                          : Burger_rectangle
                      }
                    />
                  </div>
                  <div className="flex text-left flex-col items-start h-full">
                    <h5 className="font-medium">
                      {order?.ProductVariant?.Product?.name}
                    </h5>
                    <div className="flex">
                      {order?.ProductVariant?.ProductOptions.map(
                        (option: any, index: number) => (
                          <p className="font-normal text-sm text-gray-900 mt-2 mr-2">
                            {option?.AttributeOption?.name}
                            {index + 1 !==
                            order?.ProductVariant?.ProductOptions.length
                              ? ","
                              : null}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end ml-auto sm:mt-3 gap-1">
                  <div className="mt-auto">
                    <h5 className=" font-semibold mt-2 sm:mt-0">
                      {" "}
                      {order?.quantity} X
                    </h5>
                    <h4 className=" font-semibold mt-2 sm:mt-0">
                      {" "}
                      €{order?.price}
                    </h4>
                  </div>
                </div>
              </div>
              <hr className="border-black-100 w-full my-4 " />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
