import { useState } from "react";
import { IconButton } from "@mui/material";
import { backendCall } from "../utils/backendService/backendCall";
import { handleToastMessage } from "../toastify";

interface ICartButton {
  className?: string;
  btnClass?: string;
  productId?: string;
  noOfItems?: number | undefined;
  handleClick?: any;
}
const CartButtons = (props: ICartButton) => {
  const [itemQuantity, setItemQuantity] = useState<any>(props?.noOfItems);
  const handleQuantity = (mode: any) => {
    if (mode === "add") {
      setItemQuantity((prev: any) => prev + 1);
    } else {
      setItemQuantity((prev: any) => prev - 1);
    }
    const obj = {
      order_line_id: props?.productId,
      type: mode,
    };
    backendCall({
      url: `/api/user/order/cart/quantity`,
      method: "POST",
      data: obj,
    }).then((res: any) => {
      if (res && !res.error) {
        props.handleClick();
        handleToastMessage("success", res?.message);
      } else {
        handleToastMessage("error", res?.message);
      }
    });
  };
  return (
    <div className={`flex items-center gap-3 ${props.className}`}>
      <IconButton
        aria-label="fingerprint"
        size="small"
        onClick={() => handleQuantity("add")}
        className={` !w-[35px] !h-[35px] !p-3 !bg-blue-100 ${props.btnClass}`}
      >
        +
      </IconButton>
      <h5 className="font-medium">{itemQuantity}</h5>
      <IconButton
        aria-label="fingerprint"
        size="small"
        disabled={itemQuantity <= 0}
        onClick={() => handleQuantity("remove")}
        className={` !w-[35px] !h-[35px] !p-3 !bg-blue-100 ${props.btnClass}`}
      >
        -
      </IconButton>
    </div>
  );
};

export default CartButtons;
