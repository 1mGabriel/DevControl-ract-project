// lIBS REACT
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Contexto
import {SomeContext} from "../context/Context"

// css
import "./DevInformation.css";

const DevInformation = () => {
  const { id } = useParams(); //Pega o paramentro id da url
  const [data, setData] = useState([]);
  const [technologies, setTechnologies] = useState([]);
// Contexto:

const  { 
  newGet,
  setNewGet,
  addDev,
  setaddDev,
  editDev,
  setEditDev,
  deleteDev,
  setDeleteDev,
  showNotification,
  setShowNotification,} = useContext(SomeContext)


  // STATE DE CLASSES:
  const [classHide, setClassHide] = useState(false);
  const [containerClassHide, setContainerClassHide] = useState(true)

  // Navegação apos a exlusão:
  const navigate = useNavigate()

  // Função para alternar as classes:
  const hideDevContainer = () =>{
    setClassHide(true)
    setContainerClassHide(false)
  }

  const hideDeleteContainer = () =>{
    setClassHide(false)
    setContainerClassHide(true)
  }


  // GET dos dados:
  const getDev = async () => {
    try {
      // tentativa de cahamda de dados:
      const response = await axios.get(
        `http://localhost:3000/developers/${id}`
      );
      const data = response.data;
      setData(data);
      setTechnologies(data.technologies);
    }catch (error) {
      console.log(error);
    }
  };

  // Chamando a função de resgate:
  useEffect(() => {
    getDev();
  }, [id]);

  //Função para deletar o desenvolvedor:
// Deletar tecnologia:
const deleteTheDev = () =>{
  axios.delete(`http://localhost:3000/developers/${id}`)
  .then(() =>{
    setData(data.filter(data => data.id !== id)) //Remove o usuario do estado
  })
  .catch((error) =>{
    console.log(error)
  })

  navigate("/")
  setNewGet(true)
  setShowNotification(true)
 setDeleteDev(true)
    setTimeout(() => {
      setShowNotification(false)
      setDeleteDev(false)
    },2000 
  );


}


  return (
    <>
      <div className={ classHide ? ("delete-section"):("hide")}>
        <h2>Deseja excluir esse desenvolvedor?</h2>
        <div className="deleteDev">
          <img src={data.photo} alt="foto do dev" />
          <h3>{data.name} {data.lastName}</h3>
        </div>
       <div className="delete-actions">
       <input type="button" id="delete" value="SIM" onClick={deleteTheDev} />
       <input type="button" id="no-delete" value="NÃO" onClick={hideDeleteContainer} />
       </div>
      </div>

      <div key={data.id} className={containerClassHide ? "dev-info-container" : "hide"}>
        <h1>DESENVOLVEDOR</h1>
        <div className="dev-info-section">
          <div className="dev-information-content">
            <div className="dev-infomation-image">
              <img src={data.photo} alt="foto do desenvolvedor" />
            </div>
            <div className="dev-information-infos">
              <h2>{data.name + " " + data.lastName}</h2>
              <p>{`Desenvolvedor ${data.categorie}`}</p>
              <p>
                <span>Nível:</span> {data.nivel}
              </p>
              <p>
                <span>{data.email}</span>
              </p>
              <p>
                <span>Tel: </span>
                {data.tel}
              </p>
              <p>
                <span>GitHub: </span> {data.github}
              </p>
            </div>
          </div>
          <div className="dev-information-tecnologies">
            <h2>TECNOLOGIAS:</h2>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="actions">
        <Link to={`/developer/${id}/edit`}><input type="button" className="edit-btn" value="Editar" /></Link>
          <input type="button" className="excluir-btn" value="Excluir" onClick={hideDevContainer} />
        </div>
      </div>
    </>
  );
};

export default DevInformation;
