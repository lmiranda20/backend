
import { Link } from "react-router-dom";
import './Menu.css';
import { useAuth } from "../api/AuthContext";

const Menu = () => {
  const {logout} = useAuth;
  const handleLogout= ()=>{
    logout()
    alert ('Sesion cerrada')
  }
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/pociones">Gestión de Pociones</Link></li>
        <li><Link to="/casas">Casas</Link></li>
        <li><Link to="/personajes">Personajes</Link></li>
        <li><Link to="/hechizos">Hechizos</Link></li>
        <li><Link to="/register">Registro</Link></li>
        <li><Link to="/login">iniciar Sesion</Link></li>
        <li><Link to="/protegida">Contenido Protegido</Link></li>
        <li><Link onClick={handleLogout}> Cerrar Sesion</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;
