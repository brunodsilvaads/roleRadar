import Cartao from './components/Cartao'
import Creditos from './components/Creditos'
import Loading from './components/Loading'
import React from 'react'
import MeuPonto from './components/MeuPonto'
import geoapifyClient from './utils/geoapifyClient'
import { Button } from '@primereact/ui/button'
import Busca from './components/Busca'
import Lugar from './components/Lugar'
import ListaLugares from './components/ListaLugares'



class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null
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
                        <Busca onBuscaRealizada={this.onBuscaRealizada}></Busca>
                    </Cartao>
                    </div>
                    
                    <div className="col-6">
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
    onBuscaRealizada = async (categoria, raio) => {
    
        const result = await geoapifyClient.get('/places', {
            params: {
                categories: categoria,
                filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                bias:`proximity:${this.state.longitude},${this.state.latitude}`,
                limit:20
            }  
        })
        console.log(result.data.features)
        this.setState({
            lugares: result.data.features

        })
        
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