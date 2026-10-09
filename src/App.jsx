import Cartao from './components/Cartao'
import Creditos from './components/Creditos'
import Loading from './components/Loading'
import React from 'react'
import MeuPonto from './components/MeuPonto'
import geoapifyClient from './utils/geoapifyClient'
import { Button } from '@primereact/ui/button'
import Busca from './components/Busca'
import ListaLugares from './components/ListaLugares'
import MapaRadar from './components/MapaRadar'


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

    render() {
        const estiloSubtitulo = {
            fontSize: '20px',
            color: 'gray'
        }
        return (

            <div>
                <div>
                    <div className='flex align-items-center'>
                        <i className='pi pi-map-marker mr-2' />
                        <h1 className="titulo">
                            RolêRadar
                        </h1>
                    </div>
                </div>
                <p style={estiloSubtitulo}>
                    Descubra o que existe perto de você
                </p>
                <Creditos />

                <div className="col-12 col-md-8">
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
                    <div>
                        {
                            (this.state.buscando)?
                                <Loading mensagem="Aguardando permissão de localização..."/>
                                :
                                (this.state.erroBusca!=null)?
                                    <p>this.state.erroBusca</p>
                                    :
                                    (this.state.lugares==null)?
                                        <p></p>
                                    :
                                        (this.state.lugares==[])?
                                            <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                                        :
                                            <Cartao cabecalho="Radar"><MapaRadar latitude={this.state.latitude} longitude={this.state.longitude} lugares={this.state.lugares}/></Cartao>
                                
                        }
                    </div>
                    <div>
                        {
                            (this.state.lugares) ?
                                <ListaLugares lugares={this.state.lugares}/>
                            :
                                null
                        }
                        <p>a</p>
                    </div>
                </div>
                <footer>
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