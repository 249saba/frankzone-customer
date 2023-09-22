import { ReactComponent as Googleblue } from "@assets/icons/google_blue.svg";
import CustomButton from "../customButton";
import { LoginSocialGoogle } from "reactjs-social-login";

const clientId =
  "247123536951-0pid89jlmis8hl7ci035un6e4empsb8b.apps.googleusercontent.com";

interface IGoogleAuth {
  handleAuthData?: (value: any) => void;
  className?: string;
  handleButtonClick?: any;
  styleClass?: any;
  label?: string;
  icon?: any;
}

function GoogleAuth({
  handleAuthData,
  className,
  handleButtonClick,
  icon,
  label,
  styleClass,
}: IGoogleAuth) {
  const responseGoogle = (res: any) => {
    console.log("google account detail ==", res);
    const _authData1 = {
      email: res?.email,
      social_media_token: res.sub,
      social_media_platform: "google",
    };
    handleAuthData?.(_authData1);
  };
  console.log("plan_id", localStorage.getItem("plan_id"));
  return (
    <div className={`w-full cursor-pointer ${className}`}>
      <LoginSocialGoogle
        client_id={clientId || ""}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }: any) => {
          responseGoogle(data);
        }}
        onReject={(err) => {
          console.log('onReject',err);
        }}
      >
        {icon ? (
          <Googleblue onClick={handleButtonClick} />
        ) : (
          <CustomButton
            icon={<Googleblue />}
            handleButtonClick={handleButtonClick}
            labelClass="w-full sm:hidden text-sm font-medium"
            label="Google"
            type={"button"}
            styleClass="btn-white justify-start text-center  !rounded-lg w-full !border-gray-300 !border-[1px] !shadow-none"
          />
        )}
      </LoginSocialGoogle>
    </div>
  );
}

export default GoogleAuth;
