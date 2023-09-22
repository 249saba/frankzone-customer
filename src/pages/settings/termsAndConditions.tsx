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

const TermsAndConditions = () => {
  const [settings, setSettings] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [isNegative, setIsNegative] = useState(false);
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
  const item1: ICrumbs = {
    title: "Terms & Conditions",
    link: "/Setting/TermsAndConditions",
  };

  return (
    <>
      {" "}
      <div className="flex  justify-between  gap-2">
        <div className="text-left ">
          <BreadCrumb item={item} item1={item1} />
        </div>
      </div>
      <CustomCard styleClass="p-7 mt-3">
          <div className="rounded-md  bg-[#daf5f3] font-medium cursor-pointer p-7 text-left text-black-700">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Dui accumsan sit amet nulla facilisi morbi. Dui vivamus arcu felis
              bibendum. Ullamcorper eget nulla facilisi etiam dignissim diam
              quis. Tristique sollicitudin nibh sit amet. Risus at ultrices mi
              tempus imperdiet nulla malesuada pellentesque elit. Nec feugiat in
              fermentum posuere urna. Enim tortor at auctor urna nunc. At urna
              condimentum mattis pellentesque id nibh tortor. Velit ut tortor
              pretium viverra suspendisse potenti nullam ac. Sem integer vitae
              justo eget magna. Aliquam vestibulum morbi blandit cursus risus
              at. Augue interdum velit euismod in pellentesque massa. Quam
              vulputate dignissim suspendisse in est ante in nibh. Lorem mollis
              aliquam ut porttitor leo a diam sollicitudin. Elementum curabitur
              vitae nunc sed velit dignissim. Vitae justo eget magna fermentum
              iaculis eu non diam phasellus. Dignissim convallis aenean et
              tortor at risus viverra adipiscing. Dui accumsan sit amet nulla.
              <br/><br/>
              Aliquam sem et tortor consequat id. At urna condimentum mattis
              pellentesque id. Diam sollicitudin tempor id eu nisl nunc mi
              ipsum. Volutpat blandit aliquam etiam erat velit scelerisque in
              dictum non. Ullamcorper velit sed ullamcorper morbi tincidunt
              ornare massa eget. Vestibulum mattis ullamcorper velit sed
              ullamcorper morbi tincidunt ornare massa. Eleifend donec pretium
              vulputate sapien nec sagittis aliquam. Aliquam id diam maecenas
              ultricies mi. Egestas fringilla phasellus faucibus scelerisque
              eleifend. Suspendisse faucibus interdum posuere lorem ipsum. Vitae
              purus faucibus ornare suspendisse sed nisi lacus sed. Cras semper
              auctor neque vitae tempus quam pellentesque nec nam.
              <br/><br/>
              Ipsum suspendisse ultrices gravida dictum fusce. Gravida rutrum quisque
              non tellus orci ac. Et tortor at risus viverra adipiscing at in
              tellus. Cursus risus at ultrices mi tempus imperdiet nulla. Sit
              amet commodo nulla facilisi nullam. Magnis dis parturient montes
              nascetur ridiculus mus mauris. Enim ut tellus elementum sagittis
              vitae et. Neque egestas congue quisque egestas diam in arcu
              cursus. Iaculis eu non diam phasellus vestibulum. Cum sociis
              natoque penatibus et. Eget mauris pharetra et ultrices neque
              ornare aenean euismod. Laoreet non curabitur gravida arcu ac
              tortor. Nam libero justo laoreet sit. Vel facilisis volutpat est
              velit egestas dui id. Egestas fringilla phasellus faucibus
              scelerisque eleifend donec pretium vulputate sapien. Gravida in
              fermentum et sollicitudin ac. Pharetra vel turpis nunc eget lorem
              dolor. Eget magna fermentum iaculis eu non diam. Aliquam etiam
              erat velit scelerisque in dictum non consectetur. Phasellus
              vestibulum lorem sed risus ultricies tristique. A cras semper
              auctor neque. Pharetra convallis posuere morbi leo urna molestie.
              Sit amet venenatis urna cursus eget nunc scelerisque viverra
              mauris. Elementum integer enim neque volutpat. Aliquet bibendum
              enim facilisis gravida. Id faucibus nisl tincidunt eget nullam non
              nisi. Nunc vel risus commodo viverra. Aliquet bibendum enim
              facilisis gravida neque convallis a cras. Diam vel quam elementum
              pulvinar etiam. Risus nec feugiat in fermentum posuere urna.
              Tortor consequat id porta nibh venenatis cras. Ornare lectus sit
              amet est placerat in egestas erat imperdiet. Eu ultrices vitae
              auctor eu augue ut lectus. Donec ac odio tempor orci dapibus
              ultrices in. At varius vel pharetra vel turpis nunc. Sed nisi
              lacus sed viverra tellus in hac. Egestas dui id ornare arcu odio
              ut sem nulla. At consectetur lorem donec massa sapien faucibus.
              Nunc sed augue lacus viverra. In metus vulputate eu scelerisque
              felis imperdiet. Nisi vitae suscipit tellus mauris. Arcu dictum
              varius duis at consectetur lorem. Amet consectetur adipiscing elit
              ut aliquam purus sit amet. Sit amet tellus cras adipiscing. Sed
              enim ut sem viverra aliquet eget sit amet.
            </p>
          </div>
        
      </CustomCard>
    </>
  );
};

export default TermsAndConditions;
