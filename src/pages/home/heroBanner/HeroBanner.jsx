import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './herobanner.scss'
import useFetch from '../../../hooks/useFetch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/LoadImage/Img'

const HeroBanner = () => {
   const [bg, setBg] = useState("")
   const [query, setQuery] = useState("")
   const navigate = useNavigate()
   const { url } = useSelector((state) => state.home)
   const { data, loading } = useFetch("/movie/upcoming")

   useEffect(() => {
      const background = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
      setBg(background)
   }, [data])

   const searchQueryHandler = (e) => {
      if (e.key === "Enter" && query.length > 0) {
         navigate(`/search/${query}`);
      }
   };

   return (
      <>
         <div className="heroBanner">
            {!loading && <div className="backdrop-img">
               <Img src={bg} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
               <div className="heroBannerContent">
                  <span className="title">
                     Welcome
                  </span>
                  <span className="subTitle">
                     Explore new TV shows and Movies......
                  </span>
                  <div className="searchInput">
                     <input
                        type="text"
                        placeholder="Search for a movie or tv show...."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                     />
                     <button>Search</button>
                  </div>
               </div>
            </ContentWrapper>
         </div>
      </>
   )
}

export default HeroBanner