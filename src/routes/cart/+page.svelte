<script>
  import { goto } from '$app/navigation'
  import { cartItems, removeCartItem, updateCartItem, clearCart } from '$lib/stores/cart.js';
  import Toast from "$lib/components/Toast.svelte";

  let products = $state([]);
  let subtotal = $state(0);
  let tax = $state(0);
  let total = $state(0);
  let toastMessage = $state('');

  cartItems.subscribe(items => { // when cartItems changed
    products = items
    subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    tax = Math.floor(subtotal * 0.09)
    total = subtotal + tax
  })

  function removeItem(id) {
    const itemElement = document.querySelector(`[data-id="${id}"]`);
    itemElement.style.opacity = '0';
    itemElement.style.transform = 'translateX(-40px)';

    setTimeout(() => {
      removeCartItem(id)
      showToast('Item removed from cart');
    }, 400);
  }

  function showToast(message) {
    toastMessage = message
  }

  function handlePay() {
    showToast('Pay success!');

    // setTimeout(clearCart, 3500);
  }
</script>

<svelte:head>
	<title>Cart</title>
	<meta name="description" content="Shop Cart" />
</svelte:head>

<!-- Page Header -->
<section class="page-header">
	<h1>Your Banana Cart</h1>
	<p>Review your items before you check out.</p>
</section>

{#if products.length > 0}
  <!-- Cart Container -->
  <section class="cart-container" id="cartContainer">
    <!-- Left Column - Cart Items -->
    <div class="cart-items">
      <div class="items-count" id="itemsCount">{products.length} items in your cart</div>

      {#each products as product (product)}
        <div class="cart-item" data-id={product.id}>
          <div class="item-thumbnail">{product.image}</div>
          <div class="item-info">
            <h3 class="item-name">{product.name}</h3>
            <p class="item-config">Banana Yellow / 256GB</p>
            <div class="quantity-selector">
              <button class="qty-btn" onclick={() => updateCartItem(product.id, -1)}>−</button>
              <span class="qty-number">{product.quantity}</span>
              <button class="qty-btn" onclick={() => updateCartItem(product.id, 1)}>+</button>
            </div>
            <button class="remove-btn" onclick={() => removeItem(product.id)}>Remove</button>
          </div>
          <div class="item-price-section">
            <div class="item-price">${product.price * product.quantity}</div>
          </div>
        </div>
      {/each}

    </div>

    <!-- Right Column - Order Summary -->
    <div class="order-summary">
      <div class="summary-card">
        <h2 class="summary-title">Order Summary</h2>

        <div class="summary-rows">
          <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">${subtotal}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Estimated Tax</span>
            <span class="summary-value">${tax}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Shipping</span>
            <span class="summary-value">Free</span>
          </div>
        </div>

        <div class="summary-divider"></div>

        <div class="total-row">
          <span class="total-label">Total</span>
          <span class="total-value">${total}</span>
        </div>

        <button class="btn-checkout" onclick={handlePay}>Go Bananas — Pay</button>
        <button class="btn-continue" onclick={() => goto(`/products`)}>Continue Shopping</button>

        <div class="trust-section">
          <div class="trust-item">
            <div class="trust-icon">🔒</div>
            <span class="trust-text">Secure checkout</span>
          </div>
          <div class="trust-item">
            <div class="trust-icon">🚚</div>
            <span class="trust-text">Free shipping on orders over $50</span>
          </div>
          <div class="trust-item">
            <div class="trust-icon">↩️</div>
            <span class="trust-text">14-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Toast message={toastMessage} onclose={() => {toastMessage = null}}/>
{:else}
  <!-- Empty Cart State -->
  <section class="empty-cart" id="emptyCart">
    <div class="empty-icon">🍌</div>
    <h1 class="empty-title">Your cart is empty.</h1>
    <p class="empty-subtitle">Add some Banana products to get started.</p>
    <button class="btn-shop" onclick={() => goto(`/products`)}>Shop Products</button>
  </section>
{/if}

<style>
	/* Cart Container */
	.cart-container {
		padding: 60px 80px 120px;
		display: flex;
		gap: 80px;
		align-items: flex-start;
	}

	/* Left Column - Cart Items */
	.cart-items {
		flex: 1;
		max-width: 760px;
	}

	.items-count {
		font-size: 16px;
		font-weight: 500;
		color: #7A7A7A;
		margin-bottom: 24px;
	}

	.cart-item {
		background: #F5F5F7;
		border-radius: 28px;
		padding: 32px;
		display: flex;
		gap: 24px;
		align-items: center;
		margin-bottom: 24px;
		box-shadow: 0 4px 16px rgba(0,0,0,0.04);
		transition: all 0.3s ease;
	}

	.cart-item:hover {
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
		transform: translateY(-2px);
	}

	.item-thumbnail {
		width: 120px;
		height: 120px;
		background: #fff;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 60px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.06);
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
	}

	.item-name {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.item-config {
		font-size: 15px;
		color: #7A7A7A;
		margin-bottom: 16px;
	}

	.quantity-selector {
		display: flex;
		align-items: center;
		background: #fff;
		border: 1px solid #E0E0E0;
		border-radius: 24px;
		height: 48px;
		width: 140px;
	}

	.qty-btn {
		width: 40px;
		height: 48px;
		background: transparent;
		border: none;
		font-size: 20px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.qty-btn:hover {
		background: #F5F5F7;
	}

	.qty-btn:first-child:hover {
		border-radius: 24px 0 0 24px;
	}

	.qty-btn:last-child:hover {
		border-radius: 0 24px 24px 0;
	}

	.qty-btn:active {
		transform: scale(0.95);
	}

	.qty-number {
		width: 60px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
	}

	.remove-btn {
		display: block;
		margin-top: 12px;
		font-size: 14px;
		color: #3E8FFF;
		background: none;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.remove-btn:hover {
		color: #2C7AE8;
		text-decoration: underline;
	}

	.item-price-section {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.item-price {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	/* Right Column - Order Summary */
	.order-summary {
		width: 420px;
		position: sticky;
		top: 92px;
	}

	.summary-card {
		background: #FFF7D6;
		border-radius: 32px;
		padding: 48px;
		box-shadow: 0 12px 32px rgba(0,0,0,0.08);
	}

	.summary-title {
		font-size: 28px;
		font-weight: 700;
		margin-bottom: 32px;
	}

	.summary-rows {
		margin-bottom: 32px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.summary-label {
		font-size: 17px;
		color: #7A7A7A;
	}

	.summary-value {
		font-size: 17px;
		font-weight: 600;
	}

	.summary-divider {
		height: 1px;
		background: rgba(0,0,0,0.12);
		margin: 24px 0;
	}

	.total-row {
		display: flex;
		justify-content: space-between;
		padding: 20px 0;
	}

	.total-label {
		font-size: 24px;
		font-weight: 700;
	}

	.total-value {
		font-size: 32px;
		font-weight: 700;
	}

	.btn-checkout {
		width: 100%;
		height: 64px;
		background: #FFD84D;
		border: none;
		border-radius: 16px;
		font-size: 20px;
		font-weight: 700;
		color: #121212;
		cursor: pointer;
		box-shadow: 0 8px 24px rgba(255, 216, 77, 0.3);
		transition: all 0.2s ease;
		margin-bottom: 16px;
	}

	.btn-checkout:hover {
		background: #FFC61A;
		box-shadow: 0 12px 32px rgba(255, 216, 77, 0.4);
		transform: translateY(-2px);
	}

	.btn-checkout:active {
		transform: scale(0.98);
	}

	.btn-continue {
		width: 100%;
		height: 56px;
		background: transparent;
		border: 2px solid #FFD84D;
		border-radius: 14px;
		font-size: 17px;
		font-weight: 600;
		color: #121212;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-continue:hover {
		background: #FFF7D6;
		border-color: #FFC61A;
	}

	.trust-section {
		margin-top: 32px;
		padding-top: 32px;
		border-top: 1px solid rgba(0,0,0,0.08);
	}

	.trust-item {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}

	.trust-icon {
		width: 32px;
		height: 32px;
		background: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}

	.trust-text {
		font-size: 14px;
		color: #7A7A7A;
	}

	/* Empty Cart State */
	.empty-cart {
		background: #F5F5F7;
		padding: 120px 80px;
		text-align: center;
		min-height: 800px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.empty-icon {
		font-size: 160px;
		margin-bottom: 40px;
		animation: float 3s ease-in-out infinite;
	}

	.empty-title {
		font-size: 48px;
		font-weight: 700;
		margin-bottom: 16px;
	}

	.empty-subtitle {
		font-size: 20px;
		color: #7A7A7A;
		line-height: 1.5;
		margin-bottom: 48px;
	}

	.btn-shop {
		width: 240px;
		height: 64px;
		background: #FFD84D;
		border: none;
		border-radius: 16px;
		font-size: 18px;
		font-weight: 600;
		color: #121212;
		cursor: pointer;
		box-shadow: 0 8px 24px rgba(255, 216, 77, 0.3);
		transition: all 0.2s;
	}

	.btn-shop:hover {
		background: #FFC61A;
		box-shadow: 0 12px 32px rgba(255, 216, 77, 0.4);
		transform: translateY(-2px);
	}



	/* Animations */
	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.cart-container {
			flex-direction: column;
			gap: 40px;
		}

		.cart-items {
			max-width: 100%;
		}

		.order-summary {
			width: 100%;
			position: static;
		}
	}

	@media (max-width: 768px) {
		.page-header, .cart-container {
			padding-left: 20px;
			padding-right: 20px;
		}

		.page-header h1 {
			font-size: 32px;
		}

		.page-header p {
			font-size: 16px;
		}

		.cart-item {
			flex-direction: column;
			align-items: flex-start;
			padding: 20px;
		}

		.item-thumbnail {
			width: 80px;
			height: 80px;
			font-size: 40px;
		}

		.item-name {
			font-size: 18px;
		}

		.item-price {
			font-size: 20px;
		}

		.summary-card {
			padding: 32px;
		}

		.summary-title {
			font-size: 24px;
		}

		.total-value {
			font-size: 28px;
		}

		.empty-icon {
			font-size: 100px;
		}

		.empty-title {
			font-size: 32px;
		}

		.empty-subtitle {
			font-size: 16px;
		}
	}
</style>
