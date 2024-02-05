import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Polyline , Marker , Popup  } from 'react-leaflet'
import { config } from '../../config';
import { obtenerRuta } from '../../services/gpsService'
import {IconLocation} from '../../components/iconLocation'

const url = `${config.apiUrl2}/gps`

function ViewGps() {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [coordenadas, setCoordenadas] = useState([])
  const ruta = [
    [3.46599401287944, -76.521362722966], // Punto 1
    [3.4632462519656526, -76.52075099142638],   // Punto 2
    [3.4626356373460223, -76.52174505517829],
    [3.4616433877493438, -76.52143918940847],
    [3.458284996787883 , -76.52075099142638],
    [3.4543923014704547 , -76.51983339411692],
    [3.452713094639088 , -76.51899226324991],
  ]

  useEffect(()=>{
    const obtener = async () =>{
      try{
        const response = await axios.get(`${url}/obtener-coordenadas`)
        setCoordinates(response)
      }catch (error) {
        console.error('Error al obtener coordenadas:', error);
      }
      obtener();
    }
  })

  /* useEffect(()=>{
    obtenerRuta()
    .then(({data})=>{
      setCoordenadas(data)
    })
  },[]) */
  /* useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(`${url}/obtener-coordenadas`);
        const { coordenadas } = response.data;
        setCoordinates(coordenadas);
      } catch (error) {
        console.error('Error al obtener coordenadas:', error);
      }
    };

    fetchCoordinates();
  }, []); */

  return (
    <div className='wrapper w-100 h-100 justify-content-center d-flex flex-column pt-5'>
        <MapContainer center={{lat:'3.4512653723079487',lng:'-76.53013093778655'}} zoom={10}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline weight={6} positions={coordinates} color='green' />
            {coordinates.map((item,i)=>{
              <Marker 
                key={i}
                position={{lat:item.latitud,lng:item.longitud}}
                icon={IconLocation}
                />
            })}
        </MapContainer>
        <div style={{backgroundColor:'white'}}>
          <ul>
          {coordinates.map((coord, index) => (
            <li key={index}>{`Latitud: ${coord.latitud}, Longitud: ${coord.longitud}`}</li>
          ))}
        </ul>
        </div>
    </div>
  )
}

export default ViewGps;
