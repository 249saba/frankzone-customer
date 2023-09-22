import { useState, useEffect } from "react";
import VendorItemCard from "@src/shared/cards/vendorItemCard ";
import { useNavigate, useParams } from "react-router-dom";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import LazyImage from "@src/shared/lazyImage";
import SeeMore from "@assets/images/icons/see_more.png";

const SeeAllVendor = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [vendorsItems, setVendorsItems] = useState<any>([]);
  useEffect(() => {
    getVendors();
  }, []);
  const getVendors = () => {
    backendCall({
      url: `/api/user/home/module/${params?.id}/vendors`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setVendorsItems(res?.data?.rows);
      }
    });
  };
  return (
    <div className="space-y-5 mt-4">
      <div className="flex justify-between items-start sm:flex-col sm:items-start">
        <h3 className="font-bold text-black-900 italic flex  items-center">
          SHOPS
        </h3>
        
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-2  gap-10  justify-start items-end">
        {vendorsItems.map((item: any) => (
          <VendorItemCard items={item} />
        ))}
      </div>
    </div>
  );
};
export default SeeAllVendor;
