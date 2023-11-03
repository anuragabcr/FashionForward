import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/IconButton";
import Currency from "@/components/Currency";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Order {
  id: string;
  name: string;
  price: string;
  type: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CartItemProps {
  data: Order;
  setOrders: any;
}

const CartItem: React.FC<CartItemProps> = ({ data, setOrders }) => {
  const { userId } = useAuth();

  const cancelOrder = async () => {
    const response = await axios.patch(`/api/orders/${data.id}`, { userId });
    if (response.status == 200) {
      toast.success("Order Cancelled successfully");
      setOrders(response.data);
    } else toast.error("Order cancel failed");
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data?.url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={cancelOrder} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data?.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data?.type}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data?.createdAt}
            </p>
          </div>
          <Currency value={data?.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
