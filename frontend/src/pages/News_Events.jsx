import React from 'react'
import img from '../assets/principal.png';
import { useLocation } from 'react-router-dom';

const News_Events = () => {

    const location = useLocation();
    const { news } = location.state || {}; // যদি ডেটা না থাকে, তাহলে fallback দেয়
    
    if (!news) {
        return <div className="p-4 text-red-500">No news data found.</div>;
      }

  return (
    <div className=' w-full h-auto m-2 p-2 bg-gray-300'>

        <div className='flex gap-6'>

            <img  src={news.photo.url} className='w-25 h-25' alt="" />
            <div>
             <h1 className='text-2xl font-bold border-b-2 border-cyan-400'>{news.tital}</h1>
             <p className='font-semibold'>{news.description}</p>


            </div>
            

        </div>


    </div>
  )
}

export default News_Events