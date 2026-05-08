import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogPage() {
  useEffect(() => {
    document.title = "L'Éternel | File de Jurnal";
  }, []);

  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      slug: "arta-de-a-citi-sanctuar", // Am adăugat slug
      category: "Ritualuri",
      title: "Arta de a citi: Cum să-ți creezi un sanctuar acasă",
      excerpt: "Lectura nu este doar despre cuvinte, ci despre spațiul dintre ele. Descoperă cum lumina și aroma ceaiului pot schimba totul...",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000",
      date: "12 Mai 2026"
    },
    {
      id: 2,
      slug: "elizabeth-bennet-feminism", // Am adăugat slug
      category: "Cronici",
      title: "Elizabeth Bennet și feminismul subtil al lui Jane Austen",
      excerpt: "O analiză a celui mai iubit personaj feminin și motivul pentru care mândria rămâne o lecție actuală în secolul XXI...",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
      date: "05 Mai 2026"
    },
    {
      id: 3,
      slug: "dark-academia-spirit", // Am adăugat slug
      category: "Estetică",
      title: "Dark Academia: Mai mult decât o modă, o stare de spirit",
      excerpt: "De la biblioteci uitate la scrisori scrise de mână. De ce ne întoarcem la estetica melancoliei intelectuale?",
      image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1000",
      date: "28 Aprilie 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Blog */}
        <div className="text-center mb-20 space-y-4">
          <h3 className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold">File de Jurnal</h3>
          <h1 className="text-5xl font-serif italic text-stone-900">Cronici și Gânduri</h1>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto opacity-40"></div>
        </div>

        {/* Articol Principal (Featured) - ACTIVAT CLICK */}
        <div 
          onClick={() => navigate(`/journal/arta-de-a-citi-sanctuar`)} 
          className="group relative mb-20 overflow-hidden rounded-3xl cursor-pointer shadow-2xl"
        >
          <div className="aspect-[21/9] w-full">
            <img 
              src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1200" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:scale-105 transition-transform duration-1000"
              alt="Featured"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-4">Articolul Lunii</span>
            <h2 className="text-4xl font-serif italic max-w-2xl mb-4">Poezia obiectelor uitate: De ce colecționăm ediții vechi?</h2>
            <p className="max-w-xl font-light text-stone-300 italic">"Fiecare patină de timp pe o copertă de piele spune o poveste pe care autorul nu a scris-o niciodată..."</p>
          </div>
        </div>

        {/* Grid Articole secundare - ACTIVAT CLICK PE FIECARE ARTICOL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((art) => (
            <div 
              key={art.id} 
              onClick={() => navigate(`/journal/${art.slug}`)} 
              className="group space-y-6 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden rounded-2xl shadow-sm">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-[#C5A059]">
                  <span>{art.category}</span>
                  <span className="text-stone-400">{art.date}</span>
                </div>
                <h3 className="text-2xl font-serif text-stone-800 leading-snug group-hover:text-[#C5A059] transition-colors">
                  {art.title}
                </h3>
                <p className="text-stone-500 font-light text-sm line-clamp-3 italic leading-relaxed">
                  {art.excerpt}
                </p>
                <button className="pt-4 text-xs uppercase tracking-[0.2em] font-bold text-stone-900 border-b border-stone-200 pb-1 group-hover:border-[#C5A059]">
                  Citește mai mult
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Box */}
        <div className="mt-32 bg-white p-16 rounded-3xl text-center border border-stone-100 shadow-sm">
          <h4 className="text-3xl font-serif italic text-stone-800 mb-4">Primește scrisorile noastre</h4>
          <p className="text-stone-500 font-light mb-8 italic">Abonează-te pentru a primi noutăți literare și invitații la ceai direct în inbox.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Adresa ta de email" 
              className="flex-1 bg-stone-50 border border-stone-200 px-6 py-3 rounded-full outline-none focus:border-[#C5A059] transition-colors italic font-light"
            />
            <button className="bg-[#C5A059] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#8B5E3C] transition-all">
              Înscrie-te
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}