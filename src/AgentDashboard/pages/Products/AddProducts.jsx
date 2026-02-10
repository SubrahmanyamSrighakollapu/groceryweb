import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Edit, Trash2 } from 'lucide-react';
import productService from '../../../services/productService';
import lookupService from '../../../services/lookupService';

const AddProducts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    quantityId: '',
    price: '',
    discount: '',
    finalPrice: '',
    gst: '',
    categoryId: '',
    statusId: '',
    images: []
  });

  useEffect(() => {
    fetchProducts();
    fetchQuantities();
    fetchSubCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts();
      if (response && response.status === 1 && response.result) {
        setProducts(response.result);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuantities = async () => {
    try {
      const response = await lookupService.getProductQuantityTypes();
      if (response.status === 1 && response.result) {
        setQuantities(response.result);
      }
    } catch (error) {
      console.error('Error fetching quantities:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await productService.getAllProductCategories();
      if (response && response.status === 1 && response.result) {
        const subCats = response.result.filter(cat => cat.isParent === 0);
        setSubCategories(subCats);
      }
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate final price when price or discount changes
      if (name === 'price' || name === 'discount') {
        const price = parseFloat(name === 'price' ? value : updated.price) || 0;
        const discount = parseFloat(name === 'discount' ? value : updated.discount) || 0;
        updated.finalPrice = (price - (price * discount / 100)).toFixed(2);
      }
      
      return updated;
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingProduct) {
        // Update product
        const productData = {
          productId: editingProduct.productId,
          productName: formData.name,
          productTitle: formData.title,
          productDescription: formData.description,
          quantityId: parseInt(formData.quantityId),
          price: parseFloat(formData.price),
          discount: parseFloat(formData.discount) || 0,
          finalPrice: parseFloat(formData.finalPrice),
          productGst: parseFloat(formData.gst),
          categoryId: parseInt(formData.categoryId),
          statusId: parseInt(formData.statusId) || 1,
          isActive: true
        };
        
        const response = await productService.updateProduct(productData);
        if (response && response.status === 1) {
          await fetchProducts();
          toast.success('Product updated successfully!');
          resetForm();
        } else {
          toast.error('Failed to update product');
        }
      } else {
        // Add new product
        const apiFormData = new FormData();
        apiFormData.append('productName', formData.name);
        apiFormData.append('productTitle', formData.title);
        apiFormData.append('productDescription', formData.description);
        apiFormData.append('quantityId', formData.quantityId);
        apiFormData.append('price', formData.price);
        apiFormData.append('discount', formData.discount || 0);
        apiFormData.append('finalPrice', formData.finalPrice);
        apiFormData.append('productGst', formData.gst);
        apiFormData.append('categoryId', formData.categoryId);
        apiFormData.append('statusId', formData.statusId || 1);
        apiFormData.append('isActive', true);
        
        // Add images
        formData.images.forEach((image, index) => {
          apiFormData.append('productImages', image);
        });
        
        const response = await productService.onboardProduct(apiFormData);
        if (response && response.status === 1) {
          await fetchProducts();
          toast.success('Product added successfully!');
          resetForm();
        } else {
          toast.error('Failed to add product');
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error saving product';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', title: '', description: '', quantityId: '', price: '',
      discount: '', finalPrice: '', gst: '', categoryId: '', statusId: '', images: []
    });
    setEditingProduct(null);
    setShowPopup(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.productName,
      title: product.productTitle,
      description: product.productDescription,
      quantityId: product.quantityTypeId.toString(),
      price: product.price,
      discount: product.discount,
      finalPrice: product.finalPrice,
      gst: product.producGST,
      categoryId: product.categoryId.toString(),
      statusId: product.statusId.toString(),
      images: []
    });
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <>
      <style jsx>{`
        .page-container {
          padding: 24px;
          background-color: #f7f9fc;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .add-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-btn:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }

        .table-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .table th,
        .table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .table th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #4a5568;
        }

        .action-btn {
          padding: 4px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 8px;
          transition: all 0.2s;
        }

        // .edit-btn {
        //   background-color: #3b82f6;
        //   color: white;
        // }

        // .edit-btn:hover {
        //   background-color: #2563eb;
        // }

        // .delete-btn {
        //   background-color: #ef4444;
        //   color: white;
        // }

        // .delete-btn:hover {
        //   background-color: #dc2626;
        // }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup {
          background: white;
          border-radius: 12px;
          padding: 32px;
          width: 800px;
          max-width: 95vw;
          max-height: 90vh;
          overflow-y: auto;
        }

        .popup-title {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 32px 0;
          text-align: center;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 16px;
        }

        .form-section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #4a5568;
          margin: 0 0 20px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 20px;
        }

        .form-grid-three {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-group textarea {
          height: 80px;
          resize: vertical;
        }

        .file-input {
          border: 2px dashed #cbd5e0;
          border-radius: 12px;
          padding: 32px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: #f8fafc;
        }

        .file-input:hover {
          border-color: #10b981;
          background-color: #f0fdf4;
          transform: translateY(-2px);
        }

        .file-input input {
          display: none;
        }

        .file-input-text {
          color: #6b7280;
          font-size: 16px;
          margin: 0;
        }

        .file-count {
          color: #10b981;
          font-weight: 600;
          margin-top: 8px;
        }

        .popup-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-cancel {
          background-color: #f3f4f6;
          color: #6b7280;
          border: 2px solid #e5e7eb;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background-color: #e5e7eb;
          transform: translateY(-1px);
        }

        .btn-submit {
          background-color: #10b981;
          color: white;
          border: 2px solid #10b981;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-submit:hover {
          background-color: #059669;
          border-color: #059669;
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .price-display {
          color: #059669;
          font-weight: 600;
        }

        /* Form Validation Styles */
        input:required:invalid:not(:placeholder-shown):not(:focus),
        select:required:invalid:not(:focus),
        textarea:required:invalid:not(:placeholder-shown):not(:focus) {
          border-color: #ef4444;
        }

        input:valid:not(:placeholder-shown),
        select:valid,
        textarea:valid:not(:placeholder-shown) {
          border-color: #10b981;
        }

        input:focus:invalid,
        select:focus:invalid,
        textarea:focus:invalid {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
      `}</style>

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Products</h1>
          <button className="add-btn" onClick={() => setShowPopup(true)}>
            + Add Product
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>GST</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No products found</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productName}</td>
                    <td>{product.productTitle}</td>
                    <td>{product.categoryName}</td>
                    <td>₹{product.price}</td>
                    <td>{product.discount}%</td>
                    <td className="price-display">₹{product.finalPrice}</td>
                    <td>{product.producGST}%</td>
                    <td>
                      <button className="action-btn edit-btn" onClick={() => handleEdit(product)}>
                        <Edit size={18} />
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(product.productId)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showPopup && (
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
              <h2 className="popup-title">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleSubmit}>
                {/* Basic Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Basic Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter product title"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter detailed product description (optional)"
                      rows="4"
                    />
                  </div>
                </div>

                {/* Category & Quantity Section */}
                <div className="form-section">
                  <h3 className="section-title">Category & Specifications</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Sub-Category *</label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Sub-Category</option>
                        {subCategories.map((cat) => (
                          <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity Type *</label>
                      <select
                        name="quantityId"
                        value={formData.quantityId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Quantity Type</option>
                        {quantities.map((qty) => (
                          <option key={qty.statusId} value={qty.statusId}>
                            {qty.statusValue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="form-section">
                  <h3 className="section-title">Pricing Information</h3>
                  <div className="form-grid-three">
                    <div className="form-group">
                      <label>Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="form-group">
                      <label>GST (%) *</label>
                      <input
                        type="number"
                        name="gst"
                        value={formData.gst}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Final Price (₹)</label>
                    <input
                      type="number"
                      name="finalPrice"
                      value={formData.finalPrice}
                      readOnly
                      style={{ backgroundColor: '#f8fafc', fontWeight: '600', color: '#059669' }}
                    />
                  </div>
                </div>

                {/* Images Section */}
                <div className="form-section">
                  <h3 className="section-title">Product Images *</h3>
                  <div className="form-group">
                    <div className="file-input" onClick={() => document.getElementById('images').click()}>
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        required={!editingProduct}
                      />
                      <p className="file-input-text">📁 Click to upload images or drag and drop</p>
                      {formData.images.length > 0 && (
                        <p className="file-count">{formData.images.length} file(s) selected</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="popup-actions">
                  <button type="button" className="btn-cancel" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddProducts;