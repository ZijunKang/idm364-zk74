<script>
  let { open = false, onclose } = $props();
</script>

<!-- Modal -->
<div class="modal" class:active={open} id="cartModal">
  <div class="modal-content">
    <div class="emoji">🎉</div>
    <h2>Added to Cart!</h2>
    <p id="modalMessage">Product has been added to your cart.</p>
    <button class="btn-primary" onclick={() => onclose()}>Continue Shopping</button>
  </div>
</div>

<style>
  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Modal */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    z-index: 2000;
    align-items: center;
    justify-content: center;
  }

  .modal.active {
    display: flex;
  }

  .modal-content {
    background: white;
    padding: 60px;
    border-radius: 32px;
    text-align: center;
    animation: fadeInUp 0.4s ease;
    max-width: 500px;
  }

  .modal-content .emoji {
    font-size: 100px;
    margin-bottom: 20px;
  }

  .modal-content h2 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .modal-content p {
    color: #7A7A7A;
    font-size: 18px;
    margin-bottom: 32px;
  }
</style>
