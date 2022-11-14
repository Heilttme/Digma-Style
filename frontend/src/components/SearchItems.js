import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchCardItem = ({item, setSearchValue, setSearchItems}) => {
  const image = item.pictures[0]
  const name = item.name

  const theme = useSelector(state => state.ui.theme)

  return (
    <motion.span
      initial={{opacity: 0, y: "-50%"}}
      animate={{opacity: 1, y: "0%"}}
      exit={{opacity: 0, y: "-50%", transition: {duration: "0.15"}}}
      transition={{type: "spring", stiffness: "100", duration: "0.8"}}
    >
      <Link
        to={`/items/${item.id}`}
        onClick={() => {setSearchValue(""); setSearchItems([])}} 
        className={`search-card ${theme}-hover ${theme}-bg`}
      >
          {/* <img src={require(`../images/clothes/${image}`)}/> */}
          <p>{name}</p>
      </Link>
    </motion.span>
  )
}

const SearchItems = ({itemsState, searchValue, setSearchValue}) => {
  const [searchItems, setSearchItems] = useState([])

  useEffect(() => {
    searchValue.length === 0 && setSearchItems([])
    searchValue.length >= 3 && setSearchItems(itemsState.filter(elem => (elem.brand.toLowerCase().includes(searchValue) || elem.name.toLowerCase().includes(searchValue))))
  }, [searchValue])
  
  const items = searchItems.map(item => <SearchCardItem setSearchItems={setSearchItems} setSearchValue={setSearchValue} item={item}/>)
  
  return (
    <motion.ul 
      exit={{opacity: 0, y: "-50%", transition: {opacity: {duration: .1}, duration: 0.15}}}
      className='search-items'>
      {items}
    </motion.ul>
  )
}

export default SearchItems
