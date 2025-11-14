import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';
import axiosAuth from '../axios/axiosAuth'; // axios cu token

// Funcție pentru a șterge cart-ul din backend
const clearCartBackend = async () => {
  try {
    const response = await axiosAuth.delete('/cart'); // ruta DELETE /cart
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error clearing cart');
  }
};

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.cart);

  // Fetch cart la mount
  useEffect(() => {
    dispatch(fetchCart())
      .unwrap()
      .catch(err => toast.error(err?.message || 'Failed to load cart'));
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!items || items.length === 0)
    return (
      <div className="h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );

  // Total price doar pentru itemele valide
  const totalPrice = items.reduce((acc, item) => {
    if (!item.Product) return acc;
    return acc + item.quantity * item.Product.price;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={item.Product?.image || 'https://via.placeholder.com/100'}
                  alt={item.Product?.name || 'Product'}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.Product?.name || 'N/A'}</h2>
                  <p>${item.Product?.price || 0} x {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold">
                ${(item.Product ? (item.Product.price * item.quantity).toFixed(2) : '0.00')}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={async () => {
              try {
                await clearCartBackend(); // șterge din DB
                dispatch(clearCart());    // șterge din Redux
                toast.success('Cart cleared!');
              } catch (err) {
                toast.error(err.message);
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
