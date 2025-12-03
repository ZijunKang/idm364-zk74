<script>
  import { login } from '$lib/stores/user.js';

  let { open = false, onclose } = $props();
  let errorMessage = $state('');
  let formData = $state({
    username: '',
    password: '',
  });

  function resetForm() {
    formData = {
      username: '',
      password: '',
    };
    errorMessage = '';
  }

  async function submitForm(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const userArray = await response.json();
        if(userArray.length === 0) {
          errorMessage = 'Username or password is not correct'
        } else {
          resetForm()
          login(userArray[0])
          onclose();
        }
      } else {
        errorMessage = 'System Error'
      }
    } catch (error) {
      errorMessage = error
    }
  }
</script>

<!-- Modal -->
<div class="modal" class:active={open} id="cartModal">
  <div class="modal-content">
    <div class="form-container">
      <h2>Login</h2>
      <form class="product-form" onsubmit={submitForm}>
      <div class="form-group">
        <label for="name">Username</label>
        <input
            type="text"
            id="name"
            bind:value={formData.username}
            required
            class="form-control"
            placeholder="Enter username"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            bind:value={formData.password}
            required
            class="form-control"
            placeholder="Enter password"
        />
      </div>

      <p style="color: red">{errorMessage}</p>
      <div class="form-actions">
        <button type="button" class="btn-secondary" onclick={() => onclose()}>
          Cancel
        </button>
        <button type="submit" class="btn-primary">
          Login
        </button>
      </div>
    </form>
    </div>
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
    animation: fadeInUp 0.4s ease;
    max-width: 500px;
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
