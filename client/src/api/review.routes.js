import { axiosNoAuth } from "../axios/axiosNoAuth";
import axiosAuth from "../axios/axiosAuth"; // Presupunând că ai un axios pentru rute cu token

// Ia recenziile
export const fetchReviewsByProduct = async (productId) => {
  try {
    const res = await axiosNoAuth.get(`/reviews/product/${productId}`);
    return res.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Adaugă recenzie (necesită login)
export const postReview = async (reviewData) => {
  try {
    // Dacă nu ai axiosAuth, folosim axiosNoAuth dar adăugăm manual header-ul
    const token = localStorage.getItem('token');
    const res = await axiosNoAuth.post('/reviews', reviewData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};