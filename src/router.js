import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Components/Header/header"
import Home from "./Pages/Home/home"
import Erro from "./Pages/Erro/erro"
import Filmes from "./Pages/Filmes/filmes"
import Favoritos from "./Pages/Favoritos/favoritos"

function RouterApp(){

    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filmes/:id" element={<Filmes/>}/>
                <Route path="/favoritos" element={<Favoritos/>}/>

                <Route path="*" element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}


export default RouterApp