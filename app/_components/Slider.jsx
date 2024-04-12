import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Image from 'next/image';


function Slider({ sliderList }) {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <Image
              className='w-full h-[150px] md:h-[400px] rounded-2xl sm:object-cover' 
              src={slider.attributes.image} 
              alt='banner'
              width={1000}
              height={400}
              unoptimized
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Slider;