import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

function ProductItem({ product }) {
  return (
    <div 
      className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer'
    >
      <Image 
        className='h-[200px] w-[200px] object-contain'
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product?.attributes?.images?.data[0]?.attributes?.url}`} 
        alt={product.attributes.name} 
        width={500}
        height={200}
        unoptimized
      />
      <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
      <div className='flex gap-3'>
        {product.attributes.sellingPrice &&
          <h2 className='font-bold text-lg'>{product.attributes.sellingPrice}</h2>
        }
        <h2 className={`font-bold text-lg ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>
          ${product.attributes.mrp}
        </h2>
      </div>
      <Button
        className="text-primary hover:text-white hover:bg-primary"
        variant='outline'>Add to cart
      </Button>
    </div>
  )
}

export default ProductItem;