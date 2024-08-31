import {useContext, useState} from 'react'
import {SomeContext} from "../context/Context"
import "./Notification.css"

const Notification = () => {
// Contexto
    const  { 
        addDev,
        setaddDev,
        editDev,
        setEditDev,
        deleteDev,
        setDeleteDev,} = useContext(SomeContext)

  return (
    <div className='notification-container'>
      {addDev && 
        <div className="notification-content add">
          <p>NOVO DESENVOLVEDOR ADICIONADO</p>
        </div>
      }
      {editDev && 
        <div className="notification-content edit">
          <p>DESENVOLVEDOR ALTERADO</p>
        </div>
      }
      {deleteDev && 
        <div className="notification-content delete">
          <p>DESENVOLVEDOR REMOVIDO</p>
        </div>
      }
    </div>
  )
}

export default Notification
