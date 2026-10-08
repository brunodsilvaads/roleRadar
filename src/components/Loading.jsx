import { defaultProps } from 'primereact/animateonscroll'
import React, { Component } from 'react'

export default class Loading extends Component {
    
  render() {
    return (
      <div className='flex flex-column justify-content-center align-items-center border rounded p-3'>
            <div
                style={{fontSize: '2rem'}} 
                className="pi pi-spin pi-spinner"
                role='status'>
            </div>
            <p className='mt-4 text-primary'>{this.props.mensagem}</p>
      </div>
    )
  }
}
Loading.defaultProps={
        mensagem: 'Carregando...'
}
