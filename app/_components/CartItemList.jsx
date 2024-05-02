import { TrashIcon } from "lucide-react";
import Image from "next/image";

export function CartItemList({ cartItemList, onDeleteCartItem }) {

  return (
    <div className="h-[72vh] overflow-auto">
      <div>
        {cartItemList.map((cart, index) => (
          <div key={index} className="flex justify-between items-center p-2 mb-5">
            <div className="flex gap-6 items-center">
              <Image 
                className="border p-2"
                src={cart.image} 
                alt={cart.name}
                width={70} 
                height={70} 
                unoptimized
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>{`Quantity ${cart.quantity}`}</h2>
                <h2 className="text-lg font-bold">{`$${cart.amount}`}</h2>
              </div>
            </div>
            <TrashIcon 
              className="cursor-pointer" 
              onClick={() => onDeleteCartItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}