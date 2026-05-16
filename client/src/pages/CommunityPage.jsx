import React, { useEffect } from 'react';

export default function CommunityPage() {
  useEffect(() => {
    document.title = "L'Éternel | Comunitate";
  }, []);

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdU5WsHFHDtUItLWu11Be5IwiFn5_wzW2CVyvinKy8iAE7c1Q/viewform?embedded=true";

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-16">
        
        {/* HERO SECTION - COMUNITATE */}
        <div className="text-center space-y-4">
          <h3 className="text-[#C5A059] uppercase tracking-[0.3em] text-sm font-bold">Salonul L'Éternel</h3>
          <h1 className="text-5xl font-serif italic text-stone-900 leading-tight">
            Comunitatea Inimilor <br/> care Citesc
          </h1>
          <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Părerea ta este cerneala cu care scriem capitolul următor al acestei librării."
          </p>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-6 opacity-40"></div>
        </div>

        {/* SOCIAL MEDIA CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <h4 className="text-xl font-serif italic text-stone-800">Salonul de Lectură</h4>
            <p className="text-sm text-stone-500 font-light">
              Alătură-te grupului de Facebook pentru discuții despre "cartea lunii".
            </p>
            <a href="https://www.facebook.com/profile.php?id=61589756166318&locale=ro_RO" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#C5A059] hover:text-[#8B5E3C]">
              Intră în Grup →
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <h4 className="text-xl font-serif italic text-stone-800">Vitrina Estetică</h4>
            <p className="text-sm text-stone-500 font-light">
              Urmărește-ne pe Instagram pentru inspirație zilnică și unboxing-uri.
            </p>
            <a href="https://www.instagram.com/l_eternel2026" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#C5A059] hover:text-[#8B5E3C]">
              Urmărește-ne →
            </a>
          </div>
        </div>

        {/* GOOGLE FORMS EMBED */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-stone-100 p-2">
          <div className="bg-[#FDFBF7] p-8 text-center border-b border-stone-50">
            <h2 className="text-2xl font-serif italic text-stone-800">Ajută-ne să creștem</h2>
          </div>
          <div className="relative w-full bg-white" style={{ height: "700px" }}>
            <iframe src={googleFormUrl} width="100%" height="100%" frameBorder="0" title="Chestionar Satisfactie">
              Se încarcă...
            </iframe>
          </div>
        </div>

        <div className="text-center py-10">
          <p className="text-stone-400 font-serif italic">"Fiecare cititor este un prieten pe care încă nu l-am întâlnit."</p>
        </div>
      </div>
    </div>
  );
}