import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchProducts, deleteProduct } from '../api/product.routes';
import { addFavorite } from '../api/favorite.routes';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', sortPrice: '' });
  const [deletingId, setDeletingId] = useState(null);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await fetchProducts(filters);
      if (data && Array.isArray(data)) setProducts(data);
      else setError('Failed to load products');
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [filters]);

  const handleEditClick = (productId) => navigate(`/products/edit/${productId}`);

  const handleDeleteClick = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      setDeletingId(productId);
      const response = await deleteProduct(productId);
      if (response?.success) {
        setProducts(products.filter((p) => p.id !== productId));
        toast.success('Product deleted successfully');
      } else {
        toast.error(response?.message || 'Failed to delete product');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred while deleting the product');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateClick = () => navigate('/products/create');

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFavoriteClick = async (productId, e) => {
  e.stopPropagation(); // evită navigarea la detalii
  try {
    const response = await addFavorite(productId);
    if (response.success) {
      toast.success('Product added to favorites!');
    } else {
      toast.error(response.message || 'Failed to add to favorites');
    }
  } catch (err) {
    toast.error(err.message || 'Error adding to favorites');
  }
};

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">No products available</p>
        {isAdmin && (
          <button
            onClick={handleCreateClick}
            className="mt-6 inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow-lg transition"
          >
            Create Product
          </button>
        )}
      </div>
    );

  return (
    <div className="h-screen bg-gradient-to-br from-white to-indigo-50 py-16 px-6 lg:px-10 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Filter Form */}
        <div className="flex gap-4 mb-6">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="SF">SF</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Literary Fiction">Literature Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy Romance">Fantasy Romance</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="sortPrice"
            value={filters.sortPrice}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Title + Create button */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Books</h2>
          {isAdmin && (
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Add New
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="relative bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                <img
                  alt={product.name}
                  src={product.image || 'https://via.placeholder.com/300'}
                  className="w-full h-auto object-contain"
                />

                {/* Admin actions */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(product.id);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow"
                      title="Edit"
                    >
                      ✏️
                    </button>

                    <button
                      disabled={deletingId === product.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(product.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow disabled:opacity-40"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>

              {/* Details + Buy & Favorite */}
              <div className="mt-4 flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="mt-1 text-xl font-bold text-indigo-600">${product.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                    }}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                  >
                    Buy
                  </button>

                  <button
                    className="flex-1 bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600"
                    onClick={(e) => handleFavoriteClick(product.id, e)}
                  >
                    Favorite
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
