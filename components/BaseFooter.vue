<script setup>
  import facebookIcon from '~/assets/icons/facebook.svg'
  import instagramIcon from '~/assets/icons/instagram.svg'
  import twitterIcon from '~/assets/icons/twitter.svg'

  import { validateEmail } from '~/utils/validation'

  const email = ref('')
  const error = ref('')

  const handleSubmit = () => {
    error.value = ''

    if (!email.value) {
      error.value = 'Введите email'
      return
    }

    if (!validateEmail(email.value)) {
      error.value = 'Некорректный формат email'
      return
    }
    localStorage.setItem('subscribeEmail', email.value)
    alert('Вы успешно подписались на рассылку!')
    email.value = ''
  }

  const handleInput = (value) => {
    email.value = value
    if (error.value) {
      error.value = ''
    }
  }

  const navLinks = [
    { label: 'CONTACT', href: '#' },
    { label: 'TERMS OF SERVICES', href: '#' },
    { label: 'SHIPPING AND RETURNS', href: '#' },
  ]

  const socialLinks = [
    { label: 'Facebook', icon: facebookIcon, href: '#' },
    { label: 'Instagram', icon: instagramIcon, href: '#' },
    { label: 'Twitter', icon: twitterIcon, href: '#' },
  ]
</script>

<template>
  <footer class="footer-container">
    <hr />
    <div class="footer-row">
      <nav>
        <a v-for="link in navLinks" :key="link.label" :href="link.href">
          {{ link.label }}
        </a>
      </nav>

      <form class="subscribe-form" novalidate @submit.prevent="handleSubmit">
        <UIBaseInput
          v-model="email"
          :error="error"
          type="email"
          placeholder="Give an email, get the newsletter."
          width="280px"
          @update:modelValue="handleInput"
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
        <a
          v-for="social in socialLinks"
          :key="social.label"
          :href="social.href"
          :aria-label="social.label"
        >
          <img :src="social.icon" :alt="social.label" />
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
