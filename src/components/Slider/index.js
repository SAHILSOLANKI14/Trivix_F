import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider = ({ children, settings }) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    centerPadding: "50px",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1444,
        settings: { slidesToShow: 3, centerPadding: "30px" },
      },
      {
        breakpoint: 1025,
        settings: { slidesToShow: 2, centerPadding: "80px" },
      },
      {
        breakpoint: 769,
        settings: { slidesToShow: 2, slidesToScroll: 1, centerPadding: "30px" },
      },
      {
        breakpoint: 450,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: "00px" },
      },
    ],
    ...settings,
  };
  if (settings) {
    return <Slider {...settings}>{children}</Slider>;
  } else {
    return <Slider {...defaultSettings}>{children}</Slider>;
  }
};

export default CustomSlider;
