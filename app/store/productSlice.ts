import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  farmer?: { email: string };
}

interface ProductState {
  products: Product[];
  myProducts: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  myProducts: [],
  loading: false,
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${baseURL}/api/products`);
    return response.json();
  }
);

export const fetchMyProducts = createAsyncThunk(
  'products/fetchMyProducts',
  async () => {
    const response = await fetch(`${baseURL}/api/products/my-products`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData: { name: string; price: number; quantity: number }) => {
    const response = await fetch(`${baseURL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string) => {
    await fetch(`${baseURL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return productId;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.myProducts = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.myProducts.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.myProducts = state.myProducts.filter(p => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;