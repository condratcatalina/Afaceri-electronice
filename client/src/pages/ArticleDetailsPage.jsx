import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const articles = [
  {
    slug: "arta-de-a-citi-sanctuar",
    category: "Ritualuri",
    title: "Arta de a citi: Cum să-ți creezi un sanctuar acasă",
    content: "Lectura nu este doar despre cuvinte, ci despre spațiul dintre ele. Pentru a crea un sanctuar de lectură, ai nevoie de un echilibru între confort și inspirație. Alege un colț unde lumina naturală mângâie paginile cărții, adaugă o pătură moale de lână și nu uita de aroma unui ceai fierbinte. În boutique-ul L'Éternel, credem că acest ritual este o formă de terapie pentru suflet.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000",
    author: "Evelina Thorne",
    date: "12 Mai 2026"
  },
  {
    slug: "elizabeth-bennet-feminism",
    category: "Cronici",
    title: "Elizabeth Bennet și feminismul subtil al lui Jane Austen",
    content: "Elizabeth Bennet rămâne una dintre cele mai puternice figuri feminine din literatura universală. Într-o epocă în care destinul unei femei era dictat de căsătorie, Elizabeth a îndrăznit să ceară respect și egalitate intelectuală. Analizăm astăzi cum mândria ei nu a fost un defect, ci un scut care a protejat integritatea unei inimi ce refuza să fie vândută.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
    author: "Curator L'Éternel",
    date: "05 Mai 2026"
  },
  {
    slug: "dark-academia-spirit",
    category: "Estetică",
    title: "Dark Academia: Mai mult decât o modă, o stare de spirit",
    content: "Dark Academia nu este doar despre sacouri de tweed și biblioteci prăfuite. Este o celebrare a setei de cunoaștere, a scrisului de mână și a melancoliei creative. Este întoarcerea la valori clasice într-o lume digitală rapidă. Descoperă cum poți adopta această estetică în viața de zi cu zi prin mici detalii: de la jurnale legate în piele la studiul filosofiei la lumina lumânării.",
    image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1000",
    author: "Julian Blackwood",
    date: "28 Aprilie 2026"
  }
];

export default function ArticleDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `L'Éternel | ${article.title}`;
    }
  }, [article]);

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">Articolul nu a fost găsit.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/journal')} className="mb-8 text-[#C5A059] text-xs uppercase tracking-widest font-bold hover:text-[#8B5E3C] transition-colors">
          ← Înapoi la Jurnal
        </button>

        <div className="space-y-6 mb-12">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-widest">{article.category}</span>
          <h1 className="text-5xl font-serif italic text-stone-900 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-stone-400 italic text-sm">
            <span>{article.date}</span>
            <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
            <span>de {article.author}</span>
          </div>
        </div>

        <img src={article.image} alt={article.title} className="w-full h-[500px] object-cover rounded-3xl shadow-2xl mb-12" />

        <div className="text-stone-700 leading-relaxed text-xl font-light space-y-8 first-letter:text-6xl first-letter:font-serif first-letter:text-[#C5A059] first-letter:mr-3 first-letter:float-left">
          <p>{article.content}</p>
        </div>

        <div className="border-t border-stone-200 pt-10 mt-20 text-center">
          <p className="font-serif italic text-stone-400">Îți mulțumim că ai citit o filă din jurnalul nostru.</p>
        </div>
      </article>
    </div>
  );
}