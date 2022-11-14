import React, { useState, useEffect, useCallback } from 'react'
import magnifier from "../images/magnifier.svg"
import heart from "../images/heart.svg"
import cart from "../images/cart.svg"
import russianFlag from "../images/russian_flag.svg"
import ukFlag from "../images/uk_flag.svg"
import { Link, Navigate } from "react-router-dom"
import { motion, AnimatePresence } from 'framer-motion'
import {useSelector, useDispatch} from "react-redux"
import userSlice, { userActions } from '../store/userSlice'
import SearchItems from "./SearchItems"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next'

function Header({itemsState, setFadeScreen, changeLanguage, i18n}) {
  const [flagHovered, setFlagHovered] = useState(false)
  const [userHovered, setUserHovered] = useState(false)
  const [browseHovered, setBrowseHovered] = useState(false)
  const [navigateToSearch, setNavigateToSearch] = useState(false)

  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const [browseParams, setBrowseParams] = useState({clothing: [], shoes: [], brands: []})

  const username = useSelector(state => state.user.isLoggedin ? state.user.username : "")
  const isLoggedin = useSelector(state => state.user.isLoggedin)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    const res = axios.post("/authentication/login/", {login: "logout"}, {withCredentials: true})
    .then(data => {
      if (data.data.message === "success") {
        dispatch(userActions.logout(false))
        setUserHovered(false)
        setFadeScreen(false)
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setBrowseParams({
      clothing: [...new Set(itemsState.map(item => item.info.type === "clothing" && item.info.category))],
      shoes: [...new Set(itemsState.map(item => item.info.type === "shoes" && item.info.category))],
      brands: [...new Set(itemsState.map(item => item.brand))]
    })
  }, [itemsState])

  if (navigateToSearch) {
    navigate(`search?${searchValue}`)
    setFadeScreen(false)
    setSearchFocused(false)
    setNavigateToSearch(false)
  }


  return (
    <header>
        <nav>
          <ul className='ul-header'>
            <li className='search top-nav-content'>
              <div
                onMouseEnter={() => {setFadeScreen(true); setBrowseHovered(true)}} 
                onMouseLeave={() => {!searchFocused && setFadeScreen(false); setBrowseHovered(false)}}
              >
                <span>
                  <Link to="/browse">{t("Browse")}</Link>
                  <AnimatePresence>
                    {browseHovered && 
                        <motion.ul
                          key="browse"
                          className='categories'
                          initial={{opacity: 0, y: "-50%"}}
                          animate={{opacity: 1, y: "0%"}}
                          exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
                          transition={{type: "keyframes", duration: "0.15"}}
                        >
                          <li className='category-wrapper'>
                            <Link className='header-category' to='#'>{t("Sales")}</Link>
                            <ul className='category-items'>
                              <li><Link to="#">Amiri</Link></li>
                              <li><Link to="#">Adidas</Link></li>
                              <li><Link to="#">Stone Island</Link></li>
                            </ul>
                          </li>
                          <li className='category-wrapper'>
                            <Link className='header-category' to="browse/clothing">{t("Clothing")}</Link>
                            <ul className='category-items'>
                              {browseParams.clothing.map(item => item !== false &&  <li><Link to={`browse/clothing/${item}`}>{item}</Link></li>)}
                            </ul>
                          </li>
                          <li className='category-wrapper'>
                            <Link className='header-category' to="browse/shoes">{t("Shoes")}</Link>
                            <ul className='category-items'>
                              {browseParams.shoes.map(item => item !== false && <li><Link to={`browse/shoes/${item}`}>{item}</Link></li>)}
                            </ul>
                          </li>
                        </motion.ul>
                    }
                  </AnimatePresence>
                </span>
              </div>
              <ul className='ul-search'>
                <li className='search-container'>
                  <input
                    onFocus={() => {setFadeScreen(true); setTimeout(() => setSearchFocused(true), 400)}}
                    onBlur={() => {setFadeScreen(false); setTimeout(() => setSearchFocused(false), 400)}}
                    onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
                    value={searchValue}
                    onKeyDown={(event) => {
                      if(event.key === 'Enter') {
                        setNavigateToSearch(true)
                      }
                  }}
                    placeholder={t("Search")}
                  />
                <li
                  className='li-magnifier'
                  onClick={() => setNavigateToSearch(true)}
                ><img src={magnifier}/></li>
                  <AnimatePresence>
                  {searchValue && searchFocused && 
                      <SearchItems setSearchValue={setSearchValue} itemsState={itemsState} searchValue={searchValue}/>
                  }
                  </AnimatePresence>
                </li>
              </ul>
            </li>
            <li className='top-nav-content'><Link to='/' className='logo'>Digma Style</Link></li>
            <li className='login-language-card-liked top-nav-content'>
              <ul>
                <li>
                  <ul>
                    <li onMouseEnter={() => setFlagHovered(true)} onMouseLeave={() => setFlagHovered(false)}><img onClick={() => i18n.language === "ru" ? changeLanguage("en") : changeLanguage("ru")} src={i18n.language === "en" ? ukFlag : russianFlag}/></li>
                    <motion.li onMouseEnter={() => setFlagHovered(true)} onMouseLeave={() => setFlagHovered(false)} animate={{y: flagHovered ? 30 : 0}} className='secondary-flag'><img onClick={() => i18n.language === "ru" ? changeLanguage("en") : changeLanguage("ru")} src={i18n.language === "ru" ? ukFlag : russianFlag}/></motion.li>
                  </ul>
                </li>
                <li><Link className='cta-cart' to='/cart'><img src={cart}></img></Link></li>
                <li><Link className="cta-like" to='/feautured'><img src={heart}></img></Link></li>
                <li >
                  <div 
                    onMouseEnter={() => {
                      isLoggedin && setFadeScreen(true)
                      setUserHovered(true)
                    }} 
                    onMouseLeave={() => {
                      isLoggedin && setFadeScreen(false)
                      setUserHovered(false)
                    }}
                  >
                    <Link to='/login' className='login' >{isLoggedin ? username : t("LogIn")}</Link>
                    <AnimatePresence>
                      {(userHovered && isLoggedin) &&
                        <div className='login-wrapper'>
                          <motion.ul 
                            key="login"
                            initial={{opacity: 0, y: "-50%"}}
                            animate={{opacity: 1, y: "0%"}}
                            exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
                            transition={{type: "spring", stiffness: "100", duration: "0.8"}}
                            className='user-dropdown' 
                          >
                            <li><Link to="">{t("Account")}</Link></li>
                            <li><Link to="">{t("Orders")}</Link></li>
                            <li><button onClick={logout}>{t("Logout")}</button></li>
                          </motion.ul>
                        </div>
                      }
                    </AnimatePresence>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Header