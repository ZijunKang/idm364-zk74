<script>
	import { goto } from '$app/navigation'

  // get from +page.js
	let { data } = $props();
	let { products } = data;

	let displayProducts = $state(products);
	let currentTab = $state('all');

	function filterProducts(category) {
		currentTab = category;
		displayProducts = products.filter(product => product.category === category.toUpperCase() || category === 'all')
	}

	function viewProduct(id) {
		goto(`/products/${id}`);
	}
</script>

<svelte:head>
	<title>Product</title>
	<meta name="description" content="Product List Page" />
</svelte:head>

<!-- Page Header -->
<section class="page-header">
	<h1>All Banana Products</h1>
	<p>Premium devices designed to brighten your digital life.</p>
</section>

<!-- Filter Bar -->
<section class="filter-bar">
	<div class="tabs">
		<button class="tab" class:active={currentTab === 'all'}  onclick={() => filterProducts('all')}>All</button>
		<button class="tab" class:active={currentTab === 'phone'} onclick={() => filterProducts('phone')}>Phones</button>
		<button class="tab" class:active={currentTab === 'laptop'} onclick={() => filterProducts('laptop')}>Laptops</button>
		<button class="tab" class:active={currentTab === 'audio'} onclick={() => filterProducts('audio')}>Audio</button>
		<button class="tab" class:active={currentTab === 'watch'} onclick={() => filterProducts('watch')}>Watch</button>
		<button class="tab" class:active={currentTab === 'accessories'} onclick={() => filterProducts('accessories')}>Accessories</button>
	</div>
</section>

<!-- Product Grid -->
<section class="product-section">
	<div class="product-grid">
		{#each displayProducts as product (product.id)}
			<div class="product-card">
				<div class="product-image">{product.image}</div>
				<div class="product-category">{product.category}</div>
				<h3 class="product-name">{product.name}</h3>
				<p class="product-tagline">{product.tagline}</p>
				<div class="product-price">${product.price}</div>
				<button class="btn-details" onclick={() => viewProduct(product.id)}>View Details</button>
			</div>
		{:else}
			<div>No data.</div>
		{/each}
	</div>
</section>

<style>
	/* Filter Bar */
	.filter-bar {
		background: #fff;
		padding: 32px 80px;
		border-bottom: 1px solid rgba(0,0,0,0.06);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.tab {
		min-width: 120px;
		height: 48px;
		padding: 0 32px;
		background: #F5F5F7;
		border: none;
		border-radius: 24px;
		font-size: 16px;
		font-weight: 600;
		color: #7A7A7A;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab:hover {
		background: #FFF7D6;
		transform: translateY(-2px);
	}

	.tab.active {
		background: #FFD84D;
		color: #121212;
		box-shadow: 0 4px 12px rgba(255, 216, 77, 0.3);
	}

	/* Product Grid */
	.product-section {
		padding: 80px 80px 120px;
		background: #fff;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 32px 32px;
		row-gap: 48px;
	}

	.product-card {
		background: #FFF7D6;
		border-radius: 32px;
		padding: 24px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 8px 24px rgba(0,0,0,0.04);
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(20px);
		animation: fadeInUp 0.6s ease forwards;
	}

	.product-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(255, 216, 77, 0.2) 0%, rgba(62, 143, 255, 0.1) 100%);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.product-card:hover::before {
		opacity: 1;
	}

	.product-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0,0,0,0.12);
	}

	.product-card:nth-child(1) { animation-delay: 0.05s; }
	.product-card:nth-child(2) { animation-delay: 0.1s; }
	.product-card:nth-child(3) { animation-delay: 0.15s; }
	.product-card:nth-child(4) { animation-delay: 0.2s; }
	.product-card:nth-child(5) { animation-delay: 0.25s; }
	.product-card:nth-child(6) { animation-delay: 0.3s; }
	.product-card:nth-child(7) { animation-delay: 0.35s; }
	.product-card:nth-child(8) { animation-delay: 0.4s; }

	.product-image {
		width: 100%;
		height: 220px;
		background: #F5F5F7;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 80px;
		margin-bottom: 20px;
		position: relative;
	}

	.product-category {
		font-size: 12px;
		font-weight: 600;
		color: #3E8FFF;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 8px;
	}

	.product-name {
		font-size: 22px;
		font-weight: 600;
		color: #121212;
		line-height: 1.2;
		margin-bottom: 8px;
	}

	.product-tagline {
		font-size: 14px;
		color: #7A7A7A;
		line-height: 1.4;
		margin-bottom: 16px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.product-price {
		font-size: 24px;
		font-weight: 700;
		color: #121212;
		margin-bottom: 20px;
	}

	.btn-details {
		width: 100%;
		height: 44px;
		background: #FFD84D;
		border: none;
		border-radius: 12px;
		font-size: 15px;
		font-weight: 600;
		color: #121212;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 2px 8px rgba(255, 216, 77, 0.2);
	}

	.btn-details:hover {
		background: #FFC61A;
		box-shadow: 0 4px 16px rgba(255, 216, 77, 0.4);
		transform: scale(1.02);
	}

	.btn-details:active {
		transform: scale(0.98);
	}

	/* Animations */
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.product-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 24px;
		}

		.filter-bar, .product-section {
			padding-left: 40px;
			padding-right: 40px;
		}

		.page-header {
			padding: 100px 40px 50px;
		}

		.page-header h1 {
			font-size: 48px;
		}
	}

	@media (max-width: 768px) {
		.product-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.filter-bar, .product-section {
			padding-left: 20px;
			padding-right: 20px;
		}

		.page-header {
			padding: 80px 20px 40px;
		}

		.page-header h1 {
			font-size: 36px;
		}

		.page-header p {
			font-size: 18px;
		}

		.tabs {
			overflow-x: auto;
			scrollbar-width: none;
		}

		.tabs::-webkit-scrollbar {
			display: none;
		}

	}
</style>
