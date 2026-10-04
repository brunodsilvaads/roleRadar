 const Cartao = (props) => {
  return (
    <div className="border-round-lg border-2 border-300 m-3">

        <div className = "text-sm m-1 text-500 ">
          {props.cabecalho}
        </div>

        <div className = "border-top-1 m-1 border-300 mt-2 pt-3">
          {props.children}

        </div>
    </div>
  )
}

export default Cartao