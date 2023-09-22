
import CustomCard from "@src/shared/cards/customCard";
import CustomButton from "@src/shared/customButton";
import { ReactComponent as Warning } from "@assets/vendor/icons/warning.svg";
import Checkbox from "@src/shared/checkbox/checkbox";
import Switch from "@mui/material/Switch";
import ArrowRight from "@assets/icons/black_arrow.png";
import { Link, useNavigate } from "react-router-dom";
import "@src/index.scss";
import LazyImage from "@src/shared/lazyImage";
import SeperatorLine from "@src/shared/seperator/seperatorLine";
import { useEffect, useState } from "react";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { Breadcrumbs } from "@material-tailwind/react";
import BreadCrumb from "@src/shared/breadCrumbs/breadCrumb";
import { ICrumbs } from "@src/shared/interfaces";

const AllSetting = () => {
  const [settings, setSettings] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
    //   getSettings();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, []);
  const getSettings = () => {
    setIsLoading(true);
    backendCall({
      url: `/api/vendor/settings`,
      method: "GET",
    }).then((res) => {
      if (res && !res.error) {
        setSettings(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };
  const handleGoogleRatingAndReview = (status: any, id: number) => {
    setIsLoading(true);
    backendCall({
      url: `/api/vendor/settings/toggle_status`,
      method: "PUT",
      data: status
        ? { field_name: "google_rating_enabled", is_enabled: 1 }
        : { field_name: "google_rating_enabled", is_enabled: 0 },
    }).then((res) => {
      console.log("productsList", res);
      if (res && !res.error) {
        getSettings();
      } else {
        setIsLoading(false);
      }
    });
  };
  const handleEnableChat = (status: any, id: number) => {
    setIsLoading(true);
    backendCall({
      url: `/api/vendor/settings/toggle_status`,
      method: "PUT",
      data: status
        ? { field_name: "chat_enabled", is_enabled: 1 }
        : { field_name: "chat_enabled", is_enabled: 0 },
    }).then((res) => {
      console.log("productsList", res);
      if (res && !res.error) {
        getSettings();
      } else {
        setIsLoading(false);
      }
    });
  };
  const navigate = useNavigate();
  const item: ICrumbs = { title: "Setting", link: "/Setting" };
  return (
    <> <div className="flex  justify-between  gap-2">
    <div className="text-left ">
    <BreadCrumb item={item} />
      
    </div>
  </div>
      <CustomCard styleClass="px-4 py-2 mt-3">
       
        <div className="flex flex-col text-black-900 justify-between pt-5 gap-3">
          <div
            className="flex justify-between items-center  rounded-md h-16 bg-[#daf5f3] font-medium cursor-pointer px-7"
            // onClick={() => {
            //   navigate("/settings/notifications", { state: settings });
            // }}
          >
            <p>
              <span>Notifications</span>
            </p>
            <Switch
              id="blue"
              name="contain_variations"
              checked={settings?.chat_enabled == 1 ? true : false}
              onChange={() => {
                handleEnableChat(!settings?.chat_enabled, settings?.id);
              }}
            />
          </div>
          
          <div className="flex justify-between items-center cursor-pointer rounded-md h-16 px-7 bg-[#daf5f3] font-medium" onClick={() => {
              navigate("/Setting/DeliveryAddress");
            }}>
            <p>
              <span>Delivery Address</span>
            </p>
            <img src={ArrowRight} className="w-5 h-5" />
          </div>

     

          <div className="flex justify-between items-center h-16 cursor-pointer rounded-md bg-[#daf5f3] font-medium px-7"  onClick={() => {
              navigate("/Setting/Faqs");
            }}>
            <p>
              <span>FAQs</span>
            </p>
            <img src={ArrowRight} className="w-5 h-5" />
          </div>

          <div
            className="flex justify-between items-center h-16 rounded-md bg-[#daf5f3] font-medium px-7 cursor-pointer"
            onClick={() => {
              navigate("/Setting/PrivacyPolicy");
            }}
          >
            <p>
              <span>Privacy policy</span>
            </p>
            <img src={ArrowRight} className="w-5 h-5" />
          </div>

          
          <div
            className="flex justify-between items-center h-16 px-7 rounded-md bg-[#daf5f3] font-medium cursor-pointer"
            onClick={() => {
                navigate("/Setting/TermsAndConditions");
              }}
          >
            <p>
              <span>Terms & Conditions</span>
            </p>
            <img src={ArrowRight} className="w-5 h-5" />
          </div>

       
          <div
            className="flex justify-between h-16 px-7 bg-[#daf5f3] rounded-md font-medium items-center  cursor-pointer"
            onClick={() => {
                navigate("/Setting/About");
              }}
          >
            <p>
              <span>About</span>
            </p>
            <img src={ArrowRight} className="w-5 h-5" />
          </div>

      
        </div>
      </CustomCard>
    </>
  );
};

export default AllSetting;
