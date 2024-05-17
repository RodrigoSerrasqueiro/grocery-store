import Image from "next/image";

function OrderItemComponent({ orderItem }) {
  return (
    <div className="w-full md:w-[60%]">
      <div className="grid grid-cols-2 md:grid-cols-5 mt-3 items-center">
        <Image 
          src={orderItem.product.data.attributes.image} 
          alt={orderItem.product.data.attributes.name} 
          width={80}
          height={80}
          className="bg-gray-100 p-5 rounded-md border w-[80px] h-[80px]"
        />
        <div className="md:col-span-2">
          <h2>{orderItem.product.data.attributes.name}</h2>
          <h2>
            Item Price:
            {` $${orderItem.product.data.attributes.sellingPrice}`}
          </h2>
        </div>
        <h2 className="">Quantity: {` ${orderItem.quantity}`}</h2>
        <h2>Amount: {` $${orderItem.amount}`}</h2>
      </div>
      <hr className="mt-3"></hr>
    </div>
  )
}

export default OrderItemComponent;