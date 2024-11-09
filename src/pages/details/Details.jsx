import React from 'react'
import './details.scss'
import DetailsBanner from './detailsBanner/DetailsBanner'
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'

const Details = () => {

   const { mediaType, id } = useParams()
   const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
   const { data: credits, loading : creditsLoadings } = useFetch(`/${mediaType}/${id}/credits`)


   return (
      <div>
         <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />

         <Cast data={credits?.cast} loading={creditsLoadings} />
      </div>
   )
}

export default Details