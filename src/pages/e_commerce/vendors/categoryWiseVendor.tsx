import { useState, useEffect } from "react";
import VendorItemCard from "@src/shared/cards/vendorItemCard ";
import { useNavigate, useParams } from "react-router-dom";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import LazyImage from "@src/shared/lazyImage";
import SeeMore from "@assets/images/icons/see_more.png";
import BasicPagination from "@src/shared/pagination";

const CategoryWiseVendor = ({ selectedCategoryId, categoryId }: any) => {
  const params = useParams();
  const navigate = useNavigate();
  const [vendorsItems, setVendorsItems] = useState<any>([]);
  const [recordCount, setRecordCount] = useState(0);
  useEffect(() => {
    getVendors(0);
  }, [selectedCategoryId]);
  const getVendors = (pageNumber: any) => {
    backendCall({
      url: `/api/user/home/module/category/${selectedCategoryId}/vendors?limit=10&offset=${pageNumber}&order=desc&text`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setRecordCount(Math.ceil(res?.data?.count / 10));
        setVendorsItems(res?.data?.rows);
      }
    });
  };
  const handleChangePage = (pageNumber: any) => {
    getVendors(pageNumber - 1);
  };
  return (
    <div className="space-y-5 mt-4">
      <div className="flex justify-between items-start sm:flex-col sm:items-start">
        <h3 className="font-bold text-black-900 italic flex  items-center">
          SHOPS
        </h3>
      </div>
      {vendorsItems.length ? (
        <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-2  gap-10  justify-start items-end">
          {vendorsItems.map((item: any) => (
            <VendorItemCard
              items={item}
              selectedCategoryId={selectedCategoryId}
              categoryId={categoryId}
            />
          ))}
        </div>
      ) : (
        <div className="text-3xl text-gray-500 italic flex justify-center">
          No Data Found
        </div>
      )}
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
export default CategoryWiseVendor;
