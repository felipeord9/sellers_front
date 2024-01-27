import L from 'leaflet'

export const IconLocation = L.icon({
    iconUrl: require('../../assest/point.png'),
    iconRetinaUrl: require('../../assest/point.png'),
    iconAnchor: null,
    shadowUrl: null,
    shadowAnchor: null,
    shadowSize: null,
    iconSize:[35,35],
    className:"leaflet-venue-icon",
})
