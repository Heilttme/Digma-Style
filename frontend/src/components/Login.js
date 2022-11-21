import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from '../store/userSlice'
import axios from 'axios'
import { t } from 'i18next'

export const Login = ({setUser}) => {
  const isLoggedin = useSelector(state => state.user.isLoggedin)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  })

  const dispatch = useDispatch()

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const counter = useSelector(state => state.user.count)

  const theme = useSelector(state => state.ui.theme)

  const changeFormData = e => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "remember" ? e.target.checked : value
    }))
  }

  const logInUser = () => {
    const errors = []

    if (!formData.email) errors.push("email")
    if (!formData.password) errors.push("password")
    
    if (errors.length) {
        for (let i = 0; i < errors.length; i++){
            if (errors[i]=== "email") setEmailError(true)
            if (errors[i]=== "password") setPasswordError(true)
        }
        return
    }

    const res = axios.post("/authentication/login/", formData)
    .then(data => {
      if (data.status === 200){
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
        const resToken = axios.post("authentication/token/", {email: formData.email}, {withCredentials: true})
        return <Navigate to=""/>
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
    <div className='login'>
        <div className='wrapper'>
            <h1>{t("LogIn")}</h1>
            <span>{t("NewToDigmaStyle")} </span>
            <span><Link to='/sign_up'>{t("SignUp")}</Link></span>
            <div className='form'>
              <div className='wrapper'>
                <input 
                  name='email'
                  onChange={e => changeFormData(e)}
                  id="email"
                  className={`${theme}-bg`}
                  value={formData.email}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <motion.label animate={formData.email || emailFocus ? {y: -20, fontSize: "16px"} : {}} className='text-label' htmlFor="email">{t("Email")}</motion.label>
                {emailError && <p className='error'>{t("PleaseEnterYourEmail")}</p>}
              </div>

              <div className='wrapper'>
                <input 
                  onChange={e => changeFormData(e)}
                  name='password'
                  id="password"
                  type="password"
                  className={`${theme}-bg`}
                  value={formData.password}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <motion.label animate={formData.password || passwordFocus ? {y: -20, fontSize: "16px"} : {}} className='text-label' htmlFor="password">{t("Password")}</motion.label>
                {passwordError && <p className='error'>{t("PleaseEnterYourPassword")}</p>}
              </div>

                <div className='password-remember'>
                    <div>
                        <input 
                          type="checkbox"
                          id="remember"
                          name="remember"
                          value={formData.remember}
                          onChange={e => changeFormData(e)}
                        />
                        <label htmlFor="remember">{t("RememberMe")}</label>
                    </div>
                    <p><a href='#'>{t("ForgotYourPassword")}</a></p>
                </div>
                <button onClick={logInUser}>{t("LogIn")}</button>
        </div>
        </div>
    </div>
  )
}
