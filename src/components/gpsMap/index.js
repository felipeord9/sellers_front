import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import { useLocation } from "react-router-dom";
import {MapContainer, TileLayer} from 'react-leaflet'
import Markers from "../markers";
import {findRegistros} from '../../services/registroService'

const GpsMap =()=>{
    const [posicion, setPosicion] = useState([0, 0]);
    const [ruta, setRuta] = useState([]);
    useEffect(() => {
        const interval = setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              const nuevaPosicion = [latitude, longitude];
              setPosicion(nuevaPosicion);
              setRuta(prevRuta => [...prevRuta, nuevaPosicion]);
            },
            error => console.error(error),
            { enableHighAccuracy: true }
          );
        }, 2000);
    
        return () => clearInterval(interval);
      }, []);
      const [state,setState] = useState({
        currentLocation:{lat:'3.4512653723079487',lng:'-76.53013093778655'}
        //3.4512653723079487, -76.53013093778655
    })
    return <MapContainer center={state.currentLocation/* {lat:'3.5105353',lng:'-76.5064869'} */} zoom={10} >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />   
        <Markers places = {ruta}/>
    </MapContainer>
}
export default GpsMap