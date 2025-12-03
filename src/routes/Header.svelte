<script>
  import { goto } from '$app/navigation'
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import LoginModal from '$lib/components/LoginModal.svelte';

	import { cartItems } from '$lib/stores/cart.js';
	import { loginUser, logout } from '$lib/stores/user.js';

  let currentRoute = $state('/')
  let cartCount = $state(0)
	let loginModalOpen = $state(false)
	let username = $state('')

	cartItems.subscribe(items => {
    cartCount = items.length
  })

	loginUser.subscribe(user => {
		username = user?.username || ''
  })

  $effect(() => {
    currentRoute = page.route.id
  });

	function showCart() {
    goto(`/cart`)
	}

	function handleLogout() {
    logout()
    goto(`/`)
  }
</script>

<header>
	<nav>
		<div class="logo">🍌 Banana</div>
		<ul class="nav-links">
			<li><a href={resolve('/')} class:active={currentRoute === '/'}>Home</a></li>
			<li><a href={resolve('/products')} class:active={currentRoute === '/products'}>Products</a></li>
			{#if username === 'admin'}
				<li><a href={resolve('/management')} class:active={currentRoute === '/management'}>Product Management</a></li>
			{/if}
		</ul>
		<div class="nav-icons">
<!--			<button class="icon-btn">🔍</button>-->
			{#if username}
				<button class="icon-btn" style="position: relative;" onclick={showCart}>
					🛒
					<span class="cart-badge">{cartCount}</span>
				</button>
				<span>{username}</span>
				<span class="logout" onclick={handleLogout}>Logout</span>
			{:else}
				<button class="icon-btn" onclick={() => loginModalOpen = true}>👤</button>
			{/if}
		</div>
	</nav>
</header>

<LoginModal open={loginModalOpen} onclose={() => loginModalOpen = false}/>

<style>

	/* Navigation */
	nav {
		position: fixed;
		top: 0;
		width: 100%;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		z-index: 1000;
		padding: 20px 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.05);
	}

	.logo {
		font-size: 28px;
		font-weight: 700;
		color: #121212;
		cursor: pointer;
	}

	.nav-links {
		display: flex;
		gap: 48px;
		list-style: none;
	}

	.nav-links a {
		text-decoration: none;
		color: #121212;
		font-size: 16px;
		transition: color 0.3s;
		padding-bottom: 4px;
		border-bottom: 2px solid transparent;
	}

	.nav-links a:hover {
		color: #3E8FFF;
	}

	.nav-links a.active {
		color: #FFD84D;
		border-bottom-color: #FFD84D;
	}

	.nav-icons {
		display: flex;
		gap: 24px;
		align-items: center;
	}

	.icon-btn {
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.icon-btn:hover {
		transform: scale(1.1);
	}

	.cart-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		background: #3E8FFF;
		color: white;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		font-size: 11px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logout {
		color: #1f7aa7;
		cursor: pointer;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		nav {
			padding-left: 20px;
			padding-right: 20px;
		}

		.nav-links {
			display: none;
		}
	}
</style>
