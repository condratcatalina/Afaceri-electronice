import { Link } from "react-router-dom";
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    document.title = "L'Éternel | Acasă";
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#FDFBF7] flex flex-col items-center px-4">
      {/* Hero Section */}
      <div className="py-24 text-center space-y-8 max-w-4xl">
        <h3 className="text-[#C5A059] uppercase tracking-[0.3em] text-sm font-bold">Boutique de Literatură și Estetică</h3>
        <h1 className="text-6xl md:text-7xl font-serif italic text-stone-900 leading-tight">
          L'Éternel – O poveste <br/> doar pentru tine.
        </h1>
        <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
          Explorează ritualul lecturii într-o experiență senzorială unică. 
          De la clasicii eterni la poezia inimii.
        </p>
        <Link to="/products" className="inline-block bg-[#C5A059] text-white px-12 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[#8B5E3C] transition-all transform hover:scale-105 shadow-xl shadow-stone-200">
          Explorează Boutique
        </Link>
      </div>

      {/* Recommended Section */}
      <div className="w-full max-w-6xl pb-20">
        <div className="bg-white/60 border border-stone-100 rounded-3xl p-12 text-center shadow-sm">
          <h2 className="text-3xl font-serif italic mb-10 text-stone-800">Recomandările Curatorului</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Pride and Prejudice", "Ugly love", "The Great Gatsby"].map((book, i) => (
              <div key={i} className="group p-8 bg-[#FDFBF7] border border-stone-50 rounded-xl hover:shadow-lg transition-all cursor-pointer">
                <p className="font-serif text-xl italic text-stone-800 group-hover:text-[#C5A059]">"{book}"</p>
                <div className="w-8 h-[1px] bg-[#C5A059] mx-auto my-4 opacity-50"></div>
                <p className="text-xs uppercase tracking-widest text-stone-400">Ediție de Colecție</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center italic text-stone-400 font-serif text-lg">
          "O cameră fără cărți este ca un corp fără suflet." – <span className="text-[#C5A059]">Cicero</span>
        </div>
      </div>
    </div>
  );
}