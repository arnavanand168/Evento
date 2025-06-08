import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Akshay Kumar",
    title: "Noida",
    image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    text: "My son's birthday was made special with Evento. Everything was seamlessly taken care of by them",
    rating: 5,
  },
  {
    name: "Ram Kapur",
    title: "Gurugram",
    image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    text: "From my engagemnent to wedding to reception, all things were pitch perfect, thanks to Evento",
    rating: 5,
  },
  {
    name: "Jenny Wilson",
    title: "Pune",
    image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
    text: "I cannot believe that so much was wrapped in such a cheap Anniversary Package! Thank you Evento!",
    rating: 5,
  },
  {
    name: "Amit Sharma",
    title: "Event Planner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Fantastic experience! The team was professional and made our event memorable.",
    rating: 5,
  },
  {
    name: "Priya Singh",
    title: "Bride",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Our wedding was magical thanks to their attention to detail and creativity.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    title: "Corporate Client",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "Seamless execution and great support throughout our corporate retreat.",
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 font-pj">
              2,157 people have said how good Evento is
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Our happy clients say about us
            </h2>
          </div>
          <div className="relative mt-10 md:mt-24 md:order-2 w-full">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={30}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="py-8"
              >
                {testimonials.map((t, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="testimonial-card bg-white p-6 lg:py-8 lg:px-7 rounded-xl shadow-xl w-full">
                      <div>
                        <StarRating count={t.rating} />
                        <blockquote className="mt-8">
                          <p className="testimonial-message text-gray-900 font-pj">
                            “{t.text}”
                          </p>
                        </blockquote>
                      </div>
                      <div className="flex items-center mt-8">
                        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={t.image} alt={t.name} />
                        <div className="ml-4">
                          <p className="text-base font-bold text-gray-900 font-pj">{t.name}</p>
                          <p className="mt-0.5 text-sm font-pj text-gray-600">{t.title}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
