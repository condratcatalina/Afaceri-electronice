import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProductById } from '../api/product.routes';
import { fetchReviewsByProduct, postReview } from '../api/review.routes';
import { addFavorite } from '../api/favorite.routes'; // Importul rutei de favorite
import { addToCart } from '../store/slices/cartSlice';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (product) {
      document.title = `L'Éternel | ${product.name}`;
    }
  }, [product]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const pRes = await fetchProductById(id);
        if (pRes?.data) setProduct(pRes.data);
        const rRes = await fetchReviewsByProduct(id);
        if (rRes.success) setReviews(rRes.data);
      } catch (err) {
        toast.error('Eroare la încărcare.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const handleFavoriteClick = async () => {
    try {
      const response = await addFavorite(id);
      if (response.success) {
        toast.success('Poveste salvată în favorite!');
      }
    } catch (err) {
      toast.error('Eroare la salvarea în favorite.');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return toast.error("Trebuie să fii logat pentru a trimite o scrisoare!");

    setSubmittingReview(true);
    try {
      const res = await postReview({ ...newReview, productId: id });
      if (res.success) {
        toast.success("Scrisoarea a fost trimisă!");
        setNewReview({ rating: 5, comment: "" });
        const updated = await fetchReviewsByProduct(id);
        setReviews(updated.data);
      }
    } catch (err) {
      toast.error("Eroare neașteptată.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* CARD PRODUS */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-stone-100">
          <div className="md:w-1/2">
            <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em]">{product?.category}</span>
            <h2 className="text-5xl font-serif italic text-stone-900 mt-2 leading-tight">{product?.name}</h2>
            
            <div className="flex items-center mt-4 gap-2">
                <span className="text-[#C5A059] text-xl">♥</span>
                <span className="font-bold text-stone-700">{(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)} / 5</span>
            </div>

            <p className="text-3xl font-light text-stone-400 mt-6">{product?.price} RON</p>
            <p className="mt-8 text-stone-600 leading-relaxed italic font-light text-lg border-l-2 border-[#C5A059] pl-6">
              {product?.description}
            </p>

            {/* BUTOANE ACȚIUNE */}
            <div className="flex gap-4 mt-12">
              <button 
                onClick={() => dispatch(addToCart({ product_id: product.id, quantity: 1 }))} 
                className="flex-[3] bg-[#C5A059] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg hover:bg-[#8B5E3C] transition-all"
              >
                Adaugă în Coș
              </button>
              <button 
                onClick={handleFavoriteClick}
                className="flex-[1] border border-stone-200 text-[#C5A059] py-4 rounded-2xl text-xl hover:bg-stone-50 transition-all"
              >
                ♥
              </button>
            </div>
          </div>
        </div>

        {/* MULTIMEDIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="text-stone-800 font-serif italic text-xl mb-4">Muzică pentru citit</h4>
            <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Ueb9Cj9Sms" width="100%" height="152" frameBorder="0" allow="autoplay; encrypted-media"></iframe>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="text-stone-800 font-serif italic text-xl mb-4">Atmosfera L'Éternel</h4>
            <iframe width="100%" height="152" src="https://www.youtube.com/embed/S_N8V-u9ZpI" title="Atmosphere" frameBorder="0" allowFullScreen className="rounded-xl"></iframe>
          </div>
        </div>

        {/* LOVE LETTERS SECTION */}
        <div className="bg-white shadow-xl rounded-3xl p-12 border border-stone-100">
          <h3 className="text-3xl font-serif italic text-center mb-10 text-stone-800">Love Letters from our Readers</h3>
          
          <form onSubmit={handleReviewSubmit} className="max-w-xl mx-auto space-y-4 mb-16 text-center">
            <div className="flex items-center justify-center gap-4">
              <label className="text-sm font-semibold text-stone-600 italic">Aura cărții:</label>
              <select value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: e.target.value})} className="bg-white border border-stone-200 rounded-lg px-4 py-2 text-[#C5A059] font-bold">
                <option value="5">5 Inimi ♥♥♥♥♥</option>
                <option value="4">4 Inimi ♥♥♥♥</option>
                <option value="3">3 Inimi ♥♥♥</option>
                <option value="2">2 Inimi ♥♥</option>
                <option value="1">1 Inimă ♥</option>
              </select>
            </div>
            <textarea className="w-full p-4 rounded-xl border border-stone-100 outline-none bg-stone-50 italic font-light" placeholder="Scrie o notă de mulțumire..." value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} required />
            <button type="submit" disabled={submittingReview} className="text-[#C5A059] uppercase tracking-widest text-xs font-bold hover:text-[#8B5E3C]">
              {submittingReview ? 'Se trimite...' : 'Trimite Scrisoarea'}
            </button>
          </form>

          <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
            {reviews.map((rev) => (
              <div key={rev.id} className="border-l border-stone-100 pl-8 italic font-light text-stone-600 leading-relaxed">
                <p className="mb-4">"{rev.comment}"</p>
                <div className="flex justify-between items-center text-sm font-bold text-stone-900">
                  <span>{rev.User?.name || 'Anonim'}</span>
                  <div className="text-[#C5A059]">{"♥".repeat(rev.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}