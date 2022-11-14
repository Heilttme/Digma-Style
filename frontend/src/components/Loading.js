import React from 'react'
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className='loading-wrapper'>
      <motion.div 
        className='first circle'
        animate={{y: 6}}
        transition={{repeat: Infinity, repeatType: "reverse", duration: .6}}
      />
      <motion.div
        className='second circle'      
        animate={{y: 7}}
        transition={{repeat: Infinity, repeatType: "reverse", duration: .6, delay: .1}}
      />
      <motion.div
        className='third circle'      
        animate={{y: 8}}
        transition={{repeat: Infinity, repeatType: "reverse", duration: .6, delay: .2}}
      />
    </div>
  )
}

export default Loading