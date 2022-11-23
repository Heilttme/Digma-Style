import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import cart from "../images/cart.svg"
import heart from "../images/heart.svg"
import filledHeart from "../images/filled_heart.svg"
import { AnimatePresence, motion} from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice'
import axios from 'axios'

const FavCard = ({item, favoriteItems, removeFromFavorited, setFavoriteItems, setRemovedItemsPopUps}) => {
    const imgUrl = item.pictures[0]
    const id = item.id
    const brand = item.brand
    const name = item.name
    const priceUSD = item.price
    const priceRUB = item.price
    
    const [removedHeart, setRemovedHeart] = useState(false)
    const [heartHovered, setHeartHovered] = useState(false)
    const [itemRemoved, setItemRemoved] = useState(false)

    const [removed, setRemoved] = useState(false)
    const [exited, setExited] = useState(false)

    const email = useSelector(state => state.user.email)

    // const removeFromDomAnimation = () => {
    //     setRemoved(true)
    //     setTimeout(() => {
    //       setExited(true)
    //     }, 200)
    //     setTimeout(() => {
    //     //   removeItem(item.id, item.size)
    //     }, 400)
    //}
 
    const addToFavorited = () => {
        const checkIfItemIsInItemsList = () => {
            for (let i = 0; i < favoriteItems.length; i++) {
                if (favoriteItems[i].id === id) {
                    return true
                }
                }
                return false
            }

        if (!checkIfItemIsInItemsList()){
            setRemovedHeart(true)
            setHeartHovered(false)
            setItemRemoved(true)

            setTimeout(() => {
                let itemsObj = {}
                let itemsObjToDb = {}
                for (let i = 0; i < favoriteItems.length; i++){
                    if (favoriteItems[i].id !== id){
                        itemsObj = {...itemsObj, [favoriteItems[i].id]: favoriteItems[i]}
                        itemsObjToDb = {...itemsObjToDb, [favoriteItems[i].id]: favoriteItems[i].id}
                    }
                }
                const res = email && itemsObjToDb && axios.post("/authentication/set_favorited/", {favorited: itemsObjToDb, email})
                // setRemovedItemsPopUps(prev => [...prev, favoriteItems.filter(el => el.id === id)[0]])
            }, 350)
        } else {
            setRemovedHeart(false)
            setHeartHovered(true)
            setRemovedItemsPopUps(prev => [...prev, favoriteItems.filter(el => el.id === id)[0]])
            setFavoriteItems(prev => {
                const newArr = []
                let itemsObjToDb = {}
                for (let i = 0; i < prev.length; i++){
                  if (prev[i].id !== item.id) {
                    newArr.push(prev[i])
                    itemsObjToDb = {...itemsObjToDb, [prev[i].id]: prev[i].id}
                }
                }
                const res = email && itemsObjToDb && axios.post("/authentication/set_favorited/", {favorited: itemsObjToDb, email})
                return newArr
              })
        }
    }

    return (
        <>
            <motion.div 
                animate={itemRemoved ? {display: "none"} : {}}
                transition={{duration: .3}}
            >
                <Link onClick={heartHovered ? (e) => e.preventDefault() : null} to={`/items/${id}`} className='home-card'>
                    <div className='image'>
                        <img className='cloth-item' src={require(`../images/clothes/${imgUrl}`)}></img>
                        <div className='buttons'>
                            <button 
                                className="cta-like"
                                to='/feautured'
                                onMouseEnter={!removedHeart ? () => setHeartHovered(true) : () => {}}
                                onMouseLeave={!removedHeart ? () => setHeartHovered(false) : () => {}}
                                onClick={addToFavorited}
                            >
                                <img src={filledHeart}></img>
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
                        </div>
                    </div>
                    <div className='text-info'>
                    <h1>{brand}</h1>
                    <h3>{name}</h3>
                    <h4>${priceUSD}</h4>
                    </div>
                </Link>
            </motion.div>
        </>
    )
}

export default FavCard