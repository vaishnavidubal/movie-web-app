import React, { useRef } from "react";
import {
   BsFillArrowLeftCircleFill,
   BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";

import './carousel.scss'
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Img from "../LoadImage/Img";

const Carousel = ({ data, loading, endpoint }) => {
   const carouselContainer = useRef()

   const { url } = useSelector((state) => state.home)
   const navigate = useNavigate()
   const navigation = (dir) => {
      const container = carouselContainer.current;
      const scrollAmt =
         dir === "left"
            ? container.scrollLeft - container.offsetWidth 
            : container.scrollLeft + container.offsetWidth;

      container.scrollTo({
         left: scrollAmt,
         behavior: "smooth",
      });
   };


   const skeleton = () => {
      return <div className="skeletonItem">
         <div className="posterBlock skeleton">
            <div className="textBlock skeleton"></div>
            <div className="date skeleton"></div>
         </div>
      </div>
   }
   return (
      <div className="carousel">
         <ContentWrapper>
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation('left')} />
            <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation('right')} />
            {!loading ? (
               <div className="carouselItems" ref={carouselContainer}>
                  {data?.map((item) => {
                     const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                     return (
                        <div key={item.id} className="carouselItem" onClick={()=> navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                           <div className="posterBlock">
                              <Img src={posterUrl} />
                              <CircleRating rating={item.vote_average.toFixed(1)} />
                              <Genres data={item.genre_ids.slice(0, 1)} />
                           </div>
                           <div className="textBlock">
                              <span className="title">
                                 {item.title || item.name}
                              </span>
                              <span className="date">
                                 {dayjs(item.release_date).format('MMM DD, YYYY')}
                              </span>
                           </div>
                        </div>)
                  })}
               </div>
            ) : (
               <div className="loadingSkeleton">
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
                  {skeleton()}
               </div>
            )}
         </ContentWrapper>
      </div>
   )
}

export default Carousel
