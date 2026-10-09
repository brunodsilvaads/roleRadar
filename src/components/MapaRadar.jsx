import React from 'react'
import { GEOAPIFY_KEY } from '../utils/chaves'

export default function MapaRadar(props) {
    const defineUrl=()=>{
        return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${usuario}|${opcoes}&apiKey=${GEOAPIFY_KEY}`
    }
    const usuario =`lonlat:${props.longitude},${props.latitude};color:%23d32f2f;size:48`
    const opcoes= props.lugares.map((lugar, key)=>(
            `lonlat:${lugar.properties.lon},${lugar.properties.lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${key+1}`
        )).join("|")
    return (
    <div className="w-full">
        {console.log(defineUrl())}
        <img src={defineUrl()} alt="Radar com os lugares encontrados" />
    </div>
  )
  
}
