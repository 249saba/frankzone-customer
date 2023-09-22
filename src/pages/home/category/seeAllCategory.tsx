import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryModule from "./categoryModule";
import { backendCall } from "@src/shared/utils/backendService/backendCall";

const SeeAllCategory = () => {
  const params = useParams();
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getModuleCategory();
  }, []);
  const getModuleCategory = () => {
    backendCall({
      url: `/api/user/home/module/${params?.id}/categories?limit=${-1}`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setCategoryData(res?.data?.rows);
      }
    });
  };
  return (
    <div>
      <div className="flex justify-between items-start sm:flex-col sm:items-start">
        <h3 className="font-bold text-black-900 italic flex  items-center">
          SUBCATEGORIES
        </h3>
      </div>
      <CategoryModule categoryId={params?.id} categoryData={categoryData} />
    </div>
  );
};

export default SeeAllCategory;
