import Cartao from './Cartao'
import Creditos from './Creditos'

const App = () => {
    const estiloSubtitulo = {
        fontSize: '20px',
        color: 'gray',  
    }
    const obterAno = () => {
      
        return new Date().getFullYear()
    }
    return (
    <div>
        <div>
            <div className='flex align-items-center'>
                <i className='pi pi-map-marker mr-2'/>
                <h1 className="titulo">
                    RolêRadar
                </h1>
            </div>
        </div> 
        <p style={estiloSubtitulo}>

            Descubra o que existe perto de você
        
        </p>
        <Creditos />
        <Cartao cabecalho="Teste">
            <p>Conteúdo do cartão</p>
        </Cartao>
    
        <footer>
            RolêRadar © {obterAno()}
        </footer>
    </div>
  )
    
}

export default App