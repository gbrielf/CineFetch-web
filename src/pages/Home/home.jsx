import React, { useState } from 'react'
import { PlayCircle, Loader2 } from 'lucide-react'
import SearchBar from '../../components/SearchBar'
import MovieDetails from '../../components/MovieDetails'

export default function Home() {
  const [listaFilmes, setListaFilmes] = useState(null); // Lista da busca
  const [filmeSelecionado, setFilmeSelecionado] = useState(null); // Filme detalhado

  const selecionarFilme = (filmeClicado) => {
    console.log("Filme selecionado:", filmeClicado);
    setFilmeSelecionado(filmeClicado);
  };

  const fecharDetalhes = () => {
      setFilmeSelecionado(null);
  };

  return (
    <div className='font-geist flex flex-col items-center justify-start gap-8 px-4 py-12 w-full max-w-7xl mx-auto min-h-[80vh]'>
      
      {!filmeSelecionado && !listaFilmes && (
        <div className="text-center animate-in fade-in zoom-in duration-700">
            <h1 className='text-5xl font-extrabold text-amber-50 leading-tight mb-4 drop-shadow-lg'>
                Descubra onde assistir<br/>seus filmes favoritos
            </h1>
            <span className='text-lg font-medium text-amber-50/80 block max-w-2xl mx-auto drop-shadow-md'>
                Compare preços e disponibilidade em todas as plataformas de streaming.
            </span>
        </div>
      )}

      <div className="w-full flex justify-center sticky top-4 z-40">
         <SearchBar onResultados={(lista) => {
             setListaFilmes(lista);
             setFilmeSelecionado(null);
         }}/>
      </div>

      {listaFilmes && !filmeSelecionado && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-white text-xl mb-4 font-semibold border-l-4 border-red-500 pl-3">
                  Resultados da busca ({listaFilmes.length})
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {listaFilmes.map((filme) => (
                      <div 
                        key={filme.imdbID} 
                        onClick={() => selecionarFilme(filme)}
                        className="group relative aspect-[2/3] bg-slate-800 rounded-lg overflow-hidden cursor-pointer border border-slate-700 hover:border-red-500 hover:scale-105 transition-all duration-300 shadow-xl"
                      >
                          {filme.poster_url && filme.poster_url !== "N/A" ? (
                              <img src={filme.poster_url} alt={filme.titulo} className="w-full h-full object-cover" />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 p-2 text-center text-xs">
                                  Sem Imagem
                              </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                              <span className="text-white font-bold text-sm">{filme.titulo}</span>
                              <span className="text-slate-300 text-xs">{filme.ano}</span>
                              <PlayCircle className="text-red-500 w-8 h-8 mt-2 self-center opacity-90"/>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {filmeSelecionado && (
        <MovieDetails 
            data={filmeSelecionado} 
            onClose={fecharDetalhes} 
        />
      )}

    </div>
  )
}