import React, { useEffect, useReducer, useState } from 'react'
import  CartCardDataBase  from './CartCardDataBase'
import { CartCardSessionStorage } from './CartCardSessionStorage'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { userActions } from '../store/userSlice';
import bag from "../images/bag.svg"
import axios from 'axios';
import { t } from 'i18next'
import { Link } from 'react-router-dom';

export const Cart = ({cartItems, setCartItems}) => {
    const isLoggedin = useSelector(state => state.user.isLoggedin)
    const email = useSelector(state => state.user.email)

    useEffect(() => {
        if (isLoggedin) {
            if (!cartItems.length) {
                // Object.keys(cart).forEach(key => {
                //     const item = cart[key]
                //     setCartItems(prev => ([...prev, {...item, quantity: item.quantity}]))
                // })
            }
        } else {
            if (sessionStorage) {
                const newCart = []
                Object.keys(sessionStorage).forEach(key => {
                    const item = JSON.parse(sessionStorage.getItem(key))
                    newCart.push(item)
                })
                setCartItems(newCart)
            }
        }
    }, [isLoggedin]) // cart

    const changeQuantityStateBackEndDec = (item) => {
        setCartItems(prev => prev.map(el => (el.id === item.id && el.size === item.size) ? {...item, quantity: item.quantity - 1 > 1 ? item.quantity - 1 : 1} : el))
        const res = axios.post("/authentication/set_quantity/", {id: item.id, quantity: item.quantity - 1 > 1 ? item.quantity - 1 : 1, email, size: item.size})
    }

    const changeQuantityStateBackEndAdd = (item) => {
        setCartItems(prev => prev.map(el => (el.id === item.id && el.size === item.size) ? {...item, quantity: item.quantity + 1 > 99 ? 99 : item.quantity + 1 } : el))
        const res = axios.post("/authentication/set_quantity/", {id: item.id, quantity: item.quantity + 1 > 99 ? 99 : item.quantity + 1, email, size: item.size})
    }

    const changeQuantityManuallyBackEnd = (item, quantity) => {
        setCartItems(prev => prev.map(el => (el.id === item.id && el.size === item.size) ? {...item, quantity} : el))
        const res = axios.post("/authentication/set_quantity/", {id: item.id, quantity, email, size: item.size})
    }

    const setNewSizeBackEnd = (item, size) => {
        const res = axios.post("/authentication/set_cart_size/", {id: item.id, sizeToSet: size, curSize: item.size, email})
        setCartItems(prev => prev.map(elem => (elem.id === item.id && elem.size === item.size) ? {...item, size} : elem))
    }

    const removeItem = (id, size) => {
        if (isLoggedin) {
            const res = axios.post("/authentication/delete_item/", {email, id, size})
                .then(data => data.status === 200 && setCartItems(prev => {
                   let arr = []
                   prev.map(item => {
                    if (item.id !== id){
                        arr.push(item)
                    } else{
                        if (item.size !== size){
                            arr.push(item)
                        }
                    }
                   }) 
                   return arr
                }))
        } else {
            if (sessionStorage) {
                const newCart = []
                sessionStorage.removeItem(`${id}-${size}`)
                Object.keys(sessionStorage).forEach(key => {
                    const item = JSON.parse(sessionStorage.getItem(key))
                    newCart.push(item)
                })
                setCartItems(newCart)
            }
        }
    }

    const items = cartItems && cartItems.map(item => {
        return isLoggedin ? 
                <CartCardDataBase 
                  key={uuidv4()} 
                  item={item} 
                  changeQuantityStateBackEndDec={changeQuantityStateBackEndDec} 
                  changeQuantityStateBackEndAdd={changeQuantityStateBackEndAdd} 
                  removeItem={removeItem} 
                  changeQuantityManuallyBackEnd={changeQuantityManuallyBackEnd} 
                  setCartItems={setCartItems}
                  setNewSizeBackEnd={setNewSizeBackEnd}  
                />
            :   
                <CartCardSessionStorage
                  key={uuidv4()}
                  item={item} 
                  setCartItems={setCartItems} 
                  cartItems={cartItems}
                  removeItem={removeItem} 
                />
    })

    return (
        <div className='cart'>
            <div className='wrapper'>
                <h1 className='title'>{t("YourShoppingCart")}</h1>
                {cartItems.length ? 
                <>
                    <div className='cart-items'>
                        <div className='head'>
                            <p className='item-h'>{t("Item")}</p>
                            <p className='item-q'>{t("Quantity")}</p>
                            <p className='item-p'>{t("Price")}</p>
                        </div>
                        {items}
                    </div>
                    <div className='summary'>
                        <h1>{t("Summary")}</h1>
                        <div className='subtotal'>
                            <p>{t("Subtotal")}</p>
                            <p className='subtext'>$200</p>
                        </div>
                        <div className='subtotal'>
                            <p>{t("Shipping")}</p>
                            <p className='subtext'>{t("Free")}</p>
                        </div>
                        <div className='subtotal'>
                            <p>{t("Total")}</p>
                            <p className='subtext'>Total</p>
                        </div>
                        <button>{t("Checkout")}</button>
                    </div>
                </>
                : 
                <EmptyCart/>
                }
            </div>
        </div>
    )
}

const EmptyCart = () => {
  return (
    <div className='empty-cart'>
        <div className='image'>
            <img width={96} src={bag}/>
        </div>
        <div className='right-col'>
            <p>{t("WhoopsEmptyCart")}</p>
            <div className='cta-buttons'>
                <Link to="/browse">{t("BrowseItems")}</Link>
            </div>
        </div>
    </div>
  )
}
