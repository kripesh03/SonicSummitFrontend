import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from '../products/ProductCard';


const Recommened = () => {
   

    const [products, setProducts] = useState([]);
      useEffect(() => {
        fetch("products.json")
          .then((res) => res.json())
          .then((
            data) => setProducts(data));
      }, []);


  return (
    <div className='py-16'>
         <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>


         <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {
                   products.length > 0 && products.slice(8, 18).map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard  product={product} />
                        </SwiperSlide>
                    ))
                }



            </Swiper>
    </div>
  )
}

export default Recommened