import React from 'react'
import rArrow from "../images/right_arrow.svg"
import lArrow from "../images/left_arrow.svg"
import {useSelector} from "react-redux"

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const theme = useSelector(state => state.ui.theme)

  return (
    <div className='arrow-image'>
      <svg fill='currentColor' width="24" height="24" className={`${className} ${theme}-bg`}
        style={{ ...style, display: "block" }}
        onClick={onClick} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  const theme = useSelector(state => state.ui.theme)
  
  return (
    <div className='arrow-image'>
      <svg fill='currentColor' width="24" height="24" className={`${className} ${theme}-bg`}
        style={{ ...style, display: "block" }}
        onClick={onClick} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg>
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