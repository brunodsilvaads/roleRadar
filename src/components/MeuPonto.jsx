import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { GEOAPIFY_KEY } from '../utils/chaves'
export default class MeuPonto extends Component {
  state={
    agora:null,
    hemisferio:null,
    url:null
  }
  timer=null
  
  componentDidMount(){
    setInterval(()=>{
      this.setState({
        agora:new Date().toLocaleTimeString()
      })
    }, 1000)
    console.log("componentDidMount")
  }
    componentWillUnmount(){
        clearInterval(this.timer.clearInterval)
        console.log("componentWillUnmount")
    }
    componentDidUpdate(){
      console.log(this.timer)
    }
    
  render() {
    this.setState({
      url:`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${this.props.longitude},${this.props.latitude}&zoom=16&marker=lonlat:${this.props.longitude},${this.props.latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`,
      hemisferio:this.props.latitude<0 ? 'Sul' :  'Norte'
    })
    return (
      <div>
        <img className='w-full' src={this.state.url} alt="Sua localização" />
        <p>Latitude: {this.props.latitude.toFixed(4)} | Logitude: {this.props.longitude.toFixed(4)}</p>
        <p>Hemisfério {this.state.hemisferio}</p>
        <p>Localização obtida há {this.timer} s</p>
        <Button
            onClick={this.props.onAtualizar}>
            <i className="pi pi-refresh mr-2"></i>
            Atualizar localização
          </Button>
      </div>
    )
  }
  
  
}
