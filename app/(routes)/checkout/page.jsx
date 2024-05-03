'use client';

import { ArrowBigRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import GlobalApi from "../../_utils/GlobalApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

function Checkout() {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const jwt = sessionStorage.getItem('jwt');
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const [userName, SetUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();
  const tax = 9;
  const delivery = 15;

  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in');
      return;
    }
    if (dataLoaded && totalCartItem === 0) {
      router.push('/');
      return;
    }
    getCartItems();
  }, []);

  useEffect(() => {
    if (cartItemList.length > 0) {
      let total = 0;
      cartItemList.forEach(element => {
        total = total + element.amount
      })
      const amount = Number(total + (total / 100 * tax) + delivery);
      setTotalAmount(amount);
      setSubtotal(Number(total.toFixed(2)));
    }
  },[cartItemList]);

  function getTotalAmount() {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount
    })
    const amount = Number(total + (total / 100 * tax) + delivery).toFixed(2);
    return amount;
  }

  const getCartItems = async () => {
    if (!user) {
      return
    }
    const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList?.length);
    setCartItemList(cartItemList);
    setDataLoaded(true);
  };

  const calculateTotalAmount = () => {
    const totalAmount = (subtotal + delivery + ((subtotal / 100) * tax));
    return totalAmount.toFixed(2);
  }

  const onApprove = (data) => {
    const payload = {
      data: {
        paymentId: data.paymentId,
        totalOrderAmount: getTotalAmount(),
        userId: user.id,
        username: userName,
        email,
        zip,
        address,
        phone,
        orderItemList: cartItemList
      }
    }

    GlobalApi.createOrder(payload, jwt).then(resp => {
      toast('Order Places Succesfully! Thank You!');
    });

  }

  const onError = (data) => {
    toast(`Error: ${data.message}. Try again!`);
  }
 
  return (
    <div className="">
      {totalCartItem > 0 &&
        <>
          <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">Checkout</h2>
          <div className="px-2 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
            <div className="md:col-span-2 mx-8 md:mx-20">
              <h2 className="font-bold text-3xl">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 mt-3">
                <Input placeholder="Name" onChange={(e) => SetUserName(e.target.value)} />
                <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 mt-3">
                <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
              </div>
              <div className="mt-3 mb-3">
                <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <div className="mx-10 border">
              <h2 className="p-3 bg-gray-200 font-bold text-center">Total Cart ({totalCartItem})</h2>
              <div className="p-4 flex flex-col gap-4">
                <h2 className="font-bold flex justify-between">Subtotal : <span>${subtotal}</span></h2>
                <hr></hr>
                <h2 className="flex justify-between">Delivery : <span>${delivery}</span></h2>
                <h2 className="flex justify-between">Tax (9%) : <span>${((subtotal / 100) * tax).toFixed(2)}</span></h2>
                <hr></hr>
                <h2 className="font-bold flex justify-between">Total : <span>${calculateTotalAmount()}</span></h2>
                {/* <Button onClick={() => onApprove({paymentId: "123"})}>Payment <ArrowBigRight /></Button> */}
                <PayPalButtons style={{ layout: "horizontal" }}
                  onApprove={onApprove}
                  onError={onError}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: getTotalAmount(),
                            currency_code: 'USD'
                          }
                        }
                      ]
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Checkout;