import React from 'react'
import "./DevForm.css"
import axios from "axios"
import { useState, useEffect, useContext } from 'react'
// Componentes de navegação:
import { Navigate, useNavigate } from 'react-router-dom'
// Componente de contexto:
import {SomeContext} from "../context/Context"

const DevForm = () => {
  // State de contexto:
  const  { newGet,
    setNewGet,
    addDev,
    setaddDev,
    editDev,
    setEditDev,
    deleteDev,
    setDeleteDev,
    showNotification,
    setShowNotification,} = useContext(SomeContext)
// States das informações:
const [imageSrc, setImageSrc] = useState('')
const [name, setName] = useState()
const [lastName, setLastName] = useState()
const [category, setCategory] = useState()
const [tecnologie, setTecnologie] = useState([])
const [email, setEmail] = useState()
const [tel, setTel] = useState()
const [github, setGitHub] = useState()
const [nivel, setNivel] = useState()
const [handleTec, setHandleTec] = useState("")

// Navigate:
const navigate = useNavigate()
// Adicionar nova tecnologia
const addNewTec = () =>{
if(handleTec === ""){
 
}else{
  setTecnologie(prevTecnologie => [...prevTecnologie, handleTec])
  setHandleTec("")
 console.log(tecnologie)
}
}

// Deletar tecnologia:
const deleteTec = (index) =>{
  setTecnologie((prevTecnologie) =>
    prevTecnologie.filter((tec, i) => i !== index)
  );
}

// Fazer o cadastro do dev POST:
// Submeter o formulario:
const handleSubmit =  async(e) =>{
  e.preventDefault() //previnir o reenvio do formulario

  const newDev = {
    photo: imageSrc,
    name: name,
    lastName: lastName,
    categorie: category,
    technologies: [...tecnologie],
    email: email,
    tel:tel,
    github: github,
    nivel: nivel
  }
  
  await axios.post("http://localhost:3000/developers", newDev)
  


  // Limpar formulario
  setEmail("")
  setName("")
  setLastName("")
  setTel("")
  setImageSrc("")
  setGitHub("")
  setCategory()
  setNivel()
  setNewGet(true)
  setaddDev(true)
  setShowNotification(true)
  setTimeout(() => {
    setShowNotification(false)
    setaddDev(false)
    
  },2000 
);

navigate("/")

  };
    // Upar foto:
    const handleImageChange = (event) => {
      const file = event.target.files[0]; // Pegue o primeiro arquivo selecionado
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Crie uma URL temporária para a imagem
        setImageSrc(imageUrl); // Atualize o estado com a URL da imagem
      }
      React.useEffect(() => {
        return () => {
          if (imageSrc) {
            URL.revokeObjectURL(imageSrc); // Libere a URL temporária
          }
        };
      }, [imageSrc]);



}
  return (
    <div className='dev-form' >
      <h1>REGISTRAR NOVO DESENVOLVEDOR</h1>
      <form className='form' onSubmit={(e) => handleSubmit(e)}> 
        <div className="image-section">
          <div className="image-container">
          {imageSrc && <img src={imageSrc} name="photo" className='photo-profile' alt="Uploaded Preview" />}
          </div>
         <label className='custom-file'>
          <span>Adicionar foto</span>
          <input type="file" className='file-btn' onChange={handleImageChange} />
         </label>
        </div>

        <div className="information">

          <div className="dev-name">
          <input type="text" id='name' name='name' placeholder='NOME:' value={name} onChange={(e)=>setName(e.target.value)} required/>
          <input type="text" id='nickName' name='nickName' placeholder='SOBRENOME:' value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
          </div>

          <div className="dev-categorie">
            <h2>CATEGORIA:</h2>
            <label htmlFor="front">
              <span>Front-end</span>
              <input type="radio" name="categorie" id="front" value="Front-end" onClick={(e)=>setCategory(e.target.value)} />
            <span className="radio-mark"></span>
            </label>
            <label htmlFor="back">
              <span>Back-end</span>
              <input type="radio" name="categorie" id="back" value="Back-end" onClick={(e)=>setCategory(e.target.value)} />
           <span className="radio-mark"></span>
            </label>
            <label htmlFor="full">
              <span>Full-stack</span>
              <input type="radio" name="categorie" id="full" value="Full-Stack" onClick={(e)=>setCategory(e.target.value)} />
           <span className="radio-mark"></span>
            </label>
          </div>

          <div className="dev-tecnologies">
            <h2>TECNOLOGIA:</h2>
            <div className="tecnologies">
            <input type="text" name="tecnologie" id="tec-btn" placeholder='ADICIONE UMA TECNOLOGIA:' value={handleTec} onChange={(e)=>setHandleTec(e.target.value)} />
            <input type="button" value="Adicionar" className='add-btn'  onClick={addNewTec}/>
            </div>
            <div className="added-tecnologies">
              {/* tecnolgias adicionadas */}
                <ul >
                {tecnologie.map((tec, index)=>(
             <li className='list-tecnologies' key={index}>{tec}
             <span onClick={() => deleteTec(index)} >X</span>
             </li>
            ))}
                </ul>
            </div>
          </div>

          <div className="dev-adicionais">
            <div className="addictions">
              <h2>ADICIONAIS:</h2>
              <input type="text" name='email' id='email' placeholder='EMAIL:' value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
              <input type="tel" name='tel' id='tel' placeholder='TEL:'  value={tel} onChange={(e)=>setTel(e.target.value)} required/>
              <input type="text" name='github' id='github' placeholder='GITHUB:' value={github} onChange={(e)=>setGitHub(e.target.value)} required/>
            </div>

            <div className="dev-nivel">
              <h2>NÍVEL:</h2>
              <label htmlFor="junior">
                <span>Junior</span>
                <input type="radio" className='radio-nivel' name="nivel" id="junior" value="junior" onClick={(e) =>setNivel(e.target.value)} />
                  <span className="radio-mark"></span>
              </label>
              <label htmlFor="pleno">
                <span>Pleno</span>
                <input type="radio" className='radio-nivel' name="nivel" id="pleno" value="pleno" onClick={(e) =>setNivel(e.target.value)} />
                  <span className="radio-mark"></span>
              </label>
              <label htmlFor="senior">
                <span>Senior</span>
                <input type="radio" className='radio-nivel' name="nivel" id="senior" value="senior" onClick={(e) =>setNivel(e.target.value)} />
                  <span className="radio-mark"></span>
              </label>
            </div>
          </div>
          <div className="action">
            <input type="submit" value="CADASTRAR" />
          </div>
            
        </div>
      </form>
 
    </div>
  )
}

export default DevForm
