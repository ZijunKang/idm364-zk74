<script>
	// Smooth scroll to top
	function handleClickLink(event) {
		event.preventDefault();
		if(event.target.tagName === 'A') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
</script>

<!-- Footer -->
<footer onclick={handleClickLink}>
	<div class="footer-content">
		<div class="footer-column">
			<h3>Products</h3>
			<ul>
				<li><a href="#">BananaPhone</a></li>
				<li><a href="#">BananaBook</a></li>
				<li><a href="#">BananaPods</a></li>
				<li><a href="#">BananaWatch</a></li>
				<li><a href="#">Accessories</a></li>
			</ul>
		</div>
		<div class="footer-column">
			<h3>Support</h3>
			<ul>
				<li><a href="#">Contact</a></li>
				<li><a href="#">Warranty</a></li>
				<li><a href="#">FAQ</a></li>
			</ul>
		</div>
		<div class="footer-column" id="about">
			<h3>About Banana</h3>
			<ul>
				<li><a href="#">Our Story</a></li>
				<li><a href="#">Careers</a></li>
				<li><a href="#">Press</a></li>
			</ul>
		</div>
	</div>
	<div class="copyright">Copyright © 2025 Banana Inc.</div>
</footer>

<style>

	/* Footer */
	footer {
		background: #F5F5F7;
		padding: 80px 80px 40px;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 80px;
		margin-bottom: 60px;
	}

	.footer-column h3 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 20px;
	}

	.footer-column ul {
		list-style: none;
	}

	.footer-column li {
		margin-bottom: 12px;
	}

	.footer-column a {
		color: #7A7A7A;
		text-decoration: none;
		transition: color 0.3s;
	}

	.footer-column a:hover {
		color: #121212;
	}

	.copyright {
		text-align: center;
		color: #7A7A7A;
		font-size: 14px;
		padding-top: 40px;
		border-top: 1px solid rgba(0,0,0,0.1);
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
