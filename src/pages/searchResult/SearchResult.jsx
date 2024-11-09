import React, { useEffect, useState } from 'react'
import './search.scss'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResults from '../../assets/no-results.png'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'

const SearchResult = () => {
   const [data, setData] = useState(null)
   const [pageNumber, setPageNumber] = useState(1)
   const [loading, setLoading] = useState(false)
   let { query } = useParams()

   const fetchData = () => {
      setLoading(true)
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
         .then((res) => {
            setData(res)
            setPageNumber((prev) => prev + 1)
            setLoading(false)
         })
   }

   const fetchNextData = () => {
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
         .then((res) => {
            if (data?.results) {
               setData({
                  ...data,
                  results: [...data?.results, ...res.results],
               })
            }
            else {
               setData(res)
            }
            setPageNumber((prev) => prev + 1)
         })
   }

   useEffect(() => {
      setPageNumber(1)
      fetchData()

   }, [query])
   return (
      <div className='searchResultsPage'>
         {
            loading && <Spinner initial={true} />
         }
         {!loading && (
            <ContentWrapper>
               {data?.results?.length > 0 ? (
                  <>
                     <div className="pageTitle">
                        {`Search ${data.total_results > 1 ? 'results' : 'result'} of ${query}`}
                     </div>
                     <InfiniteScroll
                        className="content"
                        dataLength={data.results.length}
                        next={fetchNextData}
                        hasMore={pageNumber <= data.total_pages}
                        loader={<Spinner />}
                     >
                        {data.results.map((item, index) => {
                           if (item.media_type === 'person') {
                              return null;
                           }
                           return (
                              <MovieCard key={index} data={item} fromSearch={true} />
                           );
                        })}
                     </InfiniteScroll>
                  </>
               ) : (
                  <span className='resultNotFound'>No result found</span>

               )}
            </ContentWrapper>
         )
         }
      </div >
   )
}

export default SearchResult
