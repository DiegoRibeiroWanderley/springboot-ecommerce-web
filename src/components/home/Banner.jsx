import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { bannerList } from '../../utils/bannerList';
import { Link } from 'react-router-dom';

const Banner = () => {
    const colors = ["bg-pink-300", "bg-orange-300", "bg-blue-300"]

    return (
        <div className='py-2 rounded-lg'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
                slidesPerView={1}
            >
                {bannerList.map((item, index) => (
                    <SwiperSlide>
                        <div className={`rounded-md sm:h-125 h-96 ${colors[index]}`}>
                            <div className='flex flex-col sm:flex-row items-center'>
                                <div className='text-center sm:ml-100 sm:mt-8'>
                                    <h3 className='text-3xl text-white font-bold mt-2'>
                                        {item.title}
                                    </h3>
                                    <h1 className='text-5xl text-white font-bold mt-2'>
                                        {item.subtitle}
                                    </h1>
                                    <p className='text-white font-bold mt-4'>
                                        {item.description}
                                    </p>
                                    <div>
                                        <Link to={"/products"}
                                            className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800'>
                                            Shop
                                        </Link>
                                    </div>
                                </div>
                                <div className='flex justify-center sm:ml-90 sm:max-h-100 sm:max-w-150 sm:mt-9 max-h-50 max-w-75'>
                                    <img src={item?.image}></img>
                                </div>
                            </div> 
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Banner