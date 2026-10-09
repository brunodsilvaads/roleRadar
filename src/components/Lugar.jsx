import Cartao from './Cartao'

const estiloCirculo = {
            width:'30px',
            height:'30px',
            borderRadius: '50%',
            backgroundColor: '#771177',
            color: '#ffffff',
            display:'flex',
            alignItems: 'center' ,
            justifyContent: 'center'
        }

const formatarDistancia = (distancia) => {
    if (distancia < 1000) {
        return `a ${Math.round(distancia)} m`
    }else{
        return `a ${(distancia/1000).toFixed(1).replace('.',',')} km`
    }

}

const Lugar = ({numero,nome,endereco,distancia}) => {
return(
    <Cartao cabecalho = {formatarDistancia(distancia)} >

<div className="flex align-items-center">
<div style={estiloCirculo} className="mr-2">{numero}</div>

<div>
<div><b>{nome ? nome :'Sem nome' }</b></div>

<div>{endereco}</div>
</div>

</div>
    
    </Cartao>


)

}

export default Lugar
