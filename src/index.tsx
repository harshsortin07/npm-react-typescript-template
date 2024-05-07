import React from 'react'
import { carbon } from './carbonData';

 function Sortin
() {

  // const[data,setData]= useState([])

//   const fetchData=()=>{
    
// fetch('https://dummyjson.com/products/1')
// .then(res => res.json())
// .then(json => setData(json))
//   }


// async function fetchData(url: string): Promise<any> {
//   try {
//       const response = await fetch(url);
//       if (!response.ok) {
//           throw new Error('Failed to fetch data');
//       }
//       return await response.json();
//   } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error;
//   }
// }

// function createJSONFile(data: any, filename: string): void {
//   try {
//       const jsonData = JSON.stringify(data, null, 2);
//       fs.writeFileSync(filename, jsonData);
//       console.log(`JSON file "${filename}" created successfully.`);
//   } catch (error) {
//       console.error('Error creating JSON file:', error);
//       throw error;
//   }
// }

// function isJSONFileValid(filename: string): boolean {
//   try {
//       if (!fs.existsSync(filename)) {
//           return false;
//       }

//       const { birthtime } = fs.statSync(filename);
//       const twentyFourHoursAgo = new Date().getTime() - 24 * 60 * 60 * 1000;
//       return birthtime.getTime() > twentyFourHoursAgo;
//   } catch (error) {
//       console.error('Error checking JSON file validity:', error);
//       return false;
//   }
// }
// async function fetchDataIfNeeded(url: string, filename: string): Promise<void> {
//   try {
//       if (!isJSONFileValid(filename)) {
//           const data = await fetchData(url);
//           createJSONFile(data, filename);
//       } else {
//           console.log('JSON file is valid. No need to fetch data.');
//       }
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// }
// useEffect(()=>{
//     fetchDataIfNeeded('https://dummyjson.com/products/1', 'data')
// },[])

const url= window.location.href;
const urlSplit= url.split('/')

const id= urlSplit[urlSplit.length-1]

  return (
    <div>
    <h2>Welcome To Sortin</h2>
    <iframe
            src="http://localhost:3000/"
            title="Example Iframe"
            width="1000px"
            height="1000px"
            frameBorder="0"
            allowFullScreen
        ></iframe>
      <h2>Product Id: {id}</h2>
      {carbon.map((data:any)=>{
        return(
          data.id===id ? <h2>Carbon: {data.carbon}</h2> : ''
        )
      })}
    </div>
  )
}

export default Sortin