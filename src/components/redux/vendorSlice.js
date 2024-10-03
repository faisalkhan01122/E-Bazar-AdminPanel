
// src/slices/vendorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiUrl from '../../ApiUrl';

const API_URL = `${ApiUrl}vendors/`;

// Thunk for creating a vendor
export const createVendor = createAsyncThunk(
  'vendors/createVendor',
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, vendorData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
     
      });
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for registering a vendor
export const registerVendor = createAsyncThunk(
  'vendors/registerVendor',
  async (vendorData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in vendorData) {
        formData.append(key, vendorData[key]);
      }

      const response = await axios.post(`${API_URL}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for fetching vendors, products, and orders
export const fetchVendors = createAsyncThunk(
  'vendors/fetchVendors',
  async (token, { rejectWithValue }) => {
    try {
      // Fetch vendors
      const vendorsResponse = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const vendorsData = vendorsResponse.data.doc;

      // Fetch products count for each vendor
      const vendorsWithProducts = await Promise.all(
        vendorsData.map(async (vendor) => {
          try {
            const productsResponse = await axios.get(
              `https://lionfish-app-tdhk5.ondigitalocean.app/api/products/?userId=${vendor._id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const totalProducts = productsResponse.data.doc.length;
            return { ...vendor, totalProducts };
          } catch (error) {
            console.error('Error fetching products:', error);
            return { ...vendor, totalProducts: 0 };
          }
        })
      );

      // Fetch orders for each vendor and update totalOrders
      const vendorsWithOrdersAndProducts = await Promise.all(
        vendorsWithProducts.map(async (vendor) => {
          try {
            const ordersResponse = await axios.get(
              `https://lionfish-app-tdhk5.ondigitalocean.app/api/orders/?vendorId=${vendor._id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const totalOrders = ordersResponse.data.docs.length;
            return { ...vendor, totalOrders };
          } catch (error) {
            console.error('Error fetching orders:', error);
            return { ...vendor, totalOrders: 0 };
          }
        })
      );

      return vendorsWithOrdersAndProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for updating vendor status
export const updateVendorStatus = createAsyncThunk(
  'vendors/updateVendorStatus',
  async ({ vendorId, status, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://lionfish-app-tdhk5.ondigitalocean.app/api/vendors/${vendorId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for deleting a vendor
export const deleteVendor = createAsyncThunk(
  'vendors/deleteVendor',
  async ({ vendorId, token }, { rejectWithValue }) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this vendor!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3000/api/vendors/${vendorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          Swal.fire('Deleted!', 'Vendor has been deleted.', 'success');
          return vendorId; // Return the vendor ID for deletion
        } else {
          Swal.fire('Failed!', 'Failed to delete vendor.', 'error');
          throw new Error('Failed to delete vendor.');
        }
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    vendors: [], // Ensure this matches what you're trying to access

    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors.push(action.payload);
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors.push(action.payload);
      })
      .addCase(registerVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVendorStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVendorStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedVendor = action.payload;
        state.vendors = state.vendors.map(vendor =>
          vendor._id === updatedVendor._id ? updatedVendor : vendor
        );
      })
      .addCase(updateVendorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.loading = false;
        const deletedVendorId = action.payload;
        state.vendors = state.vendors.filter(vendor => vendor._id !== deletedVendorId);
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = vendorSlice.actions;
export default vendorSlice.reducer;
