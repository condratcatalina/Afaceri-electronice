import { useEffect, useState } from 'react';
import { fetchFavorites, removeFavorite } from '../api/favorite.routes';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const { data } = await fetchFavorites();
      setFavorites(data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter(f => f.id !== id));
      toast.success('Removed from favorites');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleBuy = async (item) => {
    try {
      await dispatch(addToCart({ productId: item.product_id, quantity: 1 })).unwrap();
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!favorites || favorites.length === 0)
    return (
      <div className="h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">No favorite items yet</p>
      </div>
    );


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

        <div className="space-y-4">
          {favorites.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={item.Product?.image || 'https://via.placeholder.com/100'}
                  alt={item.Product?.name || 'Product'}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.Product?.name || 'N/A'}</h2>
                  <p>${item.Product?.price || 0}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleBuy(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  ♥ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
