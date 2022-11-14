import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/userSlice'
import { Navigate } from "react-router-dom"
import axios from "axios"
import { t } from 'i18next'

export const SignUp = () => {
    const isLoggedin = useSelector(state => state.user.isLoggedin)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
      })

    const dispatch = useDispatch()
    
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)


    const changeFormData = e => {
    const {name, value} = e.target
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
    }

    const SignUpUser = () => {
        const errors = []

        if (!formData.email) errors.push("email")
        if (!formData.password) errors.push("password")
        if (!formData.username) errors.push("username")
        
        if (errors.length) {
            for (let i = 0; i < errors.length; i++){
                if (errors[i]=== "email") setEmailError(true)
                if (errors[i]=== "password") setPasswordError(true)
                if (errors[i]=== "username") setUsernameError(true)
            }
            return
        }

        let newCart = {}
        if (sessionStorage){
            const keys = Object.keys(sessionStorage)
            for (let i = 0; i < keys.length; i++){
                newCart = {...newCart, [keys[i]]: JSON.parse(sessionStorage.getItem(keys[i])).quantity}
            }
        }

        const res = axios.post("/authentication/signup/", {...formData, newCart})
            .then(data => {
                if (data.data.message === "success"){
                    dispatch(userActions.setLoggedIn())
                    dispatch(userActions.setUsername(data.data.post.username))
                    const res_token = axios.post("authentication/token/", {email: formData.email}, {withCredentials: true})
                    sessionStorage.clear()
                }
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    if (isLoggedin){
        return <Navigate to="/#"/>
      }

  return (
    <div className='sign-up'>
        <div className='wrapper'>
            <h1>{t("SignUp")}</h1>
            <div className='form'>
                <div className='wrapper'>
                    <input 
                        name='email'
                        onChange={e => changeFormData(e)}
                        id="email"
                        value={formData.email}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <motion.label animate={formData.email || emailFocus ? {y: -20, fontSize: "16px"} : {}} className='text-label' htmlFor="email">{t("Email")}</motion.label>
                    {emailError && <p className='error'>{t("PleaseEnterYourEmail")}</p>}
                </div>

                <div className='wrapper'>
                    <input 
                        name='username'
                        onChange={e => changeFormData(e)}
                        id="username"
                        value={formData.username}
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                    <motion.label animate={formData.username || usernameFocus ? {y: -20, fontSize: "16px"} : {}} className='text-label' htmlFor="username">{t("Password")}</motion.label>
                    {usernameError && <p className='error'>{t("PleaseEnterYourPassword")}</p>}
                </div>

                <div className='wrapper'>
                    <input 
                        onChange={e => changeFormData(e)}
                        name='password'
                        id="password"
                        type="password"
                        value={formData.password}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <motion.label animate={formData.password || passwordFocus ? {y: -20, fontSize: "16px"} : {}} className='text-label' htmlFor="password">{t("Password")}</motion.label>
                    {passwordError && <p className='error'>{t("PleaseEnterYourPassword")}</p>}
                </div>

                <button onClick={SignUpUser}>{t("SignUp")}</button>
            </div>
        </div>
    </div>
  )
}
