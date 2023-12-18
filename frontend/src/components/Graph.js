import React , {useState} from 'react'
import api from '../api'

export default function Graphs() {
    
  const [image, setImage] = useState();
  const[imagepie, setImagepie] = useState();


    const getImage = () => {
        api.get("api/inventory/graph", {
            responseType: "arraybuffer"
          })
          .then((res) => {
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
          setImage(base64)
        })
      }
      const getImagepie = () => {
        api.get("api/inventory/graph_pie", {
            responseType: "arraybuffer"
          })
          .then((res) => {
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
          setImagepie(base64)
        })
      }
    //   getImagepie();
    //   getImage();
   
  return (
    <>
    <div className="alert alert-info" role="alert">
            <h3 className='text-center'>Dashboard </h3>
    </div>
    <div className='d-flex justify-content-center'>
        <button className='btn btn-success' onClick={function(){getImage(); getImagepie();}}>Load Graph</button>
    </div>
    <div className='row'>
        <div className='col-7'>
        <img src={`data:;base64,${image}`} alt="Bar Graph" />
        </div>
        
        <div className='col-5'>
        <img src={`data:;base64,${imagepie}`} alt="Pie Chart" />
        </div>
    </div>
    </>
    
  );
}
