import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { motion } from "framer-motion"

const Account = ({user}) => {
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
        curSection === "account" ? <AccountSection user={user} theme={theme} /> : <></>
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

const AccountSection = ({user, theme}) => {

  const [usernameEdit, setUsernameEdit] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [passwordEdit, setPasswordEdit] = useState(false)
  const [firstNameEdit, setFirstNameEdit] = useState(false)
  const [lastNameEdit, setLastNameEdit] = useState(false)
  const [genderEdit, setGenderEdit] = useState(false)
  const [phoneNumberEdit, setPhoneNumberEdit] = useState(false)
  

  return (
    <div className='account-section'>
      <h1>Account settings</h1>
      <ul className='user-params'>
        <li className='user-param'>
          <svg onClick={() => setUsernameEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          {usernameEdit ? <><h3>Username:</h3><input className={`${theme}-bg`}/></> : <h3>Username: {user.username}</h3>}
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
          <svg onClick={() => setFirstNameEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <h3>First name: {user.firstName}</h3>
        </li>
        <li className='user-param'>
          <svg onClick={() => setLastNameEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <h3>Last name: {user.lastName}</h3>
        </li>
        <li className='user-param'>
          <svg onClick={() => setGenderEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <h3>Gender: {user.gender}</h3>
        </li>
        <li className='user-param'>
          <svg onClick={() => setPhoneNumberEdit(true)} fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.598 13.091l-5.69-5.688 7.402-7.403 5.69 5.689-7.402 7.402zm-16.598 10.909l7.126-1.436-5.688-5.689-1.438 7.125zm1.984-20.568l6.449 6.446-5.582 5.582 5.689 5.69 5.583-5.583 6.492 6.49 1.4-1.428-18.631-18.625-1.4 1.428z"/></svg>
          <h3>Phone number: {user.phoneNumber}</h3>
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