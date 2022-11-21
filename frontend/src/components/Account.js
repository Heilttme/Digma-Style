import React, { useState, useRef } from 'react'
import { useSelector } from "react-redux"
import { motion } from "framer-motion"

const Account = ({user, setUser}) => {
  const [curSection, setCurSection] = useState(null)
  const [expanded, setExpanded] = useState(true)

  const theme = useSelector(state => state.ui.theme)
  const username = useSelector(state => state.user.username)
  
  return (
    <div className={`account ${theme}-bg`}>
      <motion.div
        animate={expanded ? {width: "100%"} : {width: "20%"}}
        transition={{type: "keyframes", duration: .2}}
        className={`side-menu`}
      >
        <h1>Hello, {username}</h1>
        <a 
          className={`section-button ${theme}-hover`}
          onClick={() => {
            setExpanded(false)
            expanded ? setTimeout(() => setCurSection("account"), 250) : setCurSection("account")
          }}
        >
          Your account settings
        </a>
        <a 
          className={`section-button ${theme}-hover`}
          onClick={() => {
            setExpanded(false)
            expanded ? setTimeout(() => setCurSection("orders"), 250) : setCurSection("orders")
          }}
        >
          Your orders
        </a>
        <a 
          className={`section-button ${theme}-hover`}
          onClick={() => {
            setExpanded(false)
            expanded ? setTimeout(() => setCurSection("address"), 250) : setCurSection("address")
          }}
        >
          Your address
        </a>
        <a 
          className={`section-button ${theme}-hover`}
          onClick={() => {
            setExpanded(false)
            expanded ? setTimeout(() => setCurSection("billing"), 250) : setCurSection("billing")
          }}
        >
          Your billing
        </a>
      </motion.div>
      {
        curSection === "account" ? <AccountSection user={user} theme={theme} setUser={setUser} /> : <></>
      }
      {
        curSection === "orders" ? <OrdersSection/> : <></>
      }
      {
        curSection === "address" ? <AddressSection/> : <></>
      }
      {
        curSection === "billing" ? <BillingSection/> : <></>
      }
    </div>
  )
}

const AccountSection = ({user, theme, setUser}) => {

  const [usernameEdit, setUsernameEdit] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [passwordEdit, setPasswordEdit] = useState(false)
  const [firstNameEdit, setFirstNameEdit] = useState(false)
  const [lastNameEdit, setLastNameEdit] = useState(false)
  const [genderEdit, setGenderEdit] = useState(false)
  
  const usernameRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const genderRef = useRef(null)
  
  const [newUsername, setNewUsername] = useState(user.username)
  const [newFirstName, setNewFirstName] = useState(user.firstName)
  const [newLastName, setNewLastName] = useState(user.lastName)
  const [newGender, setNewGender] = useState(user.gender)

  return (
    <div className='account-section'>
      <h1>Account settings</h1>
      <ul className='user-params'>
        <li className='user-param'>
          <svg onClick={() => {setUsernameEdit(true); setTimeout(() => usernameRef.current.focus(), 100)}} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <span className='field-wrapper'>
            <h3>Username:</h3>
            <input
              disabled={usernameEdit ? false : true}
              ref={usernameRef}
              className={`${theme}-bg`} 
              value={newUsername} 
              onChange={(e) => setNewUsername(e.target.value)}
              onBlur={() => {setUser(prev => ({...prev, username: newUsername})); setUsernameEdit(false)}}
            />
          </span>
        </li>
        <li className='user-param'>
          <svg onClick={() => setEmailEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <h3>E-mail: {user.email}</h3>
        </li>
        <li className='user-param'>
          <svg onClick={() => setPasswordEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <h3>Password: *******</h3>
        </li>
        <li className='user-param'>
          <svg onClick={() => {setFirstNameEdit(true); setTimeout(() => firstNameRef.current.focus(), 100)}} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <span className='field-wrapper'>
            <h3>First name:</h3>
            <input
              disabled={firstNameEdit ? false : true}
              ref={firstNameRef}
              className={`${theme}-bg`} 
              value={newFirstName} 
              onChange={(e) => setNewFirstName(e.target.value)}
              onBlur={() => {setUser(prev => ({...prev, firstName: newFirstName})); setFirstNameEdit(false)}}
            />
          </span>
        </li>
        <li className='user-param'>
          <svg onClick={() => {setLastNameEdit(true); setTimeout(() => lastNameRef.current.focus(), 100)}} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <span className='field-wrapper'>
            <h3>Last name:</h3>
            <input
              disabled={lastNameEdit ? false : true}
              ref={lastNameRef}
              className={`${theme}-bg`} 
              value={newLastName} 
              onChange={(e) => setNewLastName(e.target.value)}
              onBlur={() => {setUser(prev => ({...prev, lastName: newLastName})); setLastNameEdit(false)}}
            />
          </span>
        </li>
        <li className='user-param'>
          <svg onClick={() => {setGenderEdit(true); setTimeout(() => genderRef.current.focus(), 100)}} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <span className='field-wrapper'>
            <h3>Gender:</h3>
            <input
              disabled={genderEdit ? false : true}
              ref={genderRef}
              className={`${theme}-bg`} 
              value={newGender} 
              onChange={(e) => setNewGender(e.target.value)}
              onBlur={() => {setUser(prev => ({...prev, gender: newGender})); setGenderEdit(false)}}
            />
          </span>
        </li>
      </ul>
    </div>
  )
}

const OrdersSection = () => {
  return (
    <div className='orders-section'>
      <h1>Your orders</h1>
    </div>
  )
}

const AddressSection = () => {
  return (
    <div className='address-section'>
      <h1>Your address</h1>
    </div>
  )
}

const BillingSection = () => {
  return (
    <div className='billing-section'>
      <h1>Your billing</h1>
    </div>
  )
}


export default Account