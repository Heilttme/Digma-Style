import React from 'react'
import {motion} from "framer-motion"
import { t } from 'i18next'
import { Link } from 'react-router-dom'

const Explore = ({align, imgUrl, title, info, delay}) => {

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: delay}} 
            className={`additional-card ${align}`}
        >
            {align === "left" ?
                    <>
                        <img src={imgUrl}/>
                        <div className='text-col'>
                            <h1>{title}</h1>
                            <p>{info}</p>
                            <Link to='/browse/amiri'>{t("Shop")}</Link>
                        </div>
                    </>
            :
                    <>
                        <div className='text-col'>
                            <h1>{title}</h1>
                            <p>{info}</p>
                            <a href='#'>{t("Shop")}</a>
                        </div>
                        <img src={imgUrl}/>
                    </>
            }
            
            
        </motion.div>
    )
}

export default Explore