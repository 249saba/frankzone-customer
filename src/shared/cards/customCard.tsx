import { Card } from "@material-tailwind/react";
import { ReactNode } from "react";

interface styleClass {
  children: ReactNode;
  styleClass?: string;
  onClick?: () => void;
}

const CustomCard = ({ onClick, children, styleClass }: styleClass) => {
  return (
    <div className="flex flex-col items-center">

    <Card onClick={onClick} className={`${styleClass} bg-white shadow-xl w-[100%] `}>
      {children}
    </Card>
    </div>
  );
};

export default CustomCard;
