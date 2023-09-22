import React, { useEffect, useState } from "react";
import CustomCard from "@src/shared/cards/customCard";
import StartYellowIcon from "@assets/images/icons/star_yellow.svg";
import noImage from "@assets/images/NoImage.png";
import LazyImage from "@src/shared/lazyImage";
import NewIcon from "@assets/images/icons/new.png";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { useParams } from "react-router-dom";
import { formatedDate } from "@src/shared/dateFormat";

const WhatsNew = () => {
  const params = useParams();
  const [whatsNew, setWhatsNew] = useState<any>();
  useEffect(() => {
    getWhatsNew();
  }, []);
  const getWhatsNew = () => {
    backendCall({
      url: `/api/user/home/vendor/${params?.id}/whatsnew?limit=10&offset=0&order=desc&text=`,
      method: "GET",
    }).then((res: any) => {
      if (res && !res.error) {
        setWhatsNew(res?.data?.rows);
      }
    });
  };
  return (
    <>
      {whatsNew?.map((whatnew: any, index: number) => (
        <CustomCard
          key={Math.random()}
          styleClass="h-full cursor-pointer my-2 !shadow-none p-8 pb-4 !bg-[#27b1a31a]"
        >
          <div className="flex justify-center bg-white mb-2 w-full shadow ">
            <img
              className="  h-[400px] rounded-md"
              // width={"100%"}
              src={
                whatnew?.image_url
                  ?
                    whatnew?.image_url
                  : noImage
              }
              alt=""
            />
          </div>
          <div className="flex items-start mt-2">
            <div className="w-[3%]">
              <LazyImage
                className="w-[25px] h-[25px] rounded-full"
                src={NewIcon}
                alt=""
              />
            </div>
            <div className="w-[95%] break-words">
              <p className="text-black-100 text-left">
                {whatnew?.description}
              </p>
            </div>
          </div>
        </CustomCard>
      ))}
    </>
  );
};

export default WhatsNew;
