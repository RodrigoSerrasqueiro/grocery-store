import Image from 'next/image';
import React from 'react'

function CategoryList({ categoryList }) {
  return (
    <div className='mt-5'>
      <h2 className='text-green-600 font-bold text-lg'>
        Shop by Category
      </h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2'>
        {categoryList.map((category, index) => (
          <div key={index} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200'>
            <Image 
              className='group-hover:scale-125 transition-all ease-in-out'
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.attributes?.icon?.data[0]?.attributes?.url}`} 
              alt='category icon'
              width={50}
              height={50}
              unoptimized
            />
            <h2 className='text-green-800'>
              {category.attributes.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList;