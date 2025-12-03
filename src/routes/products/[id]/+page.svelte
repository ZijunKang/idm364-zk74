<script>
	import { writable, derived, get } from 'svelte/store';
	import { goto } from '$app/navigation'
  import AddCartModal from "$lib/components/AddCartModal.svelte";
	import Toast from "$lib/components/Toast.svelte";
  import { addCartItem } from '$lib/stores/cart.js';
	import { loginUser } from '$lib/stores/user.js';

  let { data } = $props();
  const { product } = data;

  let open = $state(false);
	let toastMessage = $state('');

	function addToCart() {
		if (!get(loginUser)) {
			toastMessage = 'Please login first'
			return
    }

    addCartItem(product)
    open = true
	}
</script>

<svelte:head>
	<title>Product Detail</title>
	<meta name="description" content="Product Detail Page" />
</svelte:head>

<!-- Main Product Section -->
<section class="product-container">
	<!-- Left Column - Image Gallery -->
	<div class="image-gallery">
		<div class="main-image" id="mainImage">{product.image}</div>
		<div class="thumbnails">
			<div class="thumbnail active">{product.image}</div>
			<div class="thumbnail">{product.image}</div>
			<div class="thumbnail">{product.image}</div>
			<div class="thumbnail">{product.image}</div>
			<div class="thumbnail">{product.image}</div>
		</div>
	</div>

	<!-- Right Column - Product Info -->
	<div class="product-info">
		<div class="category-tag">{product.category}</div>
		<h1 class="product-name">{product.name}</h1>
		<h2 class="product-tagline">{product.tagline}</h2>

		<div class="rating">
			<span class="stars">⭐⭐⭐⭐⭐</span>
			<span class="rating-text">(4.8 / 5 stars – 1,247 reviews)</span>
		</div>

		<div class="price" id="productPrice">${product.price}</div>

		<p class="description">
			Experience the next generation of Banana technology. The BananaPhone 15 features our most advanced chip, stunning display, and all-day battery life in a beautifully rounded design.
		</p>

		<!-- Color Selector -->
		<div class="selector-section">
			<div class="selector-label">Color</div>
			<div class="color-options">
				<div class="color-swatch color-yellow active" onclick={() => selectColor(this)}>
					<span class="color-label">Banana Yellow</span>
				</div>
				<div class="color-swatch color-cream" onclick={() => selectColor(this)}>
					<span class="color-label">Banana Cream</span>
				</div>
				<div class="color-swatch color-black" onclick={() => selectColor(this)}>
					<span class="color-label">Space Black</span>
				</div>
			</div>
		</div>

		<!-- Storage Selector -->
		<div class="selector-section">
			<div class="selector-label">Storage</div>
			<div class="storage-options">
				<button class="storage-btn active" onclick={() => selectStorage(this, 999)}>
					<span class="storage-size">128GB</span>
					<span class="storage-price">$999</span>
				</button>
				<button class="storage-btn" onclick={() => selectStorage(this, 1149)}>
					<span class="storage-size">256GB</span>
					<span class="storage-price">$1,149</span>
				</button>
				<button class="storage-btn" onclick={() => selectStorage(this, 1349)}>
					<span class="storage-size">512GB</span>
					<span class="storage-price">$1,349</span>
				</button>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="action-buttons">
			<button class="btn-add-cart" onclick={() => addToCart()}>Add to Cart</button>
			<button class="btn-buy-now" onclick={() => goto(`/cart`)}>Pay Now</button>
		</div>

		<!-- Key Features -->
		<div class="features-section">
			<div class="features-title">Key Features</div>
			<div class="feature-item">
				<div class="feature-icon">✓</div>
				<div class="feature-text"><strong>BananaChip B2 processor</strong> — Lightning-fast performance</div>
			</div>
			<div class="feature-item">
				<div class="feature-icon">✓</div>
				<div class="feature-text"><strong>BananaOS 18</strong> — Smooth, intuitive, yellow</div>
			</div>
			<div class="feature-item">
				<div class="feature-icon">✓</div>
				<div class="feature-text"><strong>5.8" SoftGlass Display</strong> — Vivid colors, rounded edges</div>
			</div>
			<div class="feature-item">
				<div class="feature-icon">✓</div>
				<div class="feature-text"><strong>20-hour battery life</strong> — All-day Banana power</div>
			</div>
			<div class="feature-item">
				<div class="feature-icon">✓</div>
				<div class="feature-text"><strong>UltraLight BananaFrame</strong> — Premium aluminum design</div>
			</div>
			<div class="feature-item">
				<div class="feature-icon">✓</div>
				<div class="feature-text"><strong>Available in 3 Banana colors</strong> — Express yourself</div>
			</div>
		</div>
	</div>
</section>

<!-- Technical Specifications -->
<section class="specs-section">
	<div class="specs-card">
		<h2 class="specs-title">Technical Specifications</h2>
		<div class="specs-grid">
			<div class="spec-row">
				<span class="spec-label">Display</span>
				<span class="spec-value">5.8" SoftGlass OLED</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Battery</span>
				<span class="spec-value">20 hours video playback</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Resolution</span>
				<span class="spec-value">2532 × 1170 pixels</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Charging</span>
				<span class="spec-value">Fast charge, wireless</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Chip</span>
				<span class="spec-value">BananaChip B2</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Dimensions</span>
				<span class="spec-value">146.7 × 71.5 × 7.8 mm</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Memory</span>
				<span class="spec-value">6GB RAM</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Weight</span>
				<span class="spec-value">138 grams</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Storage</span>
				<span class="spec-value">128GB / 256GB / 512GB</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Water Resistance</span>
				<span class="spec-value">IP68</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Rear Camera</span>
				<span class="spec-value">48MP Wide + 12MP Ultra Wide</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Operating System</span>
				<span class="spec-value">BananaOS 18</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Front Camera</span>
				<span class="spec-value">12MP TrueDepth</span>
			</div>
			<div class="spec-row">
				<span class="spec-label">Connectivity</span>
				<span class="spec-value">5G, Wi-Fi 6E, Bluetooth 5.3</span>
			</div>
		</div>
	</div>
</section>

<AddCartModal {open} onclose={() => open = false}/>

<Toast message={toastMessage} onclose={() => {toastMessage = null}}/>


<style>
	/* Main Product Section */
	.product-container {
    margin-top: 50px;
		padding: 60px 80px;
		display: flex;
		gap: 80px;
		animation: fadeIn 0.5s ease;
	}

	/* Left Column - Images */
	.image-gallery {
		flex: 0 0 660px;
	}

	.main-image {
		width: 660px;
		height: 660px;
		background: #F5F5F7;
		border-radius: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 240px;
		box-shadow: 0 12px 32px rgba(0,0,0,0.08);
		margin-bottom: 24px;
		cursor: zoom-in;
		transition: all 0.3s ease;
		animation: slideInLeft 0.4s ease;
	}

	.main-image:hover {
		filter: brightness(1.05);
	}

	.thumbnails {
		display: flex;
		gap: 20px;
	}

	.thumbnail {
		width: 124px;
		height: 124px;
		background: #F5F5F7;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40px;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.thumbnail:hover {
		border-color: #3E8FFF;
		transform: scale(1.05);
	}

	.thumbnail.active {
		border-color: #FFD84D;
		box-shadow: 0 4px 12px rgba(255, 216, 77, 0.3);
	}

	/* Right Column - Product Info */
	.product-info {
		flex: 1;
		animation: slideInRight 0.5s ease;
	}

	.category-tag {
		font-size: 13px;
		font-weight: 700;
		color: #3E8FFF;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 12px;
	}

	.product-name {
		font-size: 56px;
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 16px;
	}

	.product-tagline {
		font-size: 28px;
		color: #7A7A7A;
		line-height: 1.3;
		margin-bottom: 24px;
	}

	.rating {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 32px;
	}

	.stars {
		font-size: 20px;
	}

	.rating-text {
		font-size: 14px;
		color: #7A7A7A;
	}

	.price {
		font-size: 48px;
		font-weight: 700;
		margin-bottom: 32px;
	}

	.description {
		font-size: 18px;
		color: #7A7A7A;
		line-height: 1.6;
		max-width: 520px;
		margin-bottom: 40px;
	}

	/* Color Selector */
	.selector-section {
		margin-bottom: 32px;
	}

	.selector-label {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.color-options {
		display: flex;
		gap: 60px;
	}

	.color-swatch {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
	}

	.color-swatch:hover {
		transform: scale(1.1);
		border-color: #7A7A7A;
	}

	.color-swatch.active {
		border: 3px solid #121212;
		box-shadow: 0 4px 16px rgba(0,0,0,0.15);
	}

	.color-yellow { background: #FFD84D; }
	.color-cream { background: #FFF7D6; }
	.color-black { background: #121212; }

	.color-label {
    display: none;
		position: absolute;
		top: 65px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 13px;
		color: #7A7A7A;
		white-space: nowrap;
	}

	/* Storage Selector */
	.storage-options {
		display: flex;
		gap: 12px;
	}

	.storage-btn {
		width: 180px;
		height: 64px;
		background: #F5F5F7;
		border: 2px solid transparent;
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.storage-btn:hover {
		background: #FFF7D6;
		border-color: #FFD84D;
	}

	.storage-btn.active {
		background: #FFD84D;
		border-color: #121212;
		box-shadow: 0 4px 12px rgba(255, 216, 77, 0.3);
	}

	.storage-size {
		font-size: 20px;
		font-weight: 600;
		color: #121212;
	}

	.storage-price {
    display: none;
		font-size: 16px;
		color: #7A7A7A;
	}

	/* Action Buttons */
	.action-buttons {
		display: flex;
		gap: 16px;
		margin-bottom: 48px;
		margin-top: 40px;
	}

	.btn-add-cart {
		width: 280px;
		height: 64px;
		background: #FFD84D;
		border: none;
		border-radius: 16px;
		font-size: 18px;
		font-weight: 600;
		color: #121212;
		cursor: pointer;
		box-shadow: 0 8px 24px rgba(255, 216, 77, 0.3);
		transition: all 0.2s ease;
	}

	.btn-add-cart:hover {
		background: #FFC61A;
		box-shadow: 0 12px 32px rgba(255, 216, 77, 0.4);
		transform: translateY(-2px);
	}

	.btn-add-cart:active {
		transform: scale(0.98);
	}

	.btn-buy-now {
		width: 280px;
		height: 64px;
		background: #3E8FFF;
		border: none;
		border-radius: 16px;
		font-size: 18px;
		font-weight: 600;
		color: white;
		cursor: pointer;
		box-shadow: 0 8px 24px rgba(62, 143, 255, 0.3);
		transition: all 0.2s ease;
	}

	.btn-buy-now:hover {
		background: #2C7AE8;
		box-shadow: 0 12px 32px rgba(62, 143, 255, 0.4);
		transform: translateY(-2px);
	}

	/* Key Features */
	.features-section {
		margin-bottom: 48px;
	}

	.features-title {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 24px;
	}

	.feature-item {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin-bottom: 16px;
	}

	.feature-icon {
		width: 32px;
		height: 32px;
		background: #FFF7D6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFD84D;
		font-weight: 700;
		flex-shrink: 0;
	}

	.feature-text {
		font-size: 16px;
		color: #7A7A7A;
		line-height: 1.5;
	}

	/* Technical Specs */
	.specs-section {
		padding: 80px 80px;
		background: #fff;
	}

	.specs-card {
		max-width: 1280px;
		margin: 0 auto;
		background: #F5F5F7;
		border-radius: 32px;
		padding: 60px;
	}

	.specs-title {
		font-size: 36px;
		font-weight: 700;
		text-align: center;
		margin-bottom: 48px;
	}

	.specs-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 32px 80px;
	}

	.spec-row {
		display: flex;
		justify-content: space-between;
		padding-bottom: 24px;
		border-bottom: 1px solid rgba(0,0,0,0.08);
	}

	.spec-label {
		font-size: 18px;
		font-weight: 600;
		color: #121212;
	}

	.spec-value {
		font-size: 18px;
		color: #7A7A7A;
		text-align: right;
	}

	/* Animations */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-40px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(40px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.product-container {
			flex-direction: column;
			gap: 40px;
		}

		.image-gallery {
			flex: none;
			width: 100%;
			max-width: 600px;
			margin: 0 auto;
		}

		.main-image {
			width: 100%;
			height: auto;
			aspect-ratio: 1;
		}
	}

	@media (max-width: 768px) {
		.product-container, .specs-section {
			padding-left: 20px;
			padding-right: 20px;
		}

		.product-name {
			font-size: 36px;
		}

		.product-tagline {
			font-size: 18px;
		}

		.price {
			font-size: 36px;
		}

		.action-buttons {
			flex-direction: column;
		}

		.btn-add-cart, .btn-buy-now {
			width: 100%;
		}

		.storage-options {
			flex-direction: column;
		}

		.storage-btn {
			width: 100%;
		}

		.specs-grid {
			grid-template-columns: 1fr;
		}

	}
</style>
