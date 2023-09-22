import ContentContainer from "@src/containers/contentContainer";
import SearchSuggestion from "@src/shared/searchSuggestion";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import CustomButton from "@src/shared/customButton";
import LazyImage from "@src/shared/lazyImage";
import ArrowNextIcon from "@src/shared/icons/arrow-next";
import { DealItemsModel } from "@src/shared/models";
import VendorItemCard from "@src/shared/cards/vendorItemCard ";
import Clarks from "@assets/images/food/clarks.png";
import Gaming from "@assets/images/food/gaming.png";
import ClarksIcon from "@assets/images/icons/clarks.png";
import DeliveryIcon from "@assets/images/icons/delivery_icon.png";
// import BackIcon from "@assets/images/icons/arrow_back.svg";
import BreadCrumb from "@src/shared/breadCrumbs/breadCrumb";
import { ICrumbs } from "@shared/interfaces";
import { Outlet } from "react-router-dom";

const FranksShorts = () => {
  const item: ICrumbs = { title: "FranksShorts", link: "/" };

  const handleChange = () => {};
  return (
    <ContentContainer styleClass="gap-10">
      <div className="w-6/12 sm:w-full md:w-full mx-auto">
        <SearchSuggestion
          type={"text"}
          name={"search"}
          placeholder="Search here..."
          handldChange={handleChange}
          inputClassName={"h-16 !rounded-[32px]"}
          variant="normal"
          leftIcon={<SearchIcon className="!left-8" />}
          rightIcon={
            <CustomButton
              label={"Search"}
              type={"submit"}
              isLoading={false}
              variant={"outlined"}
              styleClass={"btn-black"}
            />
          }
        />
      </div>

      <div className="w-full py-8 overflow-hidden">
        <div className="flex justify-between items-center pb-4">
          <div className=" text-black-900 flex font-normal  items-center">
            <BreadCrumb item={item} />
          </div>
        </div>
        <Outlet />
      </div>

      {/* <div className="space-y-5 pt-8">
        <div className="flex justify-between items-center">
          <div className=" text-black-900 flex font-normal  items-center">
            <BreadCrumb items={breadCrumbs} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-2 gap-10  justify-start items-end">
          {vendorItems.map((item: any) => (
            <VendorItemCard items={item} />
          ))}
        </div>
      </div> */}
    </ContentContainer>
  );
};
export default FranksShorts;
