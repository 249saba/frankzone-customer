import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = ({
  perPageCount,
  handleChangePage,
  avtivePage,
}: any) => {
  const handleChange = (e: any) => {
    handleChangePage(e.target.innerText);
  };
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={perPageCount}
          onChange={(e) => handleChange(e)}
          hideNextButton
          hidePrevButton
          page={avtivePage}
        />
      </Stack>
    </div>
  );
};

export default BasicPagination;
