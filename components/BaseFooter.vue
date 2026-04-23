<script setup>
  const email = ref('')
</script>

<template>
  <footer class="footer-container">
    <hr />
    <div class="footer-row">
      <nav>
        <a href="#">CONTACT</a>
        <a href="#">TERMS OF SERVICES</a>
        <a href="#">SHIPPING AND RETURNS</a>
      </nav>

      <form class="subscribe-form" @sumbit.prevent>
        <UIBaseInput
          v-model="email"
          type="email"
          placeholder="Give an email, get the newsletter."
          width="280px"
        />
        <button type="submit">
          <img src="~/assets/icons/enter.svg" alt="Subscribe" />
        </button>
      </form>
    </div>
    <div class="footer-row">
      <small>
        © <strong>2021 Shelly.</strong> <a href="#">Terms of usяe</a> <strong>and</strong>
        <a href="#">privacy policy</a>.
      </small>
      <div class="social-icons">
        <a href="#" aria-label="Facebook">
          <img src="~/assets/icons/facebook.svg" alt="Facebook" />
        </a>
        <a href="#" aria-label="Instagram">
          <img src="~/assets/icons/instagram.svg" alt="Instagram" />
        </a>
        <a href="#" aria-label="Twitter">
          <img src="~/assets/icons/twitter.svg" alt="Twitter" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .footer-container {
    display: flex;
    flex-direction: column;
  }

  .footer-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;

    nav,
    .social-icons {
      display: flex;
      gap: 1.5rem;
    }

    a {
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 27px;
      color: #707070;
      letter-spacing: 0%;
      text-decoration: none;
    }
  }

  .subscribe-form {
    display: flex;
    align-items: flex-end;

    button {
      display: flex;
      align-items: flex-end;
      padding: 0.5rem 0;
      font-family: $font-family-primary;
      font-size: 16px;
      cursor: pointer;
      outline: none;
      background: transparent;
      border: none;
      border-bottom: 1px solid $color-border-gray;

      img {
        display: block;
        width: 25px;
        height: 9px;
      }
    }
  }
</style>
