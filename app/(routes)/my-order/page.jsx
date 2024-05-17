"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalApi from "../../_utils/GlobalApi";
import moment from "moment";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import OrderItemComponent from './_components/MyOrderItem';

function MyOrder() {

  const jwt = sessionStorage.getItem('jwt');
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!jwt) {
      router.replace('/');
    }
    getMyOrder();
  },[]);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    setOrderList(orderList_);
  }

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">My Order</h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div className="mt-4">
          {orderList.map((item, index) => (
            <Collapsible key={index} className="mt-2">
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex flex-col items-start md:flex-row justify-evenly gap-4 md:gap-24">
                  <h2>
                    <span className="font-bold mr-2">Order Date:</span> 
                    {moment(item?.createdAt).format('DD/MMM/yyy')}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount:</span> 
                    {`$${item?.totalOrderAmount}`}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status:</span> 
                    <span className="uppercase">{item?.status}</span>
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order, index_) => (
                  <OrderItemComponent orderItem={order} key={index_} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrder;