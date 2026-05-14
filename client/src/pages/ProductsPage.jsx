import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// IMPORTUL CORECTAT MAI JOS:
import LoadingSpinner from '../components/LoadingSpinner'; 
import { fetchProducts } from '../api/product.routes';
import { addFavorite } from '../api/favorite.routes';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', sortPrice: '' });
  const navigate = useNavigate();

  // Categoriile care definesc "Cărțile" din baza ta de date
  const bookCategories = [
    'Fiction', 'SF', 'Historical Fiction', 'Literary Fiction', 
    'Non-fiction', 'Thriller', 'Romance', 'Fantasy Romance'
  ];

  useEffect(() => {
    document.title = "L'Éternel | Raftul cu Povești";
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts(filters);
        
        if (data) {
          // Filtrăm rezultatele pentru a afișa DOAR cărțile pe acest raft
          const onlyBooks = data.filter(product => 
            bookCategories.includes(product.category)
          );
          setProducts(onlyBooks);
        }
      } catch (err) {
        console.error("Eroare la încărcarea cărților:", err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [filters]);

  const handleFavoriteClick = async (productId, e) => {
    e.stopPropagation();
    try {
      const response = await addFavorite(productId);
      if (response.success) {
        toast.success('Adăugat la favorite!');
      } else {
        toast.error(response.message || 'Eroare la adăugare');
      }
    } catch (err) {
      toast.error('Trebuie să fii logat pentru a salva favorite.');
    }
  };

  // Acum LoadingSpinner va funcționa corect
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif italic text-stone-900 mb-4">Raftul cu Povești</h2>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto opacity-30"></div>
          <p className="mt-4 text-stone-500 italic">Doar pagini pline de emoție și magie.</p>
        </div>

        {/* Filtre */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <select 
            name="category" 
            onChange={(e) => setFilters({...filters, category: e.target.value})} 
            className="bg-transparent border-b border-stone-300 py-2 outline-none text-stone-600 uppercase tracking-widest text-xs font-bold"
          >
            <option value="">Toate Genurile</option>
            <option value="Fiction">Eternii Clasici</option>
            <option value="Romance">Iubiri de Azi</option>
            <option value="Fantasy Romance">Poezia Inimii (Fantasy)</option>
            <option value="Thriller">Mistere & Suspans</option>
          </select>

          <select 
            name="sortPrice" 
            onChange={(e) => setFilters({...filters, sortPrice: e.target.value})} 
            className="bg-transparent border-b border-stone-300 py-2 outline-none text-stone-600 uppercase tracking-widest text-xs font-bold"
          >
            <option value="">Sortează Preț</option>
            <option value="asc">Preț crescător</option>
            <option value="desc">Preț descrescător</option>
          </select>
        </div>

        {/* Grid Produse */}
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img 
                    alt={product.name} 
                    src={product.image || 'https://via.placeholder.com/300'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  <button 
                    onClick={(e) => handleFavoriteClick(product.id, e)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110"
                  >
                    ♥
                  </button>
                </div>
                <div className="mt-6 text-center space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">{product.category}</p>
                  <h3 className="text-xl font-serif text-stone-800">{product.name}</h3>
                  <p className="text-lg font-light text-stone-500">{product.price} RON</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-stone-400 italic">
              Raftul este momentan liber...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}