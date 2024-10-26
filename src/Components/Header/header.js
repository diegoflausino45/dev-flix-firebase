import { Link } from "react-router-dom"
import "./style.css"

function Header(){
    return(
        <header>
            <div className="container">
                <div className="logo">
                    <Link to="/">Dev Flix</Link>
                </div>

                <div className="favoritos">
                    <Link to="/favoritos">Meus favoritos</Link>
                </div>
            </div>
        </header>
    )
}

export default Header