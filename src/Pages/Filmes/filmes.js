import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../Services/api";
import "./filmes.css"
import { db } from "../../Services/firebaseConnection";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

function Filmes(){

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "5b2d39e0954c645642b9a9488a57f14f",
                    language: "pt-br"
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigate("/")
                return
            })

        }

        loadFilme()
        return() => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    if(loading){
        return(
            <div>
                <h1>Carregando Filme...</h1>
            </div>
        )
    }
    
  

    async function salvarDados() {
        // Obtém todos os documentos da coleção "filmes"
        const snapshot = await getDocs(collection(db, "filmes"));
    
        // Verifica se algum documento já possui o mesmo ID que o filme atual
        const filmeExiste = snapshot.docs.some((doc) => doc.data().id === filme.id);
    
        if (filmeExiste) {
            toast.warn("O filme já foi salvo anteriormente.");
            return;
        }
    
        // Adiciona o filme ao Firestore, caso ele não exista
        await addDoc(collection(db, "filmes"), {
            id: filme.id,
            nome: filme.title,
        });
        toast.success("Filme salvo com sucesso!");
    }
    


    return(
        <div className="container">
            <article className="filmes">
                <h2>{filme.title}</h2>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
                <strong>Sinopse:</strong>
                <p>{filme.overview}</p>
                <p><strong>Avaliação: </strong>{filme.vote_average}</p>
                <div className="botoes">
                    <button onClick={salvarDados}>Salvar</button>
                    <button><a target="blank" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
                </div>
            </article>
        </div>
    )

}

export default Filmes