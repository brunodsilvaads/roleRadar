import React, { Component } from 'react'
import Cartao from './Cartao'
import { Button } from '@primereact/ui/button'
import { InputText } from '@primereact/ui/inputtext'
import { IconField } from 'primereact/iconfield'

export default class Busca extends Component {
    state={
        categoria:null,
        raio:'1000',
        erro:null,
        
    }
    categorias=[
        {rotulo:'Cafés', chave:'catering.cafe'},
        {rotulo:'Restaurantes', chave:'catering.restaurant'},
        {rotulo:'Parques', chave:'leisure.park'},
        {rotulo:'Farmácias', chave:'healthcare.pharmacy'},
        {rotulo:'Supermercados', chave:'commercial.supermarket'},
        {rotulo:'Museus', chave:'entertainment.museum'}
    ]
    
    render() {
        return (
                <div className="w-full">
                    <div className="19col-13"> 
                    { 
                        this.categorias.map((categoria, key) => (  
                            <Button key={categoria.chave} className={(this.state.categoria==categoria.chave)?
                                'botao-categoria m-1'
                                :
                                'm-1'
                            } onClick={()=>this.setState({categoria:categoria.chave})}>{categoria.rotulo}</Button>
                        )) 
                        } 
                    </div> 
                    <IconField.Root>
                        <InputText
                        className="mt-2 w-full"
                        value={this.state.raio}
                        pt-root-onChange={this.raioAlterado}
                        pt-root-placeholder={this.props.dica}
                        />
                    </IconField.Root>
                    <Button onClick={()=>
                        (this.state.categoria!=null)?
                            (this.state.raio>=100 && this.state.raio<=5000)?
                                (this.props.onBuscaRealizada(this.state.categoria,this.state.raio),
                                this.setState({erro:null}))
                            :
                            this.setState({erro:"Informe um raio inteiro entre 100 e 5000 metros."})
                        :
                        this.setState({erro:"Escolha uma categoria."})
                    }
                        className='mt-2 mb-2 w-full'>
                        <IconField.Inset>
                        <i className="pi pi-search mr-2"></i> 
                        </IconField.Inset>
                        Buscar
                    </Button>
                    <p className='alerta-busca'>{this.state.erro}</p>
                    </div>
        )
    }
    raioAlterado = (evento) => {
    this.setState({raio: evento.target.value})
  }
}
Busca.defaultProps = {
  dica: 'Raio em metros(100 a 5000).'
}

