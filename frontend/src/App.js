import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { Header, Footer, Home, Item, Login, SignUp, Cart, Favorites, Search, Account } from "./components"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import axios from "axios";
import BrowseByCategory from "./components/BrowseByCategory";
import { useTranslation } from "react-i18next"
import { uiActions } from "./store/uiSlice";

function App() {
  const [FadeScreen, setFadeScreen] = useState(false)
  const [itemsState, setItemsState] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favoriteItems, setFavoriteItems] = useState([])
  const [cartAnimated, setCartAnimated] = useState(false)
  const [cartCancelAnimated, setCartCancelAnimated] = useState(false)
  const [favoriteAnimated, setFavoriteAnimated] = useState(false)
  const [favoriteCancelAnimated, setFavoriteCancelAnimated] = useState(false)
  const [timeouts, setTimeouts] = useState([])
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
  })

  useEffect(() => {
    user.email && axios.post("authentication/set_user_info/", user)
    user.username !== "" && user.username !== null && dispatch(userActions.setUsername(user.username)) 
  }, [user])

  const isLoggedin = useSelector(state => state.user.isLoggedin)
  const email = useSelector(state => state.user.email)
  // const favItemsObj = useSelector(state => state.user.favorited)
  // const favItemsList = Object.values(favItemsObj)
  const theme = useSelector(state => state.ui.theme)
  const dispatch = useDispatch()

  const {t, i18n} = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {dispatch(uiActions.changeTheme(localStorage.getItem("theme")))}, []) // wrapped by {} because if they aren't there app throws destroy is not a function error

  useEffect(() => {
    const resAuth = axios.post("/authentication/login/", {login: "login"}, {withCredentials: true})
    .then(data => {
      if (data.status === 200) {
        dispatch(userActions.setLoggedIn(true))
        dispatch(userActions.setUsername(data.data.post.username))
        dispatch(userActions.setEmail(data.data.post.email))
        setUser({
          username: data.data.post.username, 
          email: data.data.post.email, 
          firstName: data.data.post.first_name, 
          lastName: data.data.post.last_name, 
          gender: data.data.post.gender, 
        })
      }
    })
    .catch(data => {

    })
  }, [])

  useEffect(() => {
    const setItemsPost = async () => {
      const res = await axios.get("/api/items/")
      const itemsInfo = await res.data.items
      setItemsState(itemsInfo)
    }
    setItemsPost()
  }, [])

  useEffect(() => {
    const setParsedCart = async () => {
      const res = itemsState.length && isLoggedin && email && await axios.post("/authentication/get_cart/", {email})
      let newCart = res && await res.data.cart
      if (newCart){
        let newCartToSet = {}
        Object.keys(newCart).forEach(k => {
          newCartToSet = {...newCartToSet, [k]: {...itemsState.filter(item => item.id == k.split("-")[0])[0], quantity: newCart[k].quantity, size: newCart[k].size}}
        })
        setCartItems(Object.values(newCartToSet))
      }
    }
    setParsedCart()
  }, [isLoggedin, email, itemsState])

  useEffect(() => {
    const setParsedFavorited = async () => {
      const res = itemsState.length && isLoggedin && email && await axios.post("/authentication/get_favorited/", {email})
      let newFavorited = res && await res.data.favorited
      if (res) {
        Object.keys(newFavorited).forEach(k => {
          newFavorited = {...newFavorited, [k]: {...itemsState.filter(item => item.id == k)[0]}}
        })
        setFavoriteItems(Object.values(newFavorited))
      }
    }
    setParsedFavorited()
  }, [isLoggedin, email, itemsState])

  const addToFavorited = (itemData) => {
    timeouts.forEach(el => clearTimeout(el))
    if (isLoggedin){
      const res = axios.post("/authentication/add_to_favorited/", {...itemData, email})
      .then(data => {
        const checkIfItemIsAlreadyInFavorited = () => {
          for (let i = 0; i < favoriteItems.length; i++) {
            if (favoriteItems[i].id === itemData.id) {
              return true
            }
          }
          return false
        }
        
        if (!checkIfItemIsAlreadyInFavorited()){
          setFavoriteItems(prev => [...prev, {...itemData}])

          setFavoriteAnimated(true)
          setTimeouts(prev => [prev, setTimeout(() => {
            setFavoriteAnimated(false)
          }, 220)])
        } else {
          setFavoriteItems(prev => {
            const newArr = []
            for (let i = 0; i < prev.length; i++){
              if (prev[i].id !== itemData.id) {
                newArr.push(itemData) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              }
            }
            return newArr
          })
          // dispatch(userActions.removeFavorited(itemData))

          // setFavoriteCancelAnimated(true)
          // setTimeouts(prev => [prev, setTimeout(() => {
          //   setFavoriteCancelAnimated(false)
          // }, 50)])
        }
      })
    }
  }

  const addToCart = (itemData) => {
    timeouts.forEach(el => clearTimeout(el))
    if (itemData.size !== null && itemData.size !== "Select size"){
      if (isLoggedin) {
        const checkIfItemIsAlreadyInCart = () => {
          for (let i = 0; i < cartItems.length; i++){
            if (cartItems[i].id === itemData.id && cartItems[i].size === itemData.size){
              return true
            }
          }
        }
        if (!checkIfItemIsAlreadyInCart()){
          setCartItems(prev => [...prev, {...itemData, quantity: 1}]) 
          setCartAnimated(true)
          setTimeouts(prev => [prev, setTimeout(() => {
            setCartAnimated(false)
          }, 1000)])
          const res = axios.post("/authentication/set_cart/", {quantity: 1, ...itemData, size: itemData.size, email})
        } else {
          setCartCancelAnimated(true)
          setTimeouts(prev => [prev, setTimeout(() => {
            setCartCancelAnimated(false)
          }, 50)])
        }
      } else {
        if (sessionStorage.getItem(`${itemData.id}-${itemData.size}`)){
          setCartCancelAnimated(true)
          setTimeouts(prev => [prev, setTimeout(() => {
            setCartCancelAnimated(false)
          }, 50)])
        } else {
          sessionStorage.setItem(`${itemData.id}-${itemData.size}`, JSON.stringify({quantity: 1, ...itemData}))
          setCartAnimated(true)
          setTimeouts(prev => [prev, setTimeout(() => {
            setCartAnimated(false)
          }, 1000)])
        }
      }
    } else{
      setCartCancelAnimated(true)
      setTimeouts(prev => [prev, setTimeout(() => {
        setCartCancelAnimated(false)
      }, 50)])
    }
  }

  return (
    <div className="app">
      <Header i18n={i18n} itemsState={itemsState} setFadeScreen={setFadeScreen} changeLanguage={changeLanguage} t={t} />
      <motion.div 
        className={`main ${theme}-bg`}
        animate={{filter: FadeScreen ? "brightness(50%)": "brightness(100%)"}}
        transition={{duration: 0.3}}
      >
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home addToFavorited={addToFavorited}
                                           addToCart={addToCart}
                                    />} 
            />
            <Route path="/items/:id" element={<Item cartItems={cartItems}
                                                    favoriteItems={favoriteItems} 
                                                    addToFavorited={addToFavorited}
                                                    addToCart={addToCart}
                                                    cartAnimated={cartAnimated} 
                                                    cartCancelAnimated={cartCancelAnimated}
                                                    favoriteAnimated={favoriteAnimated}
                                                    favoriteCancelAnimated={favoriteCancelAnimated}
                                              />} />
            <Route path="/login" element={<Login setUser={setUser} />}/>
            <Route path="/sign_up" element={<SignUp setUser={setUser} />}/>
            <Route path="/cart" element={<Cart cartItems={cartItems} 
                                               setCartItems={setCartItems}/>}
            />
            <Route path="/feautured" element={<Favorites favoriteItems={favoriteItems} 
                                                         setFavoriteItems={setFavoriteItems} 
                                                         addToFavorited={addToFavorited} />}
            />
            <Route path="/search" element={<Search itemsState={itemsState} />}/>
            <Route path="/browse" element={<BrowseByCategory itemsState={itemsState}
                                                             addToFavorited={addToFavorited} 
                                                             addToCart={addToCart} />}/>
            <Route path="/browse/:type" element={<BrowseByCategory itemsState={itemsState}
                                                                                    addToFavorited={addToFavorited} 
                                                                                    addToCart={addToCart} />}/>
            <Route path="/browse/:type/:category" element={<BrowseByCategory itemsState={itemsState}
                                                                                    addToFavorited={addToFavorited} 
                                                                                    addToCart={addToCart} />}/>
            <Route path="/browse/:type/:category/:categoryBrand" element={<BrowseByCategory itemsState={itemsState}
                                                                                    addToFavorited={addToFavorited} 
                                                                                    addToCart={addToCart} />}/>
            <Route path="/account" element={<Account user={user} setUser={setUser} />}/>

          </Routes>
        </div>
        <Footer/>
      </motion.div>
    </div>
  );
}

export default App;
