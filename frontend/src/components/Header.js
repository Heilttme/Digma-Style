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
import { uiActions } from '../store/uiSlice'
import { v4 as uuidv4 } from 'uuid'

function Header({itemsState, setFadeScreen, changeLanguage, i18n}) {
  const [flagHovered, setFlagHovered] = useState(false)
  const [userHovered, setUserHovered] = useState(false)
  const [browseHovered, setBrowseHovered] = useState(false)
  const [navigateToSearch, setNavigateToSearch] = useState(false)
  const [menu, setMenu] = useState(false)

  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const [browseParams, setBrowseParams] = useState({clothing: [], shoes: [], brands: []})
  
  const theme = useSelector(state => state.ui.theme)

  const username = useSelector(state => state.user.isLoggedin ? state.user.username : "")
  const isLoggedin = useSelector(state => state.user.isLoggedin)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    const res = axios.post("/authentication/login/", {login: "logout"}, {withCredentials: true})
    .then(data => {
      if (data.status === 200) {
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
    <header className={`${theme}-bg`}>
      <div className='menu-search-wrapper'>
        <div onClick={() => setMenu(prev => !prev)} className="wrapper-hamburger">
          <div className={`hamburger-menu ${theme}`}></div>
        </div>
        <ul className='ul-search'>
          <li className='search-container'>
            <li
              className='li-magnifier'
              onClick={() => setNavigateToSearch(true)}
            ><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg></li>
            <AnimatePresence>
            {searchValue && searchFocused && 
                <SearchItems setSearchValue={setSearchValue} itemsState={itemsState} searchValue={searchValue}/>
            }
            </AnimatePresence>
          </li>
        </ul>
      </div>
      <div className='like-cart-wrapper'>
        <Link className={`cta-cart ${theme}-hover`} to='/cart'><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-10.563-5l-2.937-7h16.812l-1.977 7h-11.898zm11.233-5h-11.162l1.259 3h9.056l.847-3zm5.635-5l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg></Link>
        <Link className={`cta-like ${theme}-hover`} to='/feautured'><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg></Link>
      </div>
      <a href='#' className='mobile-logo'>Digma Style</a>
      <motion.nav
        animate={menu ? {width: "105vw"} : {width: "0vw", opacity: 0}}
        transition={{opacity: {duration: .3}}}
        className={`mobile ${theme}-bg`}
      >
        <Link to={isLoggedin ? `/account` : "/login"} onClick={() => setMenu(false)}><svg fill="currentColor" className='user' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg></Link>
        <div className='menu-items'>
          <Link className={`${theme}-on-bg ${theme}-hover`} onClick={() => setMenu(false)} to="/browse">{t("Browse")}</Link>
          <Link className={`header-category ${theme}-hover`} onClick={() => setMenu(false)} to='#'>{t("Sales")}</Link>
          <Link className={`header-category ${theme}-hover`} onClick={() => setMenu(false)} to="browse/clothing">{t("Clothing")}</Link>
          <Link className={`header-category ${theme}-hover`} onClick={() => setMenu(false)} to="browse/shoes">{t("Shoes")}</Link>
        </div>
        <div className='bottom-items'>
            <img onClick={() => i18n.language === "ru" ? changeLanguage("en") : changeLanguage("ru")} src={i18n.language === "en" ? ukFlag : russianFlag}/>
          <div
            onClick={() => dispatch(uiActions.changeTheme(theme === "dark" ? "light": "dark"))}
            className='theme-toggler-wrapper'
          >
            <motion.div
              animate={theme === "dark" ? {backgroundColor: "#dfdbdb"} : {backgroundColor: "#232424"}}
              className='container'
            >
              <motion.div
                className='ball'
                animate={theme === "dark" ? {left: 28, backgroundColor: "#232424"} : {backgroundColor: "#dfdbdb"}}
              />
            </motion.div>
          </div>
        </div>
      </motion.nav>

        <nav className="closed">
          <div
            onClick={() => dispatch(uiActions.changeTheme(theme === "dark" ? "light": "dark"))}
            className='theme-toggler-wrapper'
          >
            <motion.div
              animate={theme === "dark" ? {backgroundColor: "#dfdbdb"} : {backgroundColor: "#232424"}}
              className='container'
            >
              <motion.div
                className='ball'
                animate={theme === "dark" ? {left: 28, backgroundColor: "#232424"} : {backgroundColor: "#dfdbdb"}}
              />
            </motion.div>
          </div>
          <ul className='ul-header'>
            <li className='search top-nav-content'>
              <div
                onMouseEnter={() => {setFadeScreen(true); setBrowseHovered(true)}} 
                onMouseLeave={() => {!searchFocused && setFadeScreen(false); setBrowseHovered(false)}}
              >
                <span>
                  <Link className={`${theme}-on-bg ${theme}-hover`} to="/browse">{t("Browse")}</Link>
                  <AnimatePresence>
                    {browseHovered && 
                        <motion.ul
                          key="browse"
                          className={`categories ${theme}-bg`}
                          initial={{opacity: 0, y: "-50%"}}
                          animate={{opacity: 1, y: "0%"}}
                          exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
                          transition={{type: "keyframes", duration: "0.15"}}
                        >
                          <li className='category-wrapper'>
                            <Link className={`header-category ${theme}-hover`} to='#'>{t("Sales")}</Link>
                            <ul className='category-items'>
                              <li><Link className={`${theme}-hover`} to="#">Amiri</Link></li>
                              <li><Link className={`${theme}-hover`} to="#">Adidas</Link></li>
                              <li><Link className={`${theme}-hover`} to="#">Stone Island</Link></li>
                            </ul>
                          </li>
                          <li className='category-wrapper'>
                            <Link className={`header-category ${theme}-hover`} to="browse/clothing">{t("Clothing")}</Link>
                            <ul className='category-items'>
                              {browseParams.clothing.map(item => item !== false && <li key={uuidv4()}><Link to={`browse/clothing/${item}`} className={`${theme}-hover`}>{item}</Link></li>)}
                            </ul>
                          </li>
                          <li className='category-wrapper'>
                            <Link className={`header-category ${theme}-hover`} to="browse/shoes">{t("Shoes")}</Link>
                            <ul className='category-items'>
                              {browseParams.shoes.map(item => item !== false && <li key={uuidv4()}><Link to={`browse/shoes/${item}`} className={`${theme}-hover`}>{item}</Link></li>)}
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
                    className={`${theme}-bg`}
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
                ><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg></li>
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
              <ul className='content'>
                <li>
                  <ul className='flags'>
                    <li onMouseEnter={() => setFlagHovered(true)} onMouseLeave={() => setFlagHovered(false)}><img onClick={() => i18n.language === "ru" ? changeLanguage("en") : changeLanguage("ru")} src={i18n.language === "en" ? ukFlag : russianFlag}/></li>
                    <motion.li onMouseEnter={() => setFlagHovered(true)} onMouseLeave={() => setFlagHovered(false)} animate={{y: flagHovered ? 30 : 0}} className='secondary-flag'><img onClick={() => i18n.language === "ru" ? changeLanguage("en") : changeLanguage("ru")} src={i18n.language === "ru" ? ukFlag : russianFlag}/></motion.li>
                  </ul>
                </li>
                <li><Link className={`cta-cart ${theme}-hover`} to='/cart'><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-10.563-5l-2.937-7h16.812l-1.977 7h-11.898zm11.233-5h-11.162l1.259 3h9.056l.847-3zm5.635-5l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg></Link></li>
                <li><Link className={`cta-like ${theme}-hover`} to='/feautured'><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg></Link></li>
                <li>
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
                    <Link to='/login' className={`login ${theme}-hover`} >{isLoggedin ? username : t("LogIn")}</Link>
                    <AnimatePresence>
                      {(userHovered && isLoggedin) &&
                        <motion.div 
                          key="login"
                          initial={{opacity: 0, y: "-50%"}}
                          animate={{opacity: 1, y: "0%"}}
                          exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
                          transition={{type: "keyframes", duration: "0.2"}}
                          className="login-wrapper"
                        >
                          <ul className={`user-dropdown ${theme}-bg`}>
                            <li><Link to="/account" className={`${theme}-hover`}>{t("Account")}</Link></li>
                            <li><Link to="" className={`${theme}-hover`}>{t("Orders")}</Link></li>
                            <li><Link to="" className={`${theme}-hover`} onClick={logout}>{t("Logout")}</Link></li>
                          </ul>
                        </motion.div>
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