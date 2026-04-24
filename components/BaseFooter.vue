<script setup>
  import facebookIcon from '~/assets/icons/facebook.svg'
  import instagramIcon from '~/assets/icons/instagram.svg'
  import twitterIcon from '~/assets/icons/twitter.svg'

  import { validateEmail } from '~/utils/validation'

  const email = ref('')
  const agreed = ref(false)
  const error = ref('')
  const agreementError = ref('')

  const handleSubmit = () => {
    error.value = ''
    agreementError.value = ''

    if (!email.value) {
      error.value = 'Введите email'
      return
    }

    if (!validateEmail(email.value)) {
      error.value = 'Некорректный формат email'
      return
    }

    if (!agreed.value) {
      agreementError.value = 'Необходимо согласие с условиями'
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
  <footer class="footer__container">
    <hr class="footer-hr" />

    <form class="subscribe-form" novalidate @submit.prevent="handleSubmit">
      <div class="input-row">
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
        <div class="button-line"></div>
      </div>
      <label class="agreement-label" :class="{ 'agreement-error': agreementError }">
        <input v-model="agreed" type="checkbox" class="agreement-checkbox" />
        <span class="agreement-text"
          >i agree to the website's <a href="#">terms and conditions</a></span
        >
      </label>
      <span v-if="agreementError" class="agreement-error-text">{{ agreementError }}</span>
    </form>

    <nav class="footer-nav">
      <a v-for="link in navLinks" :key="link.label" :href="link.href">
        {{ link.label }}
      </a>
    </nav>

    <div class="follow-us-row">
      <span class="follow-us">Follow us</span>
      <div class="follow-us-line"></div>
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

    <small class="footer-copyright">
      © 2020 Shelly. <a href="#">Terms of use</a> and <a href="#">privacy policy</a>.
    </small>
  </footer>
</template>

<style scoped lang="scss">
  .footer__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    text-align: left;
  }

  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;

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

  .follow-us-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  .follow-us {
    font-family: $font-family-primary;
    font-size: 16px;
    color: #707070;
    white-space: nowrap;
  }

  .follow-us-line {
    flex: 1;
    max-width: 100px;
    height: 1px;
    background: $color-border-gray;
  }

  .footer-hr {
    display: none;
    width: 100%;
    margin: 0;
  }

  .social-icons {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-start;

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

  .footer-copyright {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #707070;
    letter-spacing: 0%;

    a {
      color: #707070;
      text-decoration: none;
    }

    strong {
      color: #000;
    }
  }

  .subscribe-form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 280px;

    .input-row {
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100%;

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

        img {
          display: block;
          width: 25px;
          height: 9px;
        }
      }

      .button-line {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 25px;
        height: 1px;
        background: $color-border-gray;
      }
    }

    .agreement-label {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-top: 0.75rem;
      cursor: pointer;

      &.agreement-error {
        color: #e53935;
      }

      a {
        color: inherit;
        text-decoration: underline;
      }
    }

    .agreement-checkbox {
      width: 14px;
      height: 14px;
      margin: 0;
      cursor: pointer;
    }

    .agreement-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      color: #707070;
    }

    .agreement-error-text {
      position: absolute;
      bottom: -40px;
      left: 0;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      color: #e53935;
    }
  }

  @media (min-width: $breakpoints-m) {
    .footer__container {
      display: grid;
      grid-template:
        'hr hr' auto
        'nav form' auto
        'copyright social' auto
        / 1fr auto;
      gap: 1rem;
      align-items: center;
      text-align: left;

      @media (min-width: $breakpoints-xl) {
        margin-bottom: 106px;
      }
    }

    .subscribe-form {
      grid-area: form;
      justify-self: end;
      width: auto;
    }

    .footer-nav {
      flex-direction: row;
      grid-area: nav;
      gap: 1.5rem;
      justify-content: flex-start;
    }

    .follow-us-row {
      display: none;
    }

    .footer-hr {
      display: block;
      grid-area: hr;
    }

    .social-icons {
      grid-area: social;
      justify-self: end;
    }

    .footer-copyright {
      grid-area: copyright;
      font-size: 16px;
      line-height: 27px;

      a {
        text-decoration: underline;
      }
    }
  }
</style>
