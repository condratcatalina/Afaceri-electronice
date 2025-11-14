import axiosAuth from "../axios/axiosAuth";

export const fetchFavorites = async () => {
  try {
    const response = await axiosAuth.get('/favorites');
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addFavorite = async (productId) => {
  try {
    const response = await axiosAuth.post('/favorites', { product_id: productId });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeFavorite = async (id) => {
  try {
    const response = await axiosAuth.delete(`/favorites/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
