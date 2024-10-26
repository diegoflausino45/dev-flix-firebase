import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { db } from "../../Services/firebaseConnection"
import {doc,  getDocs, collection, deleteDoc } from "firebase/firestore"
import './style.css'
import { toast } from "react-toastify"

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        async function loadFilmes(){
            await getDocs(collection(db, "filmes"))
            .then((snapshot) => {
                const lista = []

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,  // ID do Firestore, usado para exclusão
                        nome: doc.data().nome,
                        filmeId: doc.data().id  // ID do filme, usado para navegação
                    })
                })
                setFilmes(lista)
            })
        }

        loadFilmes()

    }, [])

    async function Excluir(id){
        try {
            await deleteDoc(doc(db, "filmes", id));
            setFilmes(filmes.filter((filme) => filme.id !== id));
            toast.success("Filme excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir o filme:", error);
            toast.dark("Erro ao excluir o filme.");
        }
    }

    return(
        <div className="secao-favoritos">
            {filmes.length === 0 && <span>Você não possui filmes salvos :(</span>}
            {filmes.map((filme) => {
                return(
                    <article className="favoritos" key={filme.id}>
                        <div className="fotoTexto">
                            <p>{filme.nome}</p>
                        </div>

                        <div className="links">
                        <Link to={`/filmes/${filme.id}`}>Ver Detalhes</Link>
                        <button onClick={() => Excluir(filme.id)}>Excluir</button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}


export default Favoritos