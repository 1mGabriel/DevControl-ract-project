// Libs para componetização
import React from 'react'
import {Link, NavLink} from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import axios from "axios" 
//  Componente de contexto:
import {SomeContext} from "../context/Context"
// css
import "./DevList.css"

const DevList = () => {
// states:
    const [data, setData] = useState ([])
    const  {newGet, setNewGet} = useContext(SomeContext)
// GET dos dados:
const getDev = async ()=>{
    try{
        // tentativa de cahamda de dados:
        const response = await axios.get("http://localhost:3000/developers")
        const data = response.data;
        setData(data)
    }catch(error){
        console.log(error.message)
    }
}
// Chamando a função de resgate:
useEffect(()=>{
    getDev()
},[])

// Verifica a atualização do BD sem entrar em loop para fazer uma nova requisição:
if(newGet){
    getDev()
    setTimeout(()=>{
        setNewGet(false)
    },100)
}


  return (
    <div className='list-container'>
      <h1>DESENVOLVEDORES </h1>
      {data.length == 0 ? 
      (
        <div className="not-exisit">
            <h3>Não há desenvolvedores cadastrados</h3>
        </div>
      ):(
        <div className="dev-list">
        {data.map((developer) =>(
            <NavLink 
            key={developer.name}
            to={`/developer/${developer.id}`}
            className={({isActive}) => (isActive ? "active-dev" : "developer")}>
                <div className="dev-image">
                    <img src={developer.photo} alt={`Foto do ${developer.name}`} />
                </div>
                <div className="dev-information">
                    <h2>{developer.name} {developer.lastName}</h2>
                    <p>Desenvolvedor {developer.categorie}</p>
                    <p><span>Nível:</span> {developer.nivel}</p>

                </div>
            </NavLink>
        ))}
      </div>
      )}
    
    </div>
  )
}

export default DevList
