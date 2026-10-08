import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { GEOAPIFY_KEY } from '../utils/chaves'
export default class MeuPonto extends Component {
  state={
    agora:null
  }
  timer=null
  
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.setState({
        agora: Date.now()
      })
    }, 1000)
    
  }
    componentWillUnmount(){
        clearInterval(this.timer.clearInterval)
        console.log("MeuPonto removido")
    }
    url=()=>{
      return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${this.props.longitude},${this.props.latitude}&zoom=16&marker=lonlat:${this.props.longitude},${this.props.latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`
    }
    hemisferio=()=>{
      return this.props.latitude<0 ? 'Sul' :  'Norte'
    }
    
    
  render() {
    const segundos = Math.floor((this.state.agora - this.props.horarioLocalizacao) / 1000)
    return (
      <div>
        <img className='w-full' src={this.url()} alt="Mapa da sua localização"/>
        <p>Latitude: {this.props.latitude.toFixed(4)} | Logitude: {this.props.longitude.toFixed(4)}</p>
        <p>Hemisfério {this.hemisferio()}</p>
        <p>Localização obtida há {segundos} s</p>
        <Button
            onClick={this.props.onAtualizar}>
            <i className="pi pi-refresh mr-2"></i>
            Atualizar localização
          </Button>
      </div>
    )
  }
  
  
}
