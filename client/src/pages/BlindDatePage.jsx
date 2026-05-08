import React from 'react';

const BlindDatePage = () => {
  const mysteryProducts = [
    {
      id: "bd-1",
      title: "The Star-Crossed Lovers",
      description: "O poveste despre iubiri care transcend timpul. Te poți aștepta la scrisori nespuse, ploaie și un vibe victorian melancolic.",
      tags: ["Romance", "Vintage", "Emotional"],
      price: "59 RON",
      image: "/blind-date-book.jpg"
    },
    {
      id: "bd-2",
      title: "The Haunted Library",
      description: "Pentru cei care caută umbrele. Secrete de familie îngropate adânc și biblioteci pline de mister la miezul nopții.",
      tags: ["Mystery", "Gothic", "Thriller"],
      price: "59 RON",
      image: "/blind-date-book.jpg"
    },
    {
      id: "bd-3",
      title: "The Golden Age Scholar",
      description: "O călătorie în mintea marilor gânditori. Filozofie, cafenele europene și parfum de pagini îngălbenite.",
      tags: ["History", "Philosophy", "Classic"],
      price: "65 RON",
      image: "/blind-date-book.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf8] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header-ul paginii */}
        <div className="mb-20 space-y-6">
          <h1 className="text-6xl font-serif italic text-stone-800">Întâlnire pe nevăzute</h1>
          <p className="text-stone-500 font-light max-w-2xl mx-auto text-lg italic">
            "Nu poți judeca o carte după copertă, dar o poți alege după suflet. Lasă-te surprins de o poveste selectată special pentru tine."
          </p>
          <div className="h-px w-32 bg-[#C5A059] mx-auto"></div>
        </div>

        {/* Grid-ul de produse */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {mysteryProducts.map((book) => (
            <div key={book.id} className="group flex flex-col items-center">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-xl mb-6">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 border-[15px] border-white/10 group-hover:border-white/0 transition-all duration-500"></div>
              </div>
              
              <h2 className="text-2xl font-serif text-stone-800 mb-2">{book.title}</h2>
              <p className="text-sm text-stone-500 font-light mb-4 px-4 line-clamp-3 italic">
                {book.description}
              </p>
              
              <div className="flex gap-2 mb-6">
                {book.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                    #{tag}
                  </span>
                ))}
              </div>

              <button className="border border-stone-800 text-stone-800 px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-stone-800 hover:text-white transition-all duration-500">
                Alege Destinul — {book.price}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlindDatePage;