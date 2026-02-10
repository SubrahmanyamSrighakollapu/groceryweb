import api from './api';

const productService = {
  // Get all product categories
  getAllProductCategories: async () => {
    try {
      const payload = {
        categoryId: 0,
        parentId: 0,
        isActive: true
      };
      const response = await api.post('/products/getAllProductCategories', payload);
      console.log('Service response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching product categories:', error);
      throw error;
    }
  },

  // Create or update product category
  manageProductCategory: async (categoryData) => {
    try {
      const response = await api.post('/products/manageProductCategory', categoryData);
      return response;
    } catch (error) {
      console.error('Error managing product category:', error);
      throw error;
    }
  },

  // Delete product category
  deleteProductCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/products/deleteProductCategory/${categoryId}`);
      return response;
    } catch (error) {
      console.error('Error deleting product category:', error);
      throw error;
    }
  },

  // Get all products
  getProducts: async () => {
    try {
      const response = await api.get('/products/getProducts');
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Add product
  onboardProduct: async (formData) => {
    try {
      const response = await api.post('/products/onboardProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productData) => {
    try {
      const response = await api.post('/products/updateProduct', productData);
      return response;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Approve or Reject product
  approveRejectProduct: async (productId, statusId) => {
    try {
      const response = await api.post('/products/approveRejectProduct', {
        productId,
        statusId
      });
      return response;
    } catch (error) {
      console.error('Error approving/rejecting product:', error);
      throw error;
    }
  }
};

export default productService;