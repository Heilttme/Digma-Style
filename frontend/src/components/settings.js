import React from 'react'
import rArrow from "../images/right_arrow.svg"
import lArrow from "../images/left_arrow.svg"

function SampleNextArrow(props) {
const { className, style, onClick } = props;
return (
    <img
    className={className}
    style={{ ...style, display: "block" }}
    onClick={onClick}
    src={rArrow}
    />
);
}

function SamplePrevArrow(props) {
const { className, style, onClick } = props;
return (
  <div className='arrow-image'>
    <img
    className={className}
    style={{ ...style, display: "block" }}
    onClick={onClick}
    src={lArrow}
    />
  </div>
);
}

export const setSettings = (items) => {
    return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: items,
        slidesToScroll: items,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: items == 1 ? 1 : 3,
              slidesToScroll: items == 1 ? 1 : 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: items == 1 ? 1 : 2,
              slidesToScroll: items == 1 ? 1 : 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
}