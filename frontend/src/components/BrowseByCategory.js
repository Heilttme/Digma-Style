import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import HomeCard from "./HomeCard"
import ArrowSelect from './ArrowSelect'
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { t } from "i18next"
import { useSelector } from 'react-redux';

const BrowseByCategory = ({itemsState, addToFavorited, addToCart}) => {
  const [queryItems, setQueryItems] = useState([])
  const [filteredItems, setFilteredItems] = useState(itemsState)
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    brands: [],
    colours: [],
    prices: {start: null, end: null},
  })
  const params = useParams()

  const theme = useSelector(state => state.ui.theme)

  const [categoryShown, setCategoryShown] = useState(false)
  const [brandShown, setBrandShown] = useState(false)
  const [colourShown, setColourShown] = useState(false)
  const [priceShown, setPriceShown] = useState(false)
  const [toggledFilters, setToggledFilters] = useState([])


  useEffect(() => {
      if (Object.values(params).length) {
        if (params.categoryBrand) {
            setQueryItems(itemsState.filter(item => (item.brand === params.categoryBrand) && (item.info.type === params.type) && (item.info.category === params.category)))
            setFilteredItems(itemsState.filter(item => (item.brand === params.categoryBrand) && (item.info.type === params.type) && (item.info.category === params.category)))                
        } else if (params.category) {
            setQueryItems(itemsState.filter(item => (item.info.type === params.type) && (item.info.category === params.category)))
            setFilteredItems(itemsState.filter(item => (item.info.type === params.type) && (item.info.category === params.category)))   
        } else if (params.type) {
            setQueryItems(itemsState.filter(item => (item.info.type === params.type)))
            setFilteredItems(itemsState.filter(item => (item.info.type === params.type)))   
        }
    } else {
        setQueryItems(itemsState)
        setFilteredItems(itemsState)
    }
  }, [itemsState, params])

  useEffect(() => {
    if (queryItems.length !== 0){
      let colourFiltersInter = queryItems.map(elem => elem.info.colour.split(";"))
      let colourFilters = []
      for (let i = 0; i < colourFiltersInter.length; i++){
        colourFilters.push(...colourFiltersInter[i])
      }
      colourFilters = [...new Set(colourFilters)]
      let categoryFiltersInter = queryItems.map(elem => elem.info.category.split(";"))
      let categoryFilters = []
      for (let i = 0; i < categoryFiltersInter.length; i++){
        categoryFilters.push(...categoryFiltersInter[i])
      }
      categoryFilters = [...new Set(categoryFilters)]
      let brands = queryItems.map(elem => elem.brand)
      brands = [...new Set(brands)]

      const prices = queryItems.map(elem => elem.price)
      
      let max = Math.max(...prices)
      let min = Math.min(...prices)

      setFilterOptions(prev => ({...prev, colours: colourFilters, categories: categoryFilters, brands: brands, prices: {start: min, end: max}}))
    }
  }, [queryItems])

  useEffect(() => {
    setFilteredItems(prev => {
      let newItems = []
      for (let i = 0; i < queryItems.length; i++) {
        let q = 0
        const info = Object.values(queryItems[i].info)
        info.push(queryItems[i].brand)
        for (let j = 0; j < info.length; j++) {
          if (toggledFilters.includes(info[j])){
            q++
          }
        }
        q === toggledFilters.length && (queryItems[i].price <= filterOptions.prices.end) && (queryItems[i].price >= filterOptions.prices.start) && newItems.push(queryItems[i])
      }
      return newItems
    })
  }, [toggledFilters, filterOptions.prices])
    
    return (
        <div className='search-menu'>
          <div className='filters-wrapper'>
            <div className='filters-header'>
              <h2>{t("FilterBy")}</h2>
              <button 
                className='clear-filters'
                onClick={() => {setToggledFilters([]); setCategoryShown(false); setBrandShown(false); setColourShown(false); setPriceShown(false)}}
              >{t("ClearFilters")}</button>
            </div>
            <div className='filters'>
              <div className='filter-container'>
                <button className={`filter-button ${theme}-bg ${theme}-hover`} onClick={() => setCategoryShown(prev => !prev)}>
                  {t("Category")}
                  <ArrowSelect shownValue={categoryShown} setShownValue={setCategoryShown} insetInlineEnd={"24px"} insetBlockStart={"4px"} />
                </button>
                <motion.div
                  initial={{height: "0"}}
                  animate={{height: categoryShown ? "100%" : "0"}}
                  className='filter-options'
                >
                  {filterOptions.categories.map(elem => 
                  <div key={uuidv4()}>
                    <input 
                      type="checkbox"
                      id={elem}
                      name={elem}
                      checked={toggledFilters.includes(elem)}
                      onChange={e => {
                        if (!toggledFilters.includes(elem)) {
                          setToggledFilters(prev => [...prev, elem])
                        } else {
                          setToggledFilters(prev => {
                            let newArr = []
                            for (let i = 0; i < prev.length; i++) {
                              if (prev[i] !== elem){
                                newArr.push(prev[i])
                              }
                            }
                            return newArr
                          })
                        }}
                      }
                    />
                    <label htmlFor={elem}>{elem}</label>
                  </div>)}
                </motion.div>
              </div>
              <div className='filter-container'>
                <button className={`filter-button ${theme}-bg ${theme}-hover`} onClick={() => setBrandShown(prev => !prev)}>
                  {t("Brand")}
                  <ArrowSelect shownValue={brandShown} setShownValue={setBrandShown} insetInlineEnd={"24px"} insetBlockStart={"4px"} />
                </button>
                <motion.div 
                  initial={{height: "0"}}
                  animate={{height: brandShown ? "100%" : "0"}}
                  className='filter-options'
                >
                  {filterOptions.brands.map(elem => 
                  <div key={uuidv4()}>
                    <input 
                      type="checkbox"
                      id={elem}
                      name={elem}
                      checked={toggledFilters.includes(elem)}
                      onChange={e => {
                        if (!toggledFilters.includes(elem)) {
                          setToggledFilters(prev => [...prev, elem])
                        } else {
                          setToggledFilters(prev => {
                            let newArr = []
                            for (let i = 0; i < prev.length; i++) {
                              if (prev[i] !== elem){
                                newArr.push(prev[i])
                              }
                            }
                            return newArr
                          })
                        }}
                      }
                    />
                    <label htmlFor={elem}>{elem}</label>
                  </div>)}
                </motion.div>
              </div>
              <div className='filter-container'>
                <button className={`filter-button ${theme}-bg ${theme}-hover`} onClick={() => setColourShown(prev => !prev)}> 
                  {t("Colour")}
                  <ArrowSelect shownValue={colourShown} setShownValue={setColourShown} insetInlineEnd={"24px"} insetBlockStart={"4px"} />
                </button>
                <motion.div 
                  initial={{height: "0"}}
                  animate={{height: colourShown ? "100%" : "0"}}
                  className='filter-options'
                >
                  {filterOptions.colours.map(elem => 
                  <div key={uuidv4()}>
                    <input 
                      type="checkbox"
                      id={elem}
                      name={elem}
                      checked={toggledFilters.includes(elem)}
                      onChange={e => {
                        if (!toggledFilters.includes(elem)) {
                          setToggledFilters(prev => [...prev, elem])
                        } else {
                          setToggledFilters(prev => {
                            let newArr = []
                            for (let i = 0; i < prev.length; i++) {
                              if (prev[i] !== elem){
                                newArr.push(prev[i])
                              }
                            }
                            return newArr
                          })
                        }}
                      }
                    />
                    <label htmlFor={elem}>{elem}</label>
                  </div>)}
                </motion.div>
              </div>
              <div className='filter-container'>
                <button className={`filter-button ${theme}-bg ${theme}-hover`} onClick={() => setPriceShown(prev => !prev)}>
                  {t("Price")}
                  <ArrowSelect shownValue={priceShown} setShownValue={setPriceShown} insetInlineEnd={"24px"} insetBlockStart={"4px"} />
                </button>
                <motion.div 
                  initial={{height: "0"}}
                  animate={{height: priceShown ? "100%" : "0"}}
                  className='filter-options price'
                >
                  <input
                    className={`price-input ${theme}-bg`}
                    type="number"
                    name="min"
                    onBlur={e => e.target.value = ""}
                    placeholder={`$${filterOptions.prices.start}`}
                    onChange={(e) => setFilterOptions(prev => (e.target.value.split('e').join('') < prev.prices.end) && e.target.value.split('e').join('') ?  ({...prev, prices: {...prev.prices, start: parseInt(e.target.value.split('e').join(''))}}) : prev)}
                  />
                  <input
                    className={`price-input ${theme}-bg`}
                    type="number"
                    name="min"
                    onBlur={e => e.target.value = ""}
                    placeholder={`$${filterOptions.prices.end}`}
                    onChange={(e) => setFilterOptions(prev => (e.target.value.split('e').join('') > prev.prices.start) && e.target.value.split('e').join('') ? ({...prev, prices: {...prev.prices, end: parseInt(e.target.value.split('e').join(''))}}) : prev)}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          <div className='items-col'>
          <div className='text'>
            <h2 className='query-h'>{t("Browse")}</h2>
          </div>
            <div className='items'>
              {filteredItems.map(elem => <HomeCard addToFavorited={addToFavorited} addToCart={addToCart} key={elem.id} item={elem}/>)}
            </div>
          </div>
        </div>
      )
}

export default BrowseByCategory