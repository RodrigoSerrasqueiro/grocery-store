'use client';

import { Button } from "../../components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function ProductItemDetail({ product }) {

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('user')) : {};
  const jwt = typeof window !== "undefined" ? localStorage.getItem('jwt') : "";
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice?
    product.attributes.sellingPrice:
    product.attributes.mrp
  )
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToCard = () => {
    setLoading(true);
    if (!jwt) {
      router.push('/sign-in');
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id
      }
    }
    GlobalApi.addToCart(data, jwt).then(resp => {
      toast('Added to cart');
      setUpdateCart(!updateCart);
      setLoading(false);
    }, (e) => {
      toast('Error while adding into cart');
      setLoading(false);
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-2 sm:p-7 bg-white text-black gap-3 sm:gap-0">
      <Image
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg" 
        src={product.attributes.image} 
        alt="product image" 
        width={300}
        height={300}
        unoptimized
      />
      <div className="flex flex-col gap-3 items-center sm:items-start">
        <h2 className="font-bold text-2xl">
          {product.attributes.name}
        </h2>
        <h2 className="text-sm text-gray-500">
          {product.attributes.description}
        </h2>
        <div className="flex gap-3">
          {product.attributes.sellingPrice &&
            <h2 className='font-bold text-3xl'>${product.attributes.sellingPrice}</h2>
          }
          <h2 className={`font-bold text-3xl ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>
            ${product.attributes.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({ product.attributes.itemQuantityType })
        </h2>
        <div className="flex flex-col items-center sm:items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-8 items-center">
              <button 
                onClick={() => setQuantity(prevQuantity => prevQuantity - 1)}
                disabled={quantity === 1}
                className="disabled:opacity-40 text-lg"
              >
                -
              </button>
              
              <h2 className="w-[20px]">{quantity}</h2>
              
              <button
                onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}
                className="text-lg"
              >
                +
              </button>
            </div>
            <div className="w-[100px] sm:w-auto">
              <h2 className="text-lg sm:text-2xl font-bold"> 
                = ${(quantity * productTotalPrice).toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="flex justify-center w-full gap-3 sm:items-start sm:w-auto">
            <Button className='w-32' onClick={addToCard} disabled={loading}>
              {loading 
              ? <LoaderCircle className="animate-spin" /> 
              : 
              <>
                <ShoppingBasket />
                <span>Add to cart</span>
              </>
              }
            </Button>
          </div>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  )
}

export default ProductItemDetail;