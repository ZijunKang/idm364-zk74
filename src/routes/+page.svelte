<script>
  import { goto } from '$app/navigation'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- Hero Section -->
<section class="hero" id="home">
	<div class="hero-content">
		<h1>Meet the new BananaPhone 15.</h1>
		<h2>Brighter. Softer. More You.</h2>
		<div class="hero-buttons">
			<button class="btn-primary" onclick={() => goto(`/products/1`)}>Buy Now</button>
			<button class="btn-ghost" onclick={() => goto(`/products`)}>More</button>
		</div>
	</div>
	<div class="hero-image">🍌</div>
</section>

<!-- Promo Section -->
<section class="promo">
  <div class="promo-content">
    <h1>Listen in Banana Sound.</h1>
    <button class="btn-primary" onclick={() => goto(`/products/6`)}>Shop BananaPods</button>
  </div>
  <div class="promo-image">🎧</div>
</section>

<style>
	/* Hero Section */
	.hero {
		padding: 160px 80px 100px;
		min-height: 800px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(135deg, #FFFFFF 0%, #FFF7D6 100%);
	}

	.hero-content {
		max-width: 600px;
		animation: fadeInUp 0.8s ease;
	}

	.hero h1 {
		font-size: 72px;
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 20px;
		background: linear-gradient(135deg, #121212 0%, #FFD84D 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero h2 {
		font-size: 28px;
		color: #7A7A7A;
		font-weight: 400;
		margin-bottom: 40px;
	}

	.hero-buttons {
		display: flex;
		gap: 20px;
	}

	.btn-ghost {
		background: none;
		color: #3E8FFF;
		padding: 18px 48px;
		border: none;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;
	}

	.btn-ghost:hover {
		color: #2C7AE8;
	}

	.hero-image {
		width: 620px;
		height: 620px;
		background: #F5F5F7;
		border-radius: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 180px;
		animation: float 3s ease-in-out infinite;
		box-shadow: 0 20px 60px rgba(0,0,0,0.1);
	}


  /* Promo Section */
  .promo {
    background: linear-gradient(135deg, #FFF7D6 0%, #FFD84D 100%);
    padding: 120px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .promo-content {
    max-width: 600px;
  }

  .promo h1 {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: 40px;
    line-height: 1.2;
  }

  .promo-image {
    width: 540px;
    height: 400px;
    background: #F5F5F7;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }
</style>
