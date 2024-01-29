import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import { useLocation } from "react-router-dom";
import {MapContainer, TileLayer, Polyline } from 'react-leaflet'
import Markers from "../markers";
import {findRegistros} from '../../services/registroService'

const GpsMap =()=>{
  /* 
    3.509994954062947, -76.50271116816316
    3.503912386997092, -76.50588690372348
    3.4995003593801286, -76.50695978735872
    3.4936319021054496, -76.50893389324756
  */
  /* const ruta = [
    [3.509994954062947, -76.50271116816316], // Punto 1
    [3.503912386997092, -76.50588690372348],   // Punto 2
    [3.4995003593801286, -76.50695978735872],
    [3.4936319021054496, -76.50893389324756]   // Punto 3
  ]; */
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
    }, 300);

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
        <Polyline weight={7} positions={ruta} color="blue"/>
        {/* <Markers places = {ruta}/> */}
    </MapContainer>
}
export default GpsMap