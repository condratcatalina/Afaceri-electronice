import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';
import axiosAuth from '../axios/axiosAuth';

// Funcție pentru ștergerea întregului coș
const clearCartBackend = async () => {
  try {
    await axiosAuth.delete('/cart');
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error clearing cart');
  }
};

// NOU: Funcție pentru ștergerea unui singur produs din backend
const removeItemBackend = async (productId) => {
  try {
    await axiosAuth.delete(`/cart/${productId}`);
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error removing item');
  }
};

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart())
      .unwrap()
      .catch(err => toast.error(err?.message || 'Failed to load cart'));
  }, [dispatch]);

  // NOU: Handler pentru ștergerea individuală a unui produs
  const handleRemoveItem = async (productId) => {
    try {
      await removeItemBackend(productId);
      dispatch(fetchCart()); // Reîncărcăm coșul pentru a actualiza state-ul global și reducerile
      toast.success('Produsul a fost eliminat din coș');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // --- LOGICA DE CALCUL DISCOUNT RITUAL ---
  const calculateRitualDiscount = () => {
    let totalDiscount = 0;
    const bundles = {};

    // 1. Grupăm produsele după primul tag
    items.forEach(item => {
      const product = item.Product;
      if (!product || !product.tags) return;

      const primaryTag = product.tags.split(',')[0].trim();
      if (!bundles[primaryTag]) {
        bundles[primaryTag] = { book: false, extras: [] };
      }

      if (['Candles', 'Tea', 'Wine'].includes(product.category)) {
        bundles[primaryTag].extras.push({
          price: product.price,
          quantity: item.quantity
        });
      } else {
        bundles[primaryTag].book = true;
      }
    });

    // 2. Calculăm 10% doar pentru seturile care au o CARTE + (LUMÂNARE/CEAI/VIN)
    Object.values(bundles).forEach(bundle => {
      if (bundle.book && bundle.extras.length > 0) {
        bundle.extras.forEach(extra => {
          totalDiscount += (extra.price * extra.quantity) * 0.10;
        });
      }
    });

    return totalDiscount;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!items || items.length === 0) return (
    <div className="h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
      <p className="text-stone-500 text-lg italic font-serif">Coșul tău este gol...</p>
    </div>
  );

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.Product ? item.quantity * item.Product.price : 0);
  }, 0);

  const discount = calculateRitualDiscount();
  const finalTotal = subtotal - discount;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-stone-100">
        <h1 className="text-4xl font-serif italic mb-10 text-stone-900 border-b pb-4">Coșul tău</h1>

        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl transition-all hover:shadow-md">
              <div className="flex items-center space-x-6">
                <img
                  src={item.Product?.image}
                  alt={item.Product?.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-sm"
                />
                <div>
                  <h2 className="font-serif text-xl text-stone-800">{item.Product?.name}</h2>
                  <p className="text-stone-500 font-light italic">{item.Product?.category}</p>
                  <p className="text-[#C5A059] font-bold mt-1">
                    {item.Product?.price} RON{' '}
                    <span className="text-stone-400 text-sm font-normal">x {item.quantity}</span>
                  </p>
                </div>
              </div>
              
              {/* Modificat zona de preț pentru a include și butonul de ștergere individuală */}
              <div className="flex items-center space-x-6">
                <p className="font-serif text-xl text-stone-900">
                  {(item.Product?.price * item.quantity).toFixed(2)} RON
                </p>
                <button
                  onClick={() => handleRemoveItem(item.Product?.id)}
                  className="text-stone-300 hover:text-red-500 transition-colors text-lg p-2"
                  title="Elimină produsul"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SECȚIUNE SUMAR CALCUL */}
        <div className="mt-12 border-t pt-8 space-y-3">
          <div className="flex justify-between text-stone-500">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} RON</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-[#C5A059] font-bold animate-pulse">
              <span>Reducere Ritual Senzorial (-10%):</span>
              <span>-{discount.toFixed(2)} RON</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <p className="text-3xl font-serif text-stone-900">Total: {finalTotal.toFixed(2)} RON</p>
            <div className="flex gap-4">
               <button
                onClick={async () => {
                  try {
                    await clearCartBackend();
                    dispatch(clearCart());
                    toast.success('Coșul a fost golit');
                  } catch (err) {
                    toast.error(err.message);
                  }
                }}
                className="text-stone-400 hover:text-red-500 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                Golește Coșul
              </button>
              <button className="bg-[#C5A059] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#8B5E3C] shadow-lg transition-all">
                Spre Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}