import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProductById } from '../api/product.routes';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await fetchProductById(id);
        if (res?.data) {
          setProduct(res.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleBuyClick = async () => {
    if (!product) return;
    try {
      await dispatch(addToCart({ product_id: product.id, quantity: 1 })).unwrap();
      toast.success(`"${product.name}" added to cart!`);
    } catch (err) {
      toast.error(err?.message || 'Failed to add product to cart');
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="h-screen bg-gradient-to-br from-white to-indigo-50 py-16 px-6 lg:px-10 overflow-y-auto flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6">
        <img
          src={product.image || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
        <p className="text-gray-500 mt-2">{product.category}</p>
        <p className="mt-4 text-xl font-bold text-indigo-600">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description || 'No description available.'}</p>

        <button
          onClick={handleBuyClick}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition"
        >
          Buy Now
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg shadow transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
