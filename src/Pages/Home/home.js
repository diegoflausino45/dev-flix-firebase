import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../Services/api"
import "./style.css"

function Home(){
    
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadFilmes(){
            await api.get("movie/now_playing", {
                params:{
                    api_key: "5b2d39e0954c645642b9a9488a57f14f",
                    language: "pt-br",
                    page: 1
                }
            })
            .then((response) => {
                setFilmes(response.data.results.slice(0, 10))
                setLoading(false)
            })
            .catch(() => {
                console.log("Erro ao consumir API")
            })
        }
        loadFilmes()

    }, [])

    if(loading){
        return(
            <div>
                <h1>Carregando Filmes...</h1>
            </div>
        )
    }


    return(
        <div className="Home">
            {filmes.map((filme)=> {
                return(
                    <article className="filme" key={filme.id}>
                        <h2>{filme.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                        <Link to={`/filmes/${filme.id}`}>Acessar</Link>
                    </article>
                )
            })}
        </div>
    )
}


export default Home