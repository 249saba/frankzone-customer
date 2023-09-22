import CustomCard from "@src/shared/cards/customCard";
import { useState, useEffect } from "react";
import LazyImage from "@src/shared/lazyImage";
import { useNavigate } from "react-router-dom";
import ratingStar from "@assets/images/icons/star_yellow.png";
import BackroundImage from "@src/shared/backgroundImage";
import Popup from "@src/shared/popup/popup";
import VideoPlayer from "@src/shared/utils/videoPlayer";

const FranksShortsItemCard = ({ items }: any) => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [videoUrl, setVideoUrl] = useState<any>("");

  const navigate = useNavigate();
  const handleClick = (_videoUrl: any) => {
    console.log("item cscx ==", _videoUrl);
    setVideoUrl(_videoUrl);
    setIsOpen(true);
    // navigate(`/frankshorts/frankshortsDetail/${id}`);
  };
  return (
    <div>
      <Popup
        isOpen={isOpen}
        width = {800}
        handleClose={() => setIsOpen(false)}
        isShowHeader={true}
      >
        <VideoPlayer url={videoUrl} />
      </Popup>
      <div
        onClick={() =>
          handleClick(
            items?.video_url
          )
        }
      >
        <BackroundImage
          classes=" bg-cover bg-no-repeat w-full h-96 rounded-2xl cursor-pointer"
          url={ items?.image_url}
        >
          <div className="px-4 py-4 space-y-2 flex items-end h-96">
            <div className="flex gap-3 items-center">
              <LazyImage
                src={
                
                  items?.Vendor?.image_url
                }
                width="50px"
                alt=""
                className="object-cover rounded-full h-12 w-12"
              />

              <div className="space-y-1">
                <h5 className="text-white text-left   font-semibold">
                  {items?.title}
                </h5>
              </div>
            </div>
          </div>
        </BackroundImage>
      </div>
    </div>
  );
};

export default FranksShortsItemCard;
