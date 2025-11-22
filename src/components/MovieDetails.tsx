import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Tag } from 'lucide-react'; // Adicionei o ícone Tag para preço

const MovieDetails = ({ data, onClose }) => {
    const [list, setList] = useState([]);
    const { titulo, poster_url, ano, sinopse, diretor } = data;
    
    const imdbUrl = data._links?.avaliar_no_imdb?.href || '#';

    useEffect(() => {
        if (!data) return;

        console.log("Processando dados:", data);

        let services = [];

        
        // Prioridade: Estrutura 'streaming_disponivel'
        if (data.streaming_disponivel && Array.isArray(data.streaming_disponivel.services)) {
            services = data.streaming_disponivel.services.map((s) => ({
                service_name: s.service_name || 'Desconhecido',
                url: s.url,
                type: s.type,       // sub, buy, rent
                quality: s.quality, // 4K, HD
                price: s.price      // preço do serviço
            }));
        } 
        // Fallback: Estrutura 'services' raiz
        else if (data.services && Array.isArray(data.services)) {
            services = data.services.map((s) => ({
                service_name: s.service_name || s.name,
                url: s.url,
                type: s.type,
                quality: s.quality,
                price: s.price     
            }));
        }

        setList(services);
    }, [data]);

    const traduzirTipo = (type) => {
        if (type === 'sub') return 'Assinatura';
        if (type === 'buy') return 'Comprar';
        if (type === 'rent') return 'Alugar';
        return type;
    };

    
    const formatarPreco = (price) => {
        if (!price) return null;
        if (typeof price === 'number') {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
        }
        
        return price.toString().includes('$') ? price : `R$ ${price}`;
    };

    return (
        <div className="w-full max-w-5xl mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            
            <div className="bg-slate-900/90 text-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col md:flex-row">
                
               
                <div className="w-full md:w-1/3 relative min-h-[300px]">
                     <img 
                        src={poster_url} 
                        alt={titulo} 
                        className="w-full h-full object-cover" 
                     />
                </div>

                
                <div className="p-6 md:p-8 w-full md:w-2/3 flex flex-col gap-4">
                    
                    
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{titulo}</h2>
                            <div className="flex gap-3 text-sm text-slate-400">
                                <span className="bg-slate-800 px-2 py-0.5 rounded">{ano}</span>
                                <span>•</span>
                                <span>{diretor}</span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={onClose} 
                            className="text-slate-400 hover:text-red-500 hover:bg-slate-800 p-2 rounded-full transition-all"
                            title="Fechar"
                        >
                            <X size={28}/>
                        </button>
                    </div>

                    
                    <p className="text-slate-300 text-sm leading-relaxed border-l-4 border-red-600 pl-4 bg-slate-800/30 py-2 rounded-r">
                        {sinopse || "Sinopse indisponível."}
                    </p>

                    <a href={imdbUrl} target="_blank" rel="noreferrer" className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-2 w-fit font-medium">
                        Ver no IMDB <ExternalLink size={14}/>
                    </a>

                   
                    <div className="mt-4 pt-6 border-t border-slate-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            Onde Assistir
                        </h3>
                        
                        {list.length === 0 ? (
                            <div className="bg-slate-800/50 p-4 rounded border border-slate-700/50">
                                <p className="text-slate-400 italic text-sm text-center">
                                    Nenhuma plataforma de streaming encontrada para o Brasil neste momento.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {list.map((s, idx) => (
                                    <a 
                                        key={`${s.service_name}-${idx}`} 
                                        href={s.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-red-500/50 hover:bg-slate-750 flex justify-between items-center transition-all group"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-slate-100 group-hover:text-white">
                                                {s.service_name}
                                            </span>
                                            
                                           
                                            <div className="flex flex-wrap gap-2 items-center">
                                                {s.type && (
                                                    <span className="text-[10px] uppercase bg-blue-900/50 text-blue-200 px-1.5 py-0.5 rounded border border-blue-800">
                                                        {traduzirTipo(s.type)}
                                                    </span>
                                                )}
                                                {s.quality && (
                                                    <span className="text-[10px] font-bold bg-yellow-900/40 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-800/50">
                                                        {s.quality}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors"/>
                                            
                                            {s.price && (
                                                <div className="flex items-center gap-1 text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">
                                                    <Tag size={10} />
                                                    <span className="text-xs font-bold whitespace-nowrap">
                                                        {formatarPreco(s.price)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MovieDetails;