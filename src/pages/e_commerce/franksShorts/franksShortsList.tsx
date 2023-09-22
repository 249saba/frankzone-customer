import BreadCrumb from "@src/shared/breadCrumbs/breadCrumb";
import { useState, useEffect } from "react";
import { DealItemsModel } from "@src/shared/models";
import Clarks from "@assets/images/food/clarks.png";
import Gaming from "@assets/images/food/gaming.png";
import ClarksIcon from "@assets/images/icons/clarks.png";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import FranksShortsItemCard from "./franksShortsItemCard ";
import BasicPagination from "@src/shared/pagination";

const FranksShortsList = () => {
  const [frankshortsItems, setFrankshortsItems] = useState<any>([]);
  const [recordCount, setRecordCount] = useState(0);
  useEffect(() => {
    getFrankshorts(0);
  }, []);
  const getFrankshorts = (pageNumber: any) => {
    backendCall({
      url: `/api/user/home/frank_shorts?limit=10&offset=${pageNumber}&order=desc`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setRecordCount(Math.ceil(res?.data?.count / 10));
        setFrankshortsItems(res?.data?.rows);
      }
    });
  };
  const handleChangePage = (pageNumber: any) => {
    getFrankshorts(pageNumber - 1);
  };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-2  gap-10  justify-start items-end">
        {frankshortsItems.map((item: any) => (
          <FranksShortsItemCard items={item} />
        ))}
      </div>
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
export default FranksShortsList;
