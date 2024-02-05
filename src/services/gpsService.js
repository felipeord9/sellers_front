import axios from 'axios';
import { config } from '../config';

const url = `${config.apiUrl2}/gps`

/* function sendCoordenadas(body){
    return fetch(url,{
      method: 'POST',
      body: body
    })
    .then(res=>res.json())
    .then(res=>res.data)
  }
  export{
    sendCoordenadas
  } */

export const obtenerRuta = async () =>{
  const token = JSON.parse(localStorage.getItem("token"))
  const data = await axios.get(`${url}/obtener-coordenadas`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const sendCoordenadas = async (coordenadas)=>{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(url,{coordenadas},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data
}