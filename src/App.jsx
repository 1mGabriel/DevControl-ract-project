// Componentes

// Componentes de uso:
import { Outlet } from "react-router-dom";
import { SomeContext } from "./context/Context";
import { useContext } from "react";
// Css:
import "./App.css";
import NavBar from "./Routes/NavBar";
import DevList from "./components/DevList";
import Notification from "./components/Notification";

function App() {
  // Contexto
  const {
    addDev,
    setaddDev,
    editDev,
    setEditDev,
    deleteDev,
    setDeleteDev,
    showNotification,
    setShowNotification,
  } = useContext(SomeContext);

  return (
    <div className="main">
      <NavBar />
      <div className="container">
        <div className="outlet">
          <Outlet />
        </div>
        <div className="list-dev">
          <DevList />
          {showNotification ? (
            <div className="notification show">
              <Notification />
            </div>
          ) : (
            <div className="notification hidden">
              <Notification />
            </div>
          )}
        </div>
      </div>
      <footer>Desenvolvido por mim</footer>
    </div>
  );
}

export default App;
