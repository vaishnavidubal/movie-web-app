import React, { useState } from 'react'
import './switch.scss'

const Switch = ({ data, onTabChange }) => {
   const [selectedTab, setSelectedTab] = useState(0)
   const [left, setLeft] = useState(0)

   const activeIndex = (tab, index) => {
      setLeft(index * 100)
      setTimeout(()=>{
         setSelectedTab(index)
      }, 300)
      onTabChange(tab, index)
   }

   return (
      <div className='switchingTabs'>
         <div className="tabItems">
            {data.map((tab, index) => (
               <span key={index} className={`tabItem ${selectedTab === index ? 'active': ''}`} onClick={() => activeIndex(tab, index)}>
                  {tab}
               </span>
            ))}
            <span className='movingBg' style={{left}} />
         </div>
      </div>
   )
}

export default Switch
