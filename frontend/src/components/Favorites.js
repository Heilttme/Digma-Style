import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import FavCard from './FavCard'
import { RemovedItemPopUp } from "../components"
import { v4 as uuidv4 } from 'uuid'
import { Navigate } from 'react-router'
import brokenHeart from "../images/broken_heart.svg"
import Loading from './Loading'
import { t } from 'i18next'

const Favorites = ({setFavoriteItems, addToFavorited, favoriteItems}) => {
  // const itemsObj = useSelector(state => state.user.favorited)
  // const itemsList = Object.values(itemsObj)
  const [removedItemsPopUps, setRemovedItemsPopUps] = useState([])
  const [loadingDots, setLoadingDots] = useState(true)
  const isLoggedin = useSelector(state => state.user.isLoggedin)

  // setTimeout(() => {    
  //   if (!isLoggedin){
  //     console.log(email);
  //     return <Navigate to="/login"/>
  //   }
  // }, 200)

  const removedItemsToShow = removedItemsPopUps.map(item => <RemovedItemPopUp key={uuidv4()} item={item} removedItemsPopUps={removedItemsPopUps} setRemovedItemsPopUps={setRemovedItemsPopUps} addToFavorited={addToFavorited} />)
  const items = favoriteItems.map(item => <FavCard key={item.id} favoriteItems={favoriteItems} item={item} setFavoriteItems={setFavoriteItems} setRemovedItemsPopUps={setRemovedItemsPopUps} />)

  console.log(removedItemsToShow);

  setTimeout(() => setLoadingDots(false), 500)

  if (!favoriteItems.length) {
    return loadingDots ? <Loading/> :
      <>
        <h1 className='head'>{t("YourFavorites")}</h1>
        <div>
          <EmptyFavorited/>
        </div>
        { removedItemsPopUps.length ?
        <div className='removed-items'>
          {removedItemsToShow}
        </div> : <></> }
      </>
  }

  return (
    <>
      <div className='favorited'>
          <h1 className='head'>{t("YourFavorites")}</h1>
          {
            favoriteItems.length
              ?
            <div className='grid-list-items'>
              {items}
            </div>
              :
            <div>
              <EmptyFavorited/>
            </div>
          }
        { removedItemsPopUps.length ?
        <div className='removed-items'>
          {removedItemsToShow}
        </div> : <></> }
      </div>
    </>
  )
}

const EmptyFavorited = () => {
  return (
    <div className='empty-favorites'>
        <div className='image'>
            <img width={96} src={brokenHeart}/>
        </div>
        <div className='right-col'>
            <p>{t("WhoopsEmptyFavorites")}</p>
            <div className='cta-buttons'>
                <a href='#'>{t("BrowseItems")}</a>
            </div>
        </div>
    </div>
  )
}

export default Favorites