import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heart from "../images/heart.svg"
import filledHeart from "../images/filled_heart.svg"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

function HomeCard({item, addToFavorited}) {
  const imgUrl = item.pictures[0]
  const brand = item.brand
  const name = item.name
  const priceUSD = item.price
  const id = item.id
  const favorited = useSelector(state => state.user.favorited)
  const favItemsList = Object.values(favorited)
  const theme = useSelector(state => state.ui.theme)

  const [itemHovered, setItemHovered] = useState(false)
  const [heartHovered, setHeartHovered] = useState(false)
  const [inFavorited, setInFavorited] = useState(false)

  useEffect(() => {
    favItemsList.map(elem => elem.id === id && setInFavorited(true))
  }, [favorited])

  const checkIfItemIsInItemsList = () => {
    for (let i = 0; i < favItemsList.length; i++) {
        if (favItemsList[i].id === id) {
            return true
        }
    }
    return false
  }
  
  return (
    <Link 
      onClick={heartHovered ? (e) => e.preventDefault() : null} 
      to={`/items/${id}`} 
      className={`home-card ${theme}-bg`}
    >
      <div onMouseEnter={() => setItemHovered(true)} onMouseLeave={() => setItemHovered(false)} className='image'>
        <img className='cloth-item' src={require(`../images/clothes/${imgUrl}`)}></img>
        {(itemHovered || inFavorited) &&
          <motion.div
            initial={{opacity: 0}} 
            animate={{opacity: 1}}
            className='buttons'
          >
            <button 
              className="cta-like" 
              onMouseEnter={() => setHeartHovered(true)}
              onMouseLeave={() => setHeartHovered(false)}
              onClick={() => {
                addToFavorited(item)
              }}
            >
              <img src={heart}></img>
              <motion.img 
                initial={{opacity: 0}} 
                animate={{opacity: (heartHovered || inFavorited) ? 1 : 0}} 
                className='filled' 
                src={filledHeart}
              />
            </button>
          </motion.div>
        }
      </div>
      <div className='text-info'>
        <h1>{brand}</h1>
        <h3>{name}</h3>
        <h4>${priceUSD}</h4>
      </div>
    </Link>
  )
}

export default HomeCard