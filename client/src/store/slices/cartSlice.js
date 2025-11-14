// client/src/store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAuth from '../../axios/axiosAuth';

// Async thunk pentru adăugarea unui produs în cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post('/cart', { product_id, quantity });
      return response.data.data; // backend returnează { success, message, data }
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk pentru încărcarea cart-ului
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.get('/cart');
      return response.data.data; // lista de produse din cart
    } catch (error) {
      console.error('Fetch cart error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Verificăm dacă produsul există deja în cart
        const index = state.items.findIndex(
          (item) => item.product_id === action.payload.product_id
        );
        if (index >= 0) {
          state.items[index].quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || 'Failed to add to cart';
      })

      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || 'Failed to fetch cart';
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
