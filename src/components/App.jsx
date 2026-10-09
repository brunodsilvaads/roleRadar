import Cartao from './Cartao'
import Creditos from './Creditos'
import Loading from './Loading'
import React from 'react'
import MeuPonto from './MeuPonto'
import geoapifyClient from '../utils/geoapifyClient'
import { Button } from '@primereact/ui/button'
import Busca from './Busca'
import Lugar from './Lugar'
import ListaLugares from './ListaLugares'
import MapaRadar from './MapaRadar'



class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        buscando:false,
        erroBusca:null,
        raioBuscado:null,
        lugares:null
    }

    componentDidMount() {
        this.obterLocalizacao()
    }
    obterAno = () => {
        return new Date().getFullYear()
    }

    render() 
    
    {console.log(this.state.lugares)
        
        const estiloSubtitulo = {
            fontSize: '20px',
            color: 'gray'
        }
        
        return (
            

            <div className="grid">
                <div className="col-12 text-center">
                    <div className='flex align-items-center justify-content-center'>
                        <i className='pi pi-map-marker mr-2' />
                        <h1 className="titulo">
                            RolêRadar
                        </h1>
                    
                </div>
                <p style={estiloSubtitulo}>
                    Descubra o que existe perto de você
                </p>
                <Creditos />
                </div>
                <div className="col-6">
                    {
                        (!this.state.latitude && !this.state.mensagemDeErro) ?
                            <Loading mensagem="Aguardando permissão de localização..."/>
                            :
                            this.state.mensagemDeErro ?
                                <p>
                                   {this.state.mensagemDeErro} 
                                </p>
                                :
                                <Cartao cabecalho='Você está aqui'>
                                    <MeuPonto horarioLocalizacao={this.state.horarioLocalizacao} latitude={this.state.latitude} longitude={this.state.longitude} onAtualizar={this.obterLocalizacao}/>
                                </Cartao>  
                    }
                    
                    <Cartao cabecalho="O que você procura?">
                        <Busca onBuscaRealizada={this.onBuscaRealizada} ></Busca>
                    </Cartao>
                    </div>
                    
                    <div className="col-6">
                        {
                            (this.state.buscando)?
                                <Loading mensagem="Aguardando permissão de localização..."/>
                                :
                                (this.state.erroBusca!=null)?
                                    <p>{this.state.erroBusca}</p>
                                    :
                                    (this.state.lugares==null)?
                                        <p></p>
                                    :
                                        (this.state.lugares.length==0)?
                                            <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                                        :   
                                            <div>
                                                <div className='m-3'>
                                                {
                                                    this.state.lugares.length>1? <strong><p> {this.state.lugares.length} lugares encontrados em até {this.state.raioBuscado}m</p> </strong> : <strong><p>1 lugar encontrado em até {this.state.raioBuscado}</p></strong>
                                                }
                                                </div>
                                                <Cartao className='w-full' cabecalho="Radar"><MapaRadar latitude={this.state.latitude} longitude={this.state.longitude} lugares={this.state.lugares}/></Cartao>
                                            </div>
                                            
                                
                        }
                        {
                            (!this.state.lugares) ?
                            null
                            :
                            (this.state.lugares.length === 0) ?
                            
                            <p>Nenhum lugar encontrado</p> 
                            :
                            <ListaLugares lugares={this.state.lugares}/>
                        }
                    </div>
                    
                
                
                <footer className="col-12 text-center">
                    RolêRadar © {this.obterAno()}
                </footer>
            </div>
        )
    }
    onBuscaRealizada = (categoria, raio) => {
        this.setState({buscando:true, raioBuscado:raio})
        geoapifyClient.get('/places', {
            params: {
                categories: categoria,
                filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                bias:`proximity:${this.state.longitude},${this.state.latitude}`,
                limit:20
            }  
        }).then(
            result=>{
                this.setState({
                    lugares: result.data.features,
                    buscando:false,
                    erroBusca:null,
                    raioBuscado:raio
                })
        
        },
        (erro) => {
                console.log(`Erro: ${erro}`)
                this.setState({
                    erroBusca: 'Não foi possível consultar os lugares. Tente novamente.',
                    buscando:false
                })
            }
        )
    }
    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    horarioLocalizacao: Date.now(),
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    mensagemDeErro: null
                })
            },
            (erro) => {
                console.log(`Erro: ${erro}`)
                this.setState({
                    mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
                })
            }
        )
    }


    
    
}
export default App 