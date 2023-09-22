// import React, { useEffect } from "react";

// import Style from "./spinner.module.scss";

// export const Spinner = ({ isWhite = false }) => {
//   return (
//     <div className={`${Style.contianer} d-flex`}>
//       <div
//         className={`${Style.spinner} ${isWhite ? Style.whiteborder : ""}`}
//       ></div>
//     </div>
//   );
// };
import React, { useEffect } from "react";

import { CircularProgress } from "@mui/material";

interface ISpinner {
  size?: string;
  isLoading?: boolean;
  classname?: string;
}
export const Spinner = ({ size, isLoading, classname }: ISpinner) => {
  var _size = 25;
  switch (size) {
    case "small":
      _size = 50;
      break;

    case "medium":
      _size = 50;
      break;

    case "large":
      _size = 80;
      break;

    default:
      _size = 25;
      break;
  }
  return isLoading ? (
    <CircularProgress
      className={`mx-auto ${classname}`}
      color="secondary"
      size={_size}
    />
  ) : (
    <div className="hidden"></div>
  );
};
