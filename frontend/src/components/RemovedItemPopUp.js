import React, { useState, useMemo } from 'react'
import heart from "../images/heart.svg"
import filledHeart from "../images/filled_heart.svg"
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const RemovedItemPopUp = ({item, setRemovedItemsPopUps, addToFavorited}) => {
  const [heartHovered, setHeartHovered] = useState(false)
  const [itemRemoved, setItemRemoved] = (useState(false))

  setTimeout(() => {
    setItemRemoved(true)
  }, 20000)

  setTimeout(() => {
    setRemovedItemsPopUps(prev => prev.filter(el => el.id !== item.id))
  }, 60000) 
  
  return (
    <motion.div
      animate={itemRemoved ? {x: 400, opacity: 0, display: "none", height: 0} : {}}
      transition={{opacity: {duration: .3, delay: .5}, x: {duration: .5, delay: .5}, display: {delay: 1.1}, height: {duration: .3}}}
      className='removed-wrapper'
    >
      <div className='pop-up-item'>
        <img className='image' src={require(`../images/clothes/${item.pictures["0"]}`)}/>
        <button
          onMouseEnter={() => setHeartHovered(true)}
          onMouseLeave={() => setHeartHovered(false)}
          onClick={() => {
            addToFavorited({...item})
            setRemovedItemsPopUps(prev => prev.filter(el => el.id !== item.id))
          }}
        >
          <img src={filledHeart} />
          <AnimatePresence>
              {heartHovered &&
                <motion.img 
                  initial={{opacity: 0}} 
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  className='filled' 
                  src={heart}
                />}
          </AnimatePresence>
        </button>
        <motion.div 
          initial={{width: "100%"}}
          animate={{width: 0}}
          transition={{type: "tween", duration: 19}}
          className="progress-bar"
        />
      </div>
    </motion.div>
  )
}

export default RemovedItemPopUp