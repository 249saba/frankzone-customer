import { useEffect, useState } from "react";
import { CartItemsModel } from "@src/shared/models";
import TransactionIcon from "@assets/icons/transactionIcon.png";
import Burger_rectangle from "@assets/images/food/burger_rectangle.png";
import CustomCard from "@src/shared/cards/customCard";
import Checkbox from "@src/shared/checkbox/checkbox";
import CustomButton from "@src/shared/customButton";
import noImage from "@assets/images/NoImage.png";
import Seperator from "@src/shared/seperator/seperatorDashed";
import LazyImage from "@src/shared/lazyImage";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import Popup from "@src/shared/popup/popup";
import PaymentForm from "@src/shared/loadStripe/loadStripe";
import StripeElement from "@src/shared/loadStripe";

const TransactionList = () => {
    const navigate = useNavigate();
    const [TransactionList, setTransactionList] = useState([]);
    useEffect(() => {
      getCartDetail();
    }, []);
    const getCartDetail = () => {
      backendCall({
        url: `/api/user/transactions?text=&limit=-1&offset=0&order=desc`,
        method: "GET",
      }).then((res: any) => {
        if (res && !res.error) {
            setTransactionList(res?.data?.rows);
        }
      });
    };
    console.log("TransactionList",TransactionList)
  return (
    <div className="gap-8 ">
      <div className="flex flex-col gap-8">
        {TransactionList?.length>0&&TransactionList.map((item:any,index:Number)=>( 
           <CustomCard styleClass="text-left py-4 !w-[98%]">
          <div className="flex px-4  py-2 justify-between">
            <div className="flex gap-2">
            <LazyImage src={TransactionIcon} className="w-24 h-28" />
            <div className="flex flex-col gap-2">
              <h6 className="text-black-100 font-medium">{item?.payment_method}</h6>
              <p className="text-gray-900 text-sm ">Tran. ID: {item?.transaction_id}</p>
              <div className="flex items-center justify-center p-2 h-10 bg-[#ECC74F] text-white rounded-md">
                Booking ID:  {item?.Order?.code}
              </div>
            </div>
            </div>
            <div className="flex gap-2">
  
            <div className="flex flex-col gap-2 justify-between">
            <p className="text-gray-300 font-normal"> {moment(item?.createdAt).utc().format('LL')}</p>
              <h6 className="text-black-100 font-medium text-right">{item.price}€</h6>
        
           
            </div>
            </div>
          </div>
        </CustomCard>))}
      
      </div>
    </div>
  );
};

export default TransactionList;
