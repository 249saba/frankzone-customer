import { useState } from "react";
import CustomCard from "@src/shared/cards/customCard";
import CustomButton from "@src/shared/customButton";
import Input from "@src/shared/input";
import StripeElement from "@src/shared/loadStripe";
import SeperatorDashed from "@src/shared/seperator/seperatorDashed";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import React from "react";
import { useNavigate } from "react-router-dom";
import { handleToastMessage } from "@src/shared/toastify";

const AddCard = () => {
  const navigate = useNavigate();
  const handleSubmit = (card: any) => {
    backendCall({
      url: `/api/user/add_card`,
      method: "POST",
      data: { card_token: card },
    }).then((res: any) => {
      if (res && !res.error) {
        handleToastMessage("success", res?.message);
        navigate("/cartManagement/choosePayment");
      } else {
        handleToastMessage("error", res?.message);
      }
    });
  };
  return (
    <div className="gap-8 pl-6 sm:pl-0">
      <div className="space-y-8 w-full">
        <CustomCard styleClass="text-left py-6 !w-[98%]">
          <h4 className="pl-6">Add New Card</h4>
          <SeperatorDashed />
          <StripeElement handleSubmitCard={handleSubmit} />
          {/* <div className="mt-5 flex flex-col justify-between items-start gap-5 px-6 sm:px-2">
            <div className=" px-4 py-2 w-full">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Card holder name"
                handldChange={() => {}}
              />
            </div>
            <div className=" px-4 py-2 w-full">
              <Input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="Card Number"
                handldChange={() => {}}
              />
            </div>
            <div className="w-full flex">
              <div className=" px-2 py-2 w-full">
                <Input
                  id="expiryDate"
                  name="carexpiryDatedNumber"
                  type="text"
                  placeholder="Expiry Date"
                  handldChange={() => {}}
                />
              </div>
              <div className=" px-2 py-2 w-full">
                <Input
                  id="cvv"
                  name="cvv"
                  type="text"
                  placeholder="cvv"
                  handldChange={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8 pr-8">
            <CustomButton
              handleButtonClick={() => {}}
              label={"Save & Continue"}
              type={"button"}
              variant={"outlined"}
              styleClass={"btn-white w-[200px] !rounded-full !font-medium "}
            />
          </div> */}
        </CustomCard>
      </div>
    </div>
  );
};

export default AddCard;
