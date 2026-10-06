import Cartao from './components/Cartao'
import Creditos from './components/Creditos'
import Loading from './components/Loading'
import React from 'react'
import MeuPonto from './components/MeuPonto'

class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.obterLocalizacao()
    }
    obterAno = () => {
        return new Date().getFullYear()
    }

    render() {
        console.log('render')
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
                </div>
                <footer>
                    RolêRadar © {this.obterAno()}
                </footer>
            </div>
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