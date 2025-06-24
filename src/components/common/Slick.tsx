// components/common/SimpleSlider.tsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface SimpleSliderProps {
  images: { id: number; image: string }[];
}

export default function SimpleSlider({ images }: SimpleSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const openImage = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Slider {...settings}>
      {images.map((img) => (
        <div key={img.id} className="cursor-pointer">
          <img
            src={img.image}
            alt={`screenshot-${img.id}`}
            className="w-full h-[250px] object-cover rounded"
            onClick={() => openImage(img.image)} // 클릭 시 새 탭으로 열기
          />
        </div>
      ))}
    </Slider>
  );
}
