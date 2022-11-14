import React from 'react'
import { motion } from 'framer-motion'

const ArrowSelect = ({shownValue, setShownValue, insetInlineEnd, insetBlockStart}) => {
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
            <div className='top'></div>
            <div className='bottom'></div>
        </div>
    </motion.div>
  )
}

export default ArrowSelect