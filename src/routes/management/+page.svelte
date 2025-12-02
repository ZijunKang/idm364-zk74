<script>
  import Toast from "$lib/components/Toast.svelte";

  let products = $state([]);
  let loading = $state(true);
  let editingProduct = $state(null);
  let showForm = $state(false);
  let toastMessage = $state('');

  let formData = $state({
    id: null,
    category: '',
    name: '',
    tagline: '',
    price: '',
    image: ''
  });

  $effect(async () => {
    loading = true;
    try {
      const response = await fetch('/api/products');
      products = await response.json();
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      loading = false;
    }
  });

  async function addProduct() {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          id: Date.now() // 简单生成唯一ID
        })
      });

      if (response.ok) {
        const newProduct = await response.json();
        products = [...products, newProduct];
        resetForm();
        showForm = false;
        showToast('Product added successfully!');
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      showToast('Failed to add product');
    }
  }

  async function updateProduct() {
    try {
      const response = await fetch(`/api/products?id=${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        })
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        resetForm();
        showForm = false;
        showToast('Product updated successfully!');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      showToast('Failed to update product');
    }
  }

  async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        products = products.filter(p => p.id !== id);
        showToast('Product deleted successfully!');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Failed to delete product');
    }
  }

  // 编辑产品
  function editProduct(product) {
    formData = { ...product };
    editingProduct = product;
    showForm = true;
  }

  function resetForm() {
    formData = {
      id: null,
      category: '',
      name: '',
      tagline: '',
      price: '',
      image: ''
    };
    editingProduct = null;
  }

  function submitForm() {
    if (editingProduct) {
      updateProduct();
    } else {
      addProduct();
    }
  }

  function showToast(message) {
    toastMessage = message
  }
</script>

<svelte:head>
  <title>Product Management</title>
  <meta name="description" content="Product Management" />
</svelte:head>

<!-- Page Header -->
<section class="page-header">
  <h1>Product Management</h1>
  <p>Manage your banana products</p>
</section>

<section class="management-container">
  <div class="actions-bar">
    <button class="btn-primary" onclick={() => { resetForm(); showForm = true; }}>
      Add New Product
    </button>
  </div>

  {#if loading}
    <div class="loading">Loading products...</div>
  {:else}
    {#if showForm}
      <!-- Product Form -->
      <div class="form-container">
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form class="product-form" onsubmit={submitForm}>
          <div class="form-group">
            <label for="category">Category</label>
            <select
              id="category"
              bind:value={formData.category}
              required
              class="form-control"
            >
              <option value="">-- Select --</option>
              <option value="PHONE">Phone</option>
              <option value="LAPTOP">Laptop</option>
              <option value="AUDIO">Audio</option>
              <option value="WATCH">Watch</option>
              <option value="ACCESSORIES">Accessories</option>
            </select>
          </div>

          <div class="form-group">
            <label for="name">Product Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="form-control"
              placeholder="Enter product name"
            />
          </div>

          <div class="form-group">
            <label for="tagline">Tagline</label>
            <input
              type="text"
              id="tagline"
              bind:value={formData.tagline}
              required
              class="form-control"
              placeholder="Enter tagline"
            />
          </div>

          <div class="form-group">
            <label for="price">Price ($)</label>
            <input
              type="number"
              id="price"
              bind:value={formData.price}
              required
              min="0"
              step="1"
              class="form-control"
              placeholder="Enter price"
            />
          </div>

          <div class="form-group">
            <label for="image">Emoji Image</label>
            <input
              type="text"
              id="image"
              bind:value={formData.image}
              required
              class="form-control"
              placeholder="Enter emoji (e.g. 📱)"
            />
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" onclick={() => { showForm = false; resetForm(); }}>
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    {:else}
      <!-- Products Table -->
      <div class="products-table-container">
        {#if products.length > 0}
          <table class="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Tagline</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each products as product (product.id)}
                <tr>
                  <td>{product.id}</td>
                  <td class="product-image-cell">{product.image}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.tagline}</td>
                  <td>${product.price}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn-edit" onclick={() => editProduct(product)}>
                        Edit
                      </button>
                      <button class="btn-delete" onclick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else}
          <div class="empty-state">
            <div class="empty-icon">🍌</div>
            <h3>No products found</h3>
            <p>Get started by adding a new product.</p>
            <button class="btn-primary" onclick={() => { resetForm(); showForm = true; }}>
              Add Your First Product
            </button>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</section>

<Toast message={toastMessage} onclose={() => {toastMessage = null}}/>

<style>
  /* Management Container */
  .management-container {
    padding: 60px 80px 120px;
  }

  .actions-bar {
    margin-bottom: 32px;
    display: flex;
    justify-content: flex-end;
  }

  .btn-primary, .btn-secondary, .btn-edit, .btn-delete {
    height: 48px;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-primary, .btn-edit {
    background: #FFD84D;
    color: #121212;
    box-shadow: 0 4px 16px rgba(255, 216, 77, 0.3);
  }

  .btn-primary:hover, .btn-edit:hover {
    background: #FFC61A;
    box-shadow: 0 6px 20px rgba(255, 216, 77, 0.4);
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: transparent;
    border: 2px solid #E0E0E0;
    color: #121212;
    margin-right: 12px;
  }

  .btn-secondary:hover {
    background: #F5F5F7;
    border-color: #C0C0C0;
  }

  .btn-delete {
    background: #FF6B6B;
    color: white;
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.3);
  }

  .btn-delete:hover {
    background: #FF5252;
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    transform: translateY(-2px);
  }

  .btn-primary:active, .btn-secondary:active, .btn-edit:active, .btn-delete:active {
    transform: scale(0.98);
  }

  /* Loading State */
  .loading {
    text-align: center;
    padding: 60px;
    font-size: 18px;
    color: #7A7A7A;
  }

  /* Form Styles */
  .form-container {
    background: #F5F5F7;
    border-radius: 28px;
    padding: 40px;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  }

  .form-container h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 32px;
    text-align: center;
  }

  .product-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 16px;
    font-weight: 600;
    color: #121212;
  }

  .form-control {
      height: 56px;
      background: #fff;
      border: 1px solid #E0E0E0;
      border-radius: 16px;
      padding: 0 20px;
      font-size: 16px;
      transition: all 0.2s ease;
  }

  .form-control:focus {
    outline: none;
    border-color: #FFD84D;
    box-shadow: 0 0 0 3px rgba(255, 216, 77, 0.3);
  }

  select.form-control {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A7A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 20px;
    padding-right: 48px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
  }

  /* Products Table */
  .products-table-container {
    overflow-x: auto;
    background: #F5F5F7;
    border-radius: 28px;
    padding: 32px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  }

  .products-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 16px;
    overflow: hidden;
  }

  .products-table thead {
    background: #FFF7D6;
  }

  .products-table th {
    padding: 20px 16px;
    text-align: left;
    font-weight: 600;
    color: #121212;
    font-size: 16px;
  }

  .products-table tbody tr {
    border-bottom: 1px solid #E0E0E0;
  }

  .products-table tbody tr:last-child {
    border-bottom: none;
  }

  .products-table td {
    padding: 16px;
    font-size: 16px;
    color: #121212;
  }

  .product-image-cell {
    font-size: 30px !important;
    text-align: center;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }

  .btn-edit, .btn-delete {
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    border-radius: 12px;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 80px 40px;
  }

  .empty-icon {
    font-size: 80px;
    margin-bottom: 24px;
    animation: float 3s ease-in-out infinite;
  }

  .empty-state h3 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .empty-state p {
    font-size: 18px;
    color: #7A7A7A;
    margin-bottom: 32px;
  }

  /* Animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .management-container {
      padding: 40px 20px;
    }

    .page-header {
      padding: 80px 20px 30px;
    }

    .page-header h1 {
      font-size: 36px;
    }

    .products-table-container {
      padding: 16px;
    }

    .products-table th, .products-table td {
      padding: 12px 8px;
      font-size: 14px;
    }

    .form-container {
      padding: 24px;
    }

    .form-actions {
      flex-direction: column;
    }

    .btn-secondary {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
</style>
