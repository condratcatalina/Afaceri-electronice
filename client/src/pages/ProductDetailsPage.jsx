import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProductById, fetchProducts } from '../api/product.routes'; 
import { fetchReviewsByProduct, postReview } from '../api/review.routes';
import { addFavorite } from '../api/favorite.routes'; 
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
  
  const [suggestedCandle, setSuggestedCandle] = useState(null);
  const [suggestedDrink, setSuggestedDrink] = useState(null);

  const defaultSpotify = "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Ueb9C7V6r7?utm_source=generator";

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const pRes = await fetchProductById(id);
        const productData = pRes?.data; 
        
        if (pRes?.success && productData) {
          setProduct(productData);
          document.title = `L'Éternel | ${productData.name}`;
          const rawTags = productData.tags;

          if (rawTags) {
            const allTags = rawTags.split(',').map(t => t.trim());
            let foundCandle = null;
            let foundDrink = null;

            for (const tag of allTags) {
              if (foundCandle && foundDrink) break;
              const searchRes = await fetchProducts({ tag: tag });
              if (searchRes?.success && searchRes?.data) {
                const results = searchRes.data;
                if (!foundCandle) {
                  foundCandle = results.find(item => item.category === 'Candles' && String(item.id) !== String(id));
                }
                if (!foundDrink) {
                  foundDrink = results.find(item => (item.category === 'Tea' || item.category === 'Wine') && String(item.id) !== String(id));
                }
              }
            }
            setSuggestedCandle(foundCandle);
            setSuggestedDrink(foundDrink);
          }
        }
        const rRes = await fetchReviewsByProduct(id);
        if (rRes.success) setReviews(rRes.data);
      } catch (err) {
        console.error("❌ Eroare:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  // Funcții pentru acțiuni individuale
  const handleAddToCartMain = () => {
    dispatch(addToCart({ product_id: product.id, quantity: 1 }));
    toast.success(`${product.name} a fost adăugat în coș!`);
  };

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

  // Funcție universală pentru adăugare pachete
  const handleAddBundle = (type) => {
    dispatch(addToCart({ product_id: product.id, quantity: 1 }));
    
    if (type === 'trio') {
      if (suggestedCandle) dispatch(addToCart({ product_id: suggestedCandle.id, quantity: 1 }));
      if (suggestedDrink) dispatch(addToCart({ product_id: suggestedDrink.id, quantity: 1 }));
      toast.success("Trio Ritual adăugat!", { description: "Ai primit 20% reducere la pachetul complet." });
    } else if (type === 'duo-candle') {
      dispatch(addToCart({ product_id: suggestedCandle.id, quantity: 1 }));
      toast.success("Duo adăugat!", { description: "Carte + Lumânare cu 10% reducere." });
    } else if (type === 'duo-drink') {
      dispatch(addToCart({ product_id: suggestedDrink.id, quantity: 1 }));
      toast.success("Duo adăugat!", { description: "Carte + Băutură cu 10% reducere." });
    }
  };

  if (loading) return <LoadingSpinner />;

  // Calcule Prețuri
  const priceBook = product?.price || 0;
  const priceCandle = suggestedCandle?.price || 0;
  const priceDrink = suggestedDrink?.price || 0;

  const duoCandlePrice = ((priceBook + priceCandle) * 0.9).toFixed(2);
  const duoDrinkPrice = ((priceBook + priceDrink) * 0.9).toFixed(2);
  const trioPrice = ((priceBook + priceCandle + priceDrink) * 0.8).toFixed(2);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Secțiunea Produs Principal (Carte) */}
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

              <div className="flex gap-4 mt-12">
                <button 
                  onClick={handleAddToCartMain} 
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

        {/* --- NOUA SECȚIUNE DE PACHETE RITUALE --- */}
        <div className="space-y-8">
          <h3 className="text-3xl font-serif italic text-center text-stone-800">Alege-ți Ritualul</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PACHET TRIO - 20% OFF (Modificat pentru evidențiere componente și pictograme) */}
            {(suggestedCandle && suggestedDrink) && (
              <div className="bg-[#fdf3e7] rounded-3xl p-8 border-2 border-[#C5A059] shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-4 right-4 bg-[#C5A059] text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Best Experience</div>
                
                <div>
                  <h4 className="text-[#8B5E3C] font-serif text-2xl mb-6">Pachet Trio Complet</h4>
                  
                  {/* Evidențierea clară a celor trei componente pentru justificarea prețului premium */}
                  <div className="grid grid-cols-3 gap-3 text-center mb-6 border-b border-[#C5A059]/20 pb-6">
                    <div className="flex flex-col items-center">
                      <img src={product.image} className="w-14 h-20 object-cover rounded shadow-md mb-2 transition-transform duration-300 hover:scale-105" />
                      <span className="text-[10px] font-bold text-stone-700 tracking-tight uppercase line-clamp-1">{product.name}</span>
                      <span className="text-[10px] text-stone-400 font-light">{priceBook} RON</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={suggestedCandle.image} className="w-14 h-14 object-cover rounded shadow-md mb-2 mt-6 transition-transform duration-300 hover:scale-105" />
                      <span className="text-[10px] font-bold text-stone-700 tracking-tight uppercase line-clamp-1">{suggestedCandle.name}</span>
                      <span className="text-[10px] text-stone-400 font-light">{priceCandle} RON</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={suggestedDrink.image} className="w-14 h-14 object-cover rounded shadow-md mb-2 mt-6 transition-transform duration-300 hover:scale-105" />
                      <span className="text-[10px] font-bold text-stone-700 tracking-tight uppercase line-clamp-1">{suggestedDrink.name}</span>
                      <span className="text-[10px] text-stone-400 font-light">{priceDrink} RON</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-stone-600 italic mb-6">Include: Cartea, Lumânarea și Băutura preferată.</p>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-stone-400 line-through text-sm">{(priceBook + priceCandle + priceDrink).toFixed(2)} RON</span>
                      <p className="text-3xl font-serif text-stone-900">{trioPrice} RON</p>
                    </div>
                    <button onClick={() => handleAddBundle('trio')} className="bg-[#8B5E3C] text-white px-6 py-3 rounded-xl font-bold uppercase text-xs hover:bg-[#C5A059] transition-all">
                      Adaugă Trio (20% OFF)
                    </button>
                  </div>

                  {/* Pictograme de încredere plasate sub buton */}
                  <div className="pt-4 border-t border-stone-200/60 grid grid-cols-3 gap-2 text-center text-stone-500 text-[10px] tracking-wide uppercase font-semibold">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base">🔒</span>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base">🚚</span>
                      <span>Livrare 24-48h</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base">🔞</span>
                      <span>Vârstă +18 Ani</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* PACHETE DUO - 10% OFF */}
            <div className="space-y-4">
              {suggestedCandle && (
                <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-md flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={suggestedCandle.image} className="w-12 h-12 object-cover rounded shadow" />
                    <div>
                      <h5 className="font-serif italic text-stone-800">Duo: Carte + Lumânare</h5>
                      <p className="text-lg font-serif text-[#C5A059]">{duoCandlePrice} RON</p>
                    </div>
                  </div>
                  <button onClick={() => handleAddBundle('duo-candle')} className="text-[#C5A059] border border-[#C5A059] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#C5A059] hover:text-white transition-all">
                    Adaugă Duo (10% OFF)
                  </button>
                </div>
              )}

              {suggestedDrink && (
                <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-md flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={suggestedDrink.image} className="w-12 h-12 object-cover rounded shadow" />
                    <div>
                      <h5 className="font-serif italic text-stone-800">Duo: Carte + {suggestedDrink.category}</h5>
                      <p className="text-lg font-serif text-[#C5A059]">{duoDrinkPrice} RON</p>
                    </div>
                  </div>
                  <button onClick={() => handleAddBundle('duo-drink')} className="text-[#C5A059] border border-[#C5A059] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#C5A059] hover:text-white transition-all">
                    Adaugă Duo (10% OFF)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secțiunea Muzică și Recenzii */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="text-stone-800 font-serif italic text-xl mb-4">Muzică pentru citit</h4>
            <iframe 
              style={{borderRadius:"12px"}} 
              src={product?.spotify_url || defaultSpotify} 
              width="100%" 
              height="152" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center">
            <h4 className="text-stone-800 font-serif italic text-xl mb-2">Impresiile Cititorilor</h4>
            <p className="text-stone-500 italic mb-4 text-sm px-4">
              {product?.review_url 
                ? "Am găsit o recenzie care surprinde perfect magia acestei cărți." 
                : "Descoperă cum a rezonat această poveste în inimile comunității L'Éternel."}
            </p>
            <a 
              href={product?.review_url || "#reader-reviews"} 
              target={product?.review_url ? "_blank" : "_self"}
              rel="noreferrer"
              className="bg-[#FDFBF7] text-[#C5A059] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs border border-stone-100 hover:bg-white transition-all shadow-sm"
            >
              {product?.review_url ? "Citește Recenzia Completă" : "Citește Scrisorile"}
            </a>
          </div>
        </div>

        {/* Secțiunea Reviews */}
        <div id="reader-reviews" className="bg-white shadow-xl rounded-3xl p-12 border border-stone-100">
          <h3 className="text-3xl font-serif italic text-center mb-10 text-stone-800">Love Letters from our Readers</h3>
          
          <form onSubmit={handleReviewSubmit} className="max-w-xl mx-auto space-y-4 mb-16 text-center">
            <div className="flex items-center justify-center gap-4">
              <label className="text-sm font-semibold text-stone-600 italic">Aura cărții:</label>
              <select value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})} className="bg-white border border-stone-200 rounded-lg px-4 py-2 text-[#C5A059] font-bold">
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