import Image from 'next/image';
import React from 'react'

function CategoryList({ categoryList }) {
  return (
    <div className='mt-5'>
      <h2 className='text-green-600 font-bold text-lg'>
        Shop by Category
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5 mt-2'>
        {categoryList.map((category, index) => (
          <div key={index} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200'>
            <Image 
              className='group-hover:scale-125 transition-all ease-in-out'
              src={category.attributes.image} 
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