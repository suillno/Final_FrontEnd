import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import bannerImg from "../../img/banner.png";

// types/banner.d.ts
export interface BannerItem {
  id: number;
  text: string;
  image: string;
}

// 배너 슬라이드 형태
export const Banners: BannerItem[] = [
  {
    id: 1,
    text: "게임 구매의 현명한 선택!",
    image: bannerImg,
  },
  {
    id: 2,
    text: "최신 게임 할인 중!",
    image: bannerImg,
  },
  {
    id: 3,
    text: "RickGame에서 지금 확인하세요!",
    image: bannerImg,
  },
];

export const StyledSlider = styled(Slider)`
  width: 100%;
  height: 200px;
  position: relative; /* 꼭 필요 */
  z-index: 1; /* 콘텐츠 위에 있도록 */

  @media (max-width: 768px) {
    height: 180px;
  }

  .slick-slide div {
    outline: none;
  }
`;

export const Slide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const BannerText = styled.div`
  position: absolute;
  bottom: 30px;
  left: 40px;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
`;

interface BannerSliderProps {
  banners: BannerItem[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <StyledSlider {...settings}>
      {banners.map((banner) => (
        <Slide key={banner.id}>
          <BannerImage src={banner.image} alt={banner.text} />
          <BannerText>{banner.text}</BannerText>
        </Slide>
      ))}
    </StyledSlider>
  );
};

export default BannerSlider;
