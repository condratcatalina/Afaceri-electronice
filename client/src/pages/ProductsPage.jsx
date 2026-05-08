import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchProducts } from '../api/product.routes';
import { addFavorite } from '../api/favorite.routes'; // Importul rutei de favorite

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', sortPrice: '' });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "L'Éternel | Boutique";
    const getProducts = async () => {
      setLoading(true);
      const { data } = await fetchProducts(filters);
      if (data) setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, [filters]);

  // Funcția pentru adăugare la favorite
  const handleFavoriteClick = async (productId, e) => {
    e.stopPropagation(); // Previne navigarea către pagina de detalii
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

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif italic text-stone-900 mb-4">Raftul cu Povești</h2>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto opacity-30"></div>
        </div>

        {/* Filtre */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <select name="category" onChange={(e) => setFilters({...filters, category: e.target.value})} className="bg-transparent border-b border-stone-300 py-2 outline-none text-stone-600 uppercase tracking-widest text-xs font-bold">
            <option value="">Toate Categoriile</option>
            <option value="Fiction">Eternii Clasici</option>
            <option value="Romance">Iubiri de Azi</option>
            <option value="Fantasy Romance">Poezia Inimii</option>
          </select>
          <select name="sortPrice" onChange={(e) => setFilters({...filters, sortPrice: e.target.value})} className="bg-transparent border-b border-stone-300 py-2 outline-none text-stone-600 uppercase tracking-widest text-xs font-bold">
            <option value="">Sortează Preț</option>
            <option value="asc">Preț crescător</option>
            <option value="desc">Preț descrescător</option>
          </select>
        </div>

        {/* Grid Produse */}
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img alt={product.name} src={product.image || 'https://via.placeholder.com/300'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* BUTON FAVORITE PE IMAGINE */}
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
          ))}
        </div>
      </div>
    </div>
  );
}