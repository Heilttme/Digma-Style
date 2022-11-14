import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Slider from "react-slick"
import {setSettings} from "./settings"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {AnimatePresence, motion} from "framer-motion"
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import ArrowSelect from "./ArrowSelect"
import { t } from 'i18next'
import useScrollBlock from "./useScrollBlock.js"

function Item({addToCart, addToFavorited, cartAnimated, cartCancelAnimated, favoriteAnimated, favoriteCancelAnimated}) {
  const [heartHovered, setHeartHovered] = useState(false)
  const [itemData, setItemData] = useState({
    id: null,
    brand: null,
    name: null,
    pictures: {},
    price: null,
    sizes: null,
    reviews: null,
    curSize: null
  })
  const {id} = useParams()
  const [sizesShown, setSizesShown] = useState(false)

  const [isModel, setIsModel] = useState(false)
  const [modelImg, setModelImg] = useState("")
  const [blockScroll, allowScroll] = useScrollBlock()

  const isLoggedIn = useSelector(state => state.user.isLoggedin)

  const theme = useSelector(state => state.ui.theme)

  const navigate = useNavigate()

  useEffect(() => {
    const getItem = async() => {
      const response = await fetch(`/api/items/${id}`)
      const data = await response.json()
      setItemData({...data.get, curSize: null})
    } 
    getItem()
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const setModel = (image) => {
    setIsModel(true)
    setModelImg(image)
    blockScroll()
  }

  const unsetModel = () => {
    setIsModel(false)
    setModelImg("")
    allowScroll()
  }

  const items = Object.values(itemData.pictures).map((item) => <img key={`pic-${uuidv4()}`} onClick={() => setModel(item)} src={require(`../images/clothes/${item}`)} />)
 
  return (
    <div className='item'>

      <AnimatePresence>
        {isModel &&
          <motion.div
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}}
            transition={{duration: .1}}
            onClick={unsetModel}
            className='model-image'
          >
            <ImageMagnifier onClick={() => console.log("312123")} src={require(`../images/clothes/${modelImg}`)}/>
          </motion.div>
        }
      </AnimatePresence>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: .5, delay: .3}}
        className='photos'
      >
        <Slider {...setSettings(1)}>
          {items}
        </Slider>
      </motion.div>
      <div className='info'>
        <h1>{itemData.name}</h1>
        <h3>{itemData.brand}</h3>
        <strong>${itemData.price}</strong>
        <p>{t("FreeDelivery")}</p>
        <div className='make-order'>
        <div className='select-item'>
          <option className='default' onClick={() => setSizesShown(prev => !prev)}>{itemData.curSize === null ? t("SelectSize") : itemData.curSize}</option>
          {/* {itemData.curSize && <option className='default' onClick={() => setSizesShown(prev => !prev)}>{itemData.curSize === null ? t("SelectSize") : itemData.curSize}</option>} */}
          <AnimatePresence>
            {sizesShown &&
              <motion.div 
                initial={{opacity: 0, y: "-50%"}}
                animate={{opacity: 1, y: "0%"}}
                exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
                className="options"
              >
                {itemData.sizes.split(";").map(el => (itemData.curSize !== el && <option key={uuidv4()} onClick={() => {
                // {itemData.sizes.split(";").map(el => itemData.curSize && (itemData.curSize !== el && <option key={uuidv4()} onClick={() => {
                  setItemData(prev => ({...prev, curSize: el}))
                  setSizesShown(false)
                }}>{el}</option>))}
              </motion.div>
            }
          </AnimatePresence>
          <ArrowSelect shownValue={sizesShown} setShownValue={setSizesShown} insetInlineEnd={"40px"} insetBlockStart={"0px"}/>
        </div>
            <button
              onClick={() => addToCart({...itemData, size: itemData.curSize})}
              className={`cart-btn`}>
                <motion.div 
                  animate={cartAnimated ? {x: -200} : {}}
                  transition={{x: {type: "spring", duration: .5}}}
                >
                  <motion.h3 animate={{x: cartCancelAnimated ? 20 : 0}}>{t("AddToCart")}</motion.h3>
                  <motion.svg animate={{x: cartCancelAnimated ? 20 : 0}} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-10.563-5l-2.937-7h16.812l-1.977 7h-11.898zm11.233-5h-11.162l1.259 3h9.056l.847-3zm5.635-5l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></motion.svg>
                  <AnimatePresence>
                    {cartAnimated && 
                      <motion.svg className="tick" initial={{x: 200}} animate={{left: "100%", top: "50%"}} exit={{x: 250}} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></motion.svg>
                    }
                  </AnimatePresence>
                </motion.div>
            </button>
            <button 
              className='heart-btn' 
              onMouseEnter={() => setHeartHovered(true)} 
              onMouseLeave={() => setHeartHovered(false)} 
              onClick={() => isLoggedIn ? addToFavorited(itemData) : navigate("/login")} 
            >
                <motion.h3 animate={{x: favoriteCancelAnimated ? 20 : 0}}>{t("AddToFavorites")}</motion.h3>
                {/* {favItemsList.filter(elem => elem.id === itemData.id) ? :} */}
                <motion.div
                  className='heart-wrapper'
                  animate={{scale: favoriteAnimated ? 1.3 : 1, x: favoriteCancelAnimated ? 20 : 0}}
                >
                  <motion.svg 
                    className='filled'
                    initial={{opacity: 0}} 
                    animate={{opacity: heartHovered ? 1 : 0}} 
                    fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></motion.svg>
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>
                </motion.div>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Item


const ImageMagnifier = ({
  src,
  width,
  height = 600,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 2
}) => {

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  
  return (
    <div
      style={{
        position: "relative",
        maxHeight: 600,
        width: width
      }}
    >
      <img
        src={src}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseLeave={() => setShowMagnifier(false)}
        style={{ height: height, width: width }}

        onMouseMove={(e) => {
          const elem = e.currentTarget
          const { top, left } = elem.getBoundingClientRect()
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y])
        }}
        alt={"img"}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
  
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
        }}
      >

      </div>
    </div>
  );
}