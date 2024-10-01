import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { leftArrow, rightArrow } from '../../../assets';
import endpoint from '../../../config/config';

export default function CaseEventSwiper({ images }) {

  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        slidesPerView={3}
        loop={true}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        className='EventSwiper'
      >
        {
          images?.map((item, index) => (

            <SwiperSlide key={index} className='swiperAuto' ><img src={`${endpoint}/uploads/cases/${item}`} alt={index} className='eventImg' /></SwiperSlide>
          ))
        }
      </Swiper>
      <div className="custom-prev"><img src={leftArrow} alt='leftArrow' /></div>
      <div className="custom-next"><img src={rightArrow} alt='rightArrow' /></div>
    </div>
  );
}
