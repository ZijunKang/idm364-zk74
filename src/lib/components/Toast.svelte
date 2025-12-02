<script>
  let { message = null, onclose } = $props();

  $effect(() => {
    if (message) {
      setTimeout(() => {
        message = null;
        onclose();
      }, 3000);
    }
  });
</script>

<!-- Toast Notification -->
<div class="toast" class:show={!!message}>
  {message}
</div>

<style>
    /* Toast Notification */
    .toast {
        position: fixed;
        top: 100px;
        right: -400px;
        background: #121212;
        color: white;
        padding: 20px 32px;
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        transition: right 0.3s ease;
        z-index: 2000;
    }

    .show {
        right: 40px;
    }
</style>
