import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from "framer-motion"
import ArrowSelect from './ArrowSelect'
import { t } from "i18next"

const CartCardDataBase = ({itemsState, cartItems, item, setNewSizeBackEnd, changeQuantityStateBackEndDec, changeQuantityStateBackEndAdd, removeItem, changeQuantityManuallyBackEnd}) => {
  const [interManualCount, setInterManualCount] = useState(item.quantity)
  const [removed, setRemoved] = useState(false)
  const [exited, setExited] = useState(false)
  const [sizesShown, setSizesShown] = useState(false)
  const [newSize, setNewSize] = useState(item.size)
  const [allowedSizes, setAllowedSizes] = useState([])

  const email = useSelector(state => state.user.email)

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
    quantityValue = parseInt(quantityValue) > 1 ? parseInt(quantityValue) : 1
    quantityValue = quantityValue > 99 ? 99 : quantityValue
    setInterManualCount(quantityValue)
  }

  const changeClickQuantityDec = () => {
    changeQuantityStateBackEndDec(item)
  }

  const changeClickQuantityInc = () => {
    changeQuantityStateBackEndAdd(item)
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
                          setNewSizeBackEnd(item, el)
                          setNewSize(el)
                          setSizesShown(false)
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
                <input type="number" onBlur={() => changeQuantityManuallyBackEnd(item, interManualCount)} onChange={e => setQuantityManually(e.target.value)} value={interManualCount} className={`${theme}-bg`}/>
                <button className={`quantity ${theme}-bg`} onClick={changeClickQuantityInc}>
                  <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                </button>
            </div>
            <h1 className='price'>${item.price}</h1>
            <button className='remove' onClick={removeFromDomAnimation}>
              <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
            </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CartCardDataBase