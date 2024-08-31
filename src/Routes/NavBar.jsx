import React from 'react'
import { Link } from 'react-router-dom'
// CSS:
import "./Navbar.css"

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <Link to="/"><h1>DEV.CONTROL</h1></Link>
        <button><Link to="/form">Cadastrar</Link></button>
      </div>
    </nav>
  )
}

export default NavBar
