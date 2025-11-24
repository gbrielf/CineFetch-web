import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

function SearchBar({ onResultados }) { 
  const [termo, setTermo] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePesquisa = async (evento) => {
    evento.preventDefault();
    if (!termo.trim()) return;

    setLoading(true);
    try {
      // 1. URL CORRIGIDA: Voltamos para /filmes/{termo} que funciona
      const response = await fetch(`http://127.0.0.1:8000/filmes/${encodeURIComponent(termo)}?country=BR`);
      
      if (!response.ok) throw new Error('Filme não encontrado');
      
      const data = await response.json();
      
      // Validação se veio um filme real
      if (!data || (!data.titulo && !data.title)) {
          throw new Error('Dados inválidos');
      }

      // A API retorna UM objeto, mas a Home espera uma LISTA.
      const filmeFormatado = {
          ...data,
          imdbID: data.imdbID || data.id // Garante que o ID esteja acessível
      };

      onResultados([filmeFormatado]); 

    } catch (err) {
      console.error(err);
      // Feedback visual simples sem travar a tela
      alert(`Não encontramos o filme "${termo}". Tente o título original em inglês?`);
    } finally {
      setLoading(false);
      setTermo('');
    }
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center relative z-50">
        <form className='w-full relative' onSubmit={handlePesquisa}>
            <input 
                type="text" 
                className='w-full bg-slate-800/90 text-white placeholder-slate-400 px-6 py-4 pr-12 rounded-full border border-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none transition-all shadow-lg backdrop-blur-sm' 
                placeholder="Digite o nome do filme..." 
                value={termo} 
                onChange={(e)=> setTermo(e.target.value)} 
            />
            
            <button type='submit' className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors'>
                {loading ? <Loader2 className="animate-spin" /> : <Search />}
            </button>
        </form>
    </div>
  );
}


export default SearchBar;
