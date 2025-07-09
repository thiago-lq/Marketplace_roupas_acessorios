import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.css";



export default function Carousel({ products }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto h-64 sm:h-80 md:h-96 xl:h-[40rem] overflow-hidden rounded-xl shadow-md">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {products
          .slice(0, 10) // Limita a 20 produtos
          .map((product) => (
            <SwiperSlide key={product.id} className="h-full">
              <div className="relative w-full h-full overflow-hidden rounded-lg aspect-[5/2]">
                <img
                  src={product.imagem} // ← Usando campo correto vindo do Firebase
                  alt={product.nome}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
