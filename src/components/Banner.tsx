import React from 'react'
// import sortin_earth from '../assets/sortin_earth.png'
// import sortin_coin from '../assets/sortin_coin.png'
// import sortin_arrow from '../assets/sortin_arrow.png'
import  '../assets/sortin-home-banner.css'
const Banner=()=>{
  return (
    <div className="sortin-app-banner" id="sortin-app-banner">
    <div className="sortin-app-banner-coin-cont">
      {/* <img src={sortin_earth} alt="" className="sortin-app-banner-earth" width="40" height="40"/> */}
      {/* <img src={sortin_coin} alt="" className="sortin-app-banner-coin" width="40" height="40"/> */}
    </div>
    <p><span>Earn</span> rewards for living sustainably</p>
    {/* <img src={sortin_arrow} alt="" className="sortin-app-banner-arrow" width="20" height="20"/> */}
  </div>
  )
}

export default Banner
