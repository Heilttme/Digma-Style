import React, { useEffect, useState } from 'react'
import { Link, } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { v4 as uuidv4 } from 'uuid'
import ArrowSelect from './ArrowSelect'
import { t } from 'i18next'
import { useSelector } from 'react-redux'

export const CartCardSessionStorage = ({itemsState, item, setCartItems, removeItem, cartItems}) => {
  const [interManualCount, setInterManualCount] = useState(item.quantity)
  const [removed, setRemoved] = useState(false)
  const [exited, setExited] = useState(false)
  const [sizesShown, setSizesShown] = useState(false)
  const [newSize, setNewSize] = useState(item.size)
  const [allowedSizes, setAllowedSizes] = useState([])

  const theme = useSelector(state => state.ui.theme)

  useEffect(() => {
    let otherSizes = item.sizes.split(";")
    let unallowedSizes = cartItems.filter(elem => elem.id === item.id && elem.size !== item.size)
    if (unallowedSizes.length){
      unallowedSizes.map(elem => otherSizes.includes(elem.size) && otherSizes.splice(otherSizes.indexOf(elem.size), 1))
    }
    setAllowedSizes(otherSizes)
  }, [])

  const setQuantityManually = (value) => {
    let quantityValue = value === "" ? 1 : value
    quantityValue = quantityValue.length > 2 ? 99 : parseInt(quantityValue)
    quantityValue = parseInt(quantityValue) > 1 ? quantityValue : 1
    setInterManualCount(quantityValue)
  }

  const commitManualChange = () => {
    sessionStorage.setItem(`${item.id}-${item.size}`, JSON.stringify({...item, quantity: parseInt(interManualCount)}))
    setCartItems(prev => prev.map(el => (el.id === item.id && el.size === item.size) ? {...item, quantity: interManualCount} : el))
  }

  const changeClickQuantityDec = () => {
    sessionStorage.setItem(`${item.id}-${item.size}`, JSON.stringify({...item, quantity: item.quantity - 1 > 1 ? item.quantity - 1 : 1}))
    setCartItems(prev => prev.map(el => (el.id === item.id && el.size === item.size) ? {...item, quantity: item.quantity - 1 > 1 ? item.quantity - 1 : 1} : el))
  }

  const changeClickQuantityInc = () => {
    sessionStorage.setItem(`${item.id}-${item.size}`, JSON.stringify({...item, quantity: item.quantity + 1}))
    setCartItems(prev => prev.map(el => (el.id === item.id && el.size === item.size) ? {...item, quantity: item.quantity + 1 > 99 ? 99 : item.quantity + 1} : el))
  }

  const removeFromDomAnimation = () => {
    setRemoved(true)
    setTimeout(() => {
      setExited(true)
    }, 200)
    setTimeout(() => {
      removeItem(item.id, item.size)
    }, 400)
  }

  return (
    <AnimatePresence>
      <motion.div
        animate={removed ? exited ? {x: -400, opacity: 0, height: 0} : {x: -400, opacity: 0} : {}}
        transition={{ height: {duration: .25}, opacity: {duration: .1}, x: {duration: .35}}}
      >
        <div
          className={`cart-card cart-card-${item.id}`}
        >
          <Link className='image-wrapper-cta' to={`/items/${item.id}`}>
            <img src={require(`../images/clothes/${item.pictures["0"]}`)}/>
          </Link>
            <div className='name-item'>
              <p>{item.name}</p>
              <p>{item.brand}</p>
              <div className='select-wrapper'>
                <p className='size'>{t("Size")}:</p>
                <div className='select'>
                  {item.size && <option className='default' onClick={() => setSizesShown(prev => !prev)}>{newSize}</option>}
                  <AnimatePresence>
                    {sizesShown &&
                      <motion.div 
                        initial={{opacity: 0, y: "-50%"}}
                        animate={{opacity: 1, y: "0%"}}
                        exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
                        className="options"
                      >
                        {allowedSizes.map(el => newSize && (newSize !== el && <option key={uuidv4()} onClick={() => {
                          setNewSize(el)
                          setSizesShown(false)
                          sessionStorage.removeItem(`${item.id}-${item.size}`)
                          sessionStorage.setItem(`${item.id}-${el}`, JSON.stringify({...item, size: el}))
                          // let keys = []
                          // cartItems.map(elem => keys.push({id: elem.id, size: elem.size}))
                          // keys = [...new Set(keys)]
                          // if (keys){
                            // setCartItems(prev => {
                            //   let newArr = []
                            //   for (let i = 0; i < prev.length; i++) {
                            //     for (let j = 0; j < keys.length; j++) {
                            //       if (prev[i].id === keys.id && prev[i].size === keys.size) {
                            //         newArr.push(prev[i])
                            //       }
                            //     }
                            //   }
                            //   console.log(newArr);
                            //   return newArr
                            // })
                          //   setCartItems([])
                          // }
                          setCartItems(prev => prev.map(elem => (elem.id === item.id && elem.size === item.size) ? {...item, size: el} : elem))
                        }}>{el}</option>))}
                      </motion.div>
                    }
                  </AnimatePresence>
                  <ArrowSelect shownValue={sizesShown} setShownValue={setSizesShown} insetInlineEnd={"25px"} insetBlockStart={"4px"}/>
                </div>
              </div>
            </div>
            <div className='change-quantity'>
                <button className={`quantity ${theme}-bg`} onClick={changeClickQuantityDec}>
                  <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
                </button>
                <input type="number" maxLength="2" onBlur={commitManualChange} onChange={e => setQuantityManually(e.target.value)} value={interManualCount} className={`${theme}-bg`}/>
                <button className={`quantity ${theme}-bg`} onClick={changeClickQuantityInc}>
                  <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                </button>
            </div>
            <h1 className='price'>${item.price}</h1>
            <button className={`remove ${theme}-bg ${theme}-hover`} onClick={() => removeFromDomAnimation()}>
              <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
            </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
