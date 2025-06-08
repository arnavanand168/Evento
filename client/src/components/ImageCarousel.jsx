import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useAppContext } from '../context/AppContext';
const images = [
  '/destwed1.jpg',
  '/destwed2.webp',
  '/destwed4.jpg',
  '/destwed5.webp',
  '/destwed3.webp',
];

const SignUpCard = () => (
  <div className="relative z-10 bg-white/95 shadow-2xl rounded-2xl p-8 w-[340px] md:w-[400px] h-[500px] flex flex-col items-center mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
    <p className="text-sm text-gray-500 mb-5 text-center">Create your Evento account to get started</p>
    <form className="w-full flex flex-col gap-4 flex-grow">
      <input type="text" placeholder="Full Name" className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary" required />
      <input type="phone" placeholder="Mobile No." className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary" required />
      <input type="email" placeholder="Email" className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary" required />
      <input type="password" placeholder="Password" className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary" required />
      <button type="submit" className="bg-primary text-white rounded-full py-2 font-medium mt-2 hover:bg-primary-dull transition">
        Sign Up
      </button>
    </form>
    <p className="text-xs text-gray-500 mt-4">
      Already have an account? <a className="text-primary hover:underline" >Login</a>
    </p>
  </div>
);

const ImageCarousel = () => {
  const { user } = useAppContext();

  return (
    <div className="w-full mt-4 relative flex items-center justify-end">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={2}
        className="w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="h-[500px]">
            <img src={src} alt={`slide-${index}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      {!user && (
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none">
          <div className="pointer-events-auto">
            <SignUpCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
