import React from 'react'
import { carbon } from './carbonData';
import Banner from './components/Banner';
import '../src/assets/sortin-home-banner.css'

 function Sortin
() {

const url= window.location.href;
const urlSplit= url.split('/')

const id= urlSplit[urlSplit.length-1]

  return (
    <div>
    <h2>Welcome To Sortin</h2>
      <h2>Product Id: {id}</h2>
      {carbon.map((data:any)=>{
        return(
          data.id===id ? <h2>Carbon: {data.carbon}</h2> : ''
        )
      })}
      <Banner/>
    </div>
  )
}

export default Sortin