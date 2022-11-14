import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const ArrowSelect = ({shownValue, setShownValue, insetInlineEnd, insetBlockStart}) => {
  const theme = useSelector(state => state.ui.theme)
  
  return (
    <motion.div
        // animate={shownValue ? {rotate: "-90deg", x: -28, y: 3} : {}}
        // animate={shownValue ? {rotate: "-90deg", insetInlineEnd: "39px", insetBlockStart: "0px"} : {}}
        animate={shownValue ? {rotate: "-90deg", insetInlineEnd, insetBlockStart} : {}}
        transition={{type: "keyframes", duration: .2}}
        className='arrow-wrapper'
        onClick={() => setShownValue(prev => !prev)}
    >
        <div className='select-arrow'>
            <div className={`top ${theme === "dark" ? "light" : "dark"}-bg`}></div>
            <div className={`bottom ${theme === "dark" ? "light" : "dark"}-bg`}></div>
        </div>
    </motion.div>
  )
}

export default ArrowSelect