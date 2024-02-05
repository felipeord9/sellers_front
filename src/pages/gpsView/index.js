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

  useEffect(()=>{
    obtenerRuta()
    .then(({data})=>{
      const filtro = data.filter((item)=>{
        if(item[0]!==null && item[1]!==null){
          return item
        }
      })
      setCoordenadas(filtro)
    })
  },[])
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
//4.711923546299663, -74.07280335337589
  return (
    <div className='wrapper w-100 h-100 justify-content-center d-flex flex-column pt-5'>
        <MapContainer center={{lat:'4.711923546299663',lng:'-74.07280335337589'}} zoom={6}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline weight={7} positions={coordenadas} color='green' />
            {coordenadas.map((item,i)=>{
              <Marker 
                key={i}
                position={item}
                icon={IconLocation}
                />
            })}
        </MapContainer>
        {/* <div style={{backgroundColor:'white'}}>
          <ul>
          {coordenadas.map((coord, index) => (
            <li key={index}>{`Latitud: ${coord[0]}, Longitud: ${coord[1]}`}</li>
          ))}
        </ul>
        </div> */}
    </div>
  )
}

export default ViewGps;
