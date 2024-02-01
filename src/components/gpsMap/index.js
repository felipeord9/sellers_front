import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import { useLocation } from "react-router-dom";
import {MapContainer, TileLayer, Polyline , Marker , Popup  } from 'react-leaflet'
import Markers from "../markers";
import {findRegistros} from '../../services/registroService'
import L from 'leaflet'

const GpsMap =()=>{
  /* 
    3.509994954062947, -76.50271116816316
    3.503912386997092, -76.50588690372348
    3.4995003593801286, -76.50695978735872
    3.4936319021054496, -76.50893389324756
  */

    /* 
    3.46599401287944, -76.521362722966
    3.4632462519656526, -76.52075099142638
    3.4626356373460223, -76.52174505517829
    3.4616433877493438, -76.52143918940847
    3.458284996787883, -76.52075099142638
    3.4543923014704547, -76.51983339411692
    3.452713094639088, -76.51899226324991
    3.4534000432472594, -76.51685120286118
    3.454086991358399, -76.51333374650824
    3.453552698426019, -76.50759876332413
    3.453247388043946, -76.50499890428065
    3.452789422286761, -76.49888158888426
    3.452713094639088, -76.4926878070454

    3.452178800933629, -76.48710575674619
    3.4515681791879147, -76.48297656885362
    3.4471411597975883, -76.48397063260553
    3.4471411597975883, -76.48358830039327
    */
  /* const ruta = [
    [3.46599401287944, -76.521362722966], // Punto 1
    [3.4632462519656526, -76.52075099142638],   // Punto 2
    [3.4626356373460223, -76.52174505517829],
    [3.4616433877493438, -76.52143918940847],
    [3.458284996787883 , -76.52075099142638],
    [3.4543923014704547 , -76.51983339411692],
    [3.452713094639088 , -76.51899226324991],
    [3.4534000432472594 , -76.51685120286118],
    [3.454086991358399 , -76.51333374650824],
    [3.453552698426019 , -76.50759876332413],
    [3.453247388043946 , -76.50759876332413],
    [3.452789422286761 , -76.50499890428065],
    [3.452713094639088 , -76.49888158888426],
    [3.452178800933629 , -76.4926878070454],
    [3.452178800933629 , -76.48710575674619],
    [3.4515681791879147 , -76.48297656885362],
    [3.4471411597975883 , -76.48397063260553],
    [3.4471411597975883 , -76.48358830039327],  // Punto 3
  ]; */
  /* const [posicion, setPosicion] = useState([0, 0]);
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
  }, []); */
  const IconLocation = L.icon({
    iconUrl: require('../../assest/ubicacion.png'),
    iconRetinaUrl: require('../../assest/ubicacion.png'),
    iconAnchor: null,
    shadowUrl: null,
    shadowAnchor: null,
    shadowSize: null,
    iconSize:[35,35],
    className:"leaflet-venue-icon",
})
  const [userLocation, setUserLocation] = useState(null);

  /* useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
          },
          function (error) {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    fetchLocation();
    const intervalId = setInterval(fetchLocation, 30000);
    return () => {
      clearInterval(intervalId);
    };
    
  }, []); */
useEffect(()=>{
  const interval = setInterval(()=>{
    navigator.geolocation.getCurrentPosition(
      position =>{
        setUserLocation([position.coords.latitude, position.coords.longitude]); 
      },
      error =>{
        console.error('Error getting geolocation:', error);
      }
    );
  },300)
  return ()=>clearInterval(interval)
},[])
      const [state,setState] = useState({
        currentLocation:{lat:'3.4512653723079487',lng:'-76.53013093778655'}
        //3.4512653723079487, -76.53013093778655
    })
    return <MapContainer center={state.currentLocation/* {lat:'3.5105353',lng:'-76.5064869'} */} zoom={10} >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />   
        {/* <Polyline weight={7} positions={ruta} color="blue"/> */}
        {userLocation && (
          <Marker position={userLocation} icon={IconLocation}>
            <Popup>Ubicación actual</Popup>
          </Marker>
        )}
        {/* <Markers places = {ruta}/> */}
        {/* {ruta} */}
        {userLocation}
    </MapContainer>
}
export default GpsMap