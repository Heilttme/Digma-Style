import React, { useEffect, useState, useRef } from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import HomeCard from './HomeCard'
import Slider from "react-slick"
import Explore from './Explore'

import amiriHome from "../images/home_page/amiri_home.jpg"
import {setSettings} from "./settings"
import axios from 'axios'
import {motion} from "framer-motion"
import { t } from 'i18next'
import { useSelector } from 'react-redux'


function Home({addToFavorited, addToCart}) {
  const [popularItemsToDisplay, setPopularItemsToDisplay] = useState([])
  const [sliderDisplayArray, setSliderDisplayArray] = useState([])

  const theme = useSelector(state => state.ui.theme)

  useEffect(() => {
    for (let i = 0; i < popularItemsToDisplay.length; i++) {
      setSliderDisplayArray(prev => [...prev, popularItemsToDisplay[i]])
    }
  }, [popularItemsToDisplay])

  useEffect(() => {
    const getPopularItems = () => {
      const response = axios.get("/api/items/")
      .then(data => setPopularItemsToDisplay(data.data.items))
    }
    getPopularItems()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  useEffect(() => {
    const indexes = []
    if (popularItemsToDisplay.length !== 0) {
      while (indexes.length < (popularItemsToDisplay.length > 16 ? 16: popularItemsToDisplay.length)) {
        const index = Math.floor(Math.random() * popularItemsToDisplay.length)
        if (!indexes.includes(index)) {
          indexes.push(index)
        }
      }
  
      const newAr = []
  
      for (let i = 0; i < indexes.length; i++) {
        newAr.push(<HomeCard addToFavorited={addToFavorited} addToCart={addToCart} item={popularItemsToDisplay[indexes[i]]}/>)
      }
  
      setSliderDisplayArray(newAr)
      // setSliderDisplayArray(popularItemsToDisplay.map((item, index) => <div><HomeCard addToFavorited={addToFavorited} addToCart={addToCart} key={index} item={item}/></div>))
    }
  }, [popularItemsToDisplay])



  return (
    <div className={`main home ${theme}-bg`}>
      <motion.div
        initial={{opacity: 0}} 
        animate={{opacity: 1}}
        transition={{duration: .3, delay: .3}}
        className='popular-items'
      >
        <Slider {...setSettings(4)}>
          {sliderDisplayArray}
        </Slider>
      </motion.div>

      <div className='additional'>
        <Explore 
          align="left" 
          imgUrl={amiriHome} 
          title={t("ExploreNewAmiriStock")} 
          info={t("NewAmiriClothesNowInDigmaStyleShop")} 
          delay={.5}
        />
        <Explore 
          align="right" 
          imgUrl={amiriHome} 
          title={t("ExploreNewAmiriStock")}
          info={t("NewAmiriClothesNowInDigmaStyleShop")} 
          delay={.8}
        />
        <Explore 
          align="left" 
          imgUrl={amiriHome} 
          title={t("ExploreNewAmiriStock")} 
          info={t("NewAmiriClothesNowInDigmaStyleShop")} 
          delay={1.1}
        />
      </div>
    </div>
  )
}

export default Home