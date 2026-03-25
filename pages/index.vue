<template>
  <div class="test-page">
    <h1>Тест Шрифтов</h1>
    <p class="primary">Primary: DM Sans Regular</p>
    <p class="secondary">Secondary: Red Hat Display Bold</p>
    <p class="mono">Mono: Roboto Mono Medium</p>
    <p class="stencil">Stencil: Allerta Stencil</p>

    <div class="container container-test">контейнер</div>
  </div>
</template>

<style scoped>
  .test-page {
    padding: 20px;
  }

  h1 {
    font-family: 'Red Hat Display', sans-serif;
  }

  .primary {
    font-family: 'DM Sans', sans-serif;
  }

  .secondary {
    font-family: 'Red Hat Display', sans-serif;
    font-weight: bold;
  }

  .mono {
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
  }

  .stencil {
    font-family: 'Allerta Stencil', sans-serif;
  }

  .container-test {
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 20px;
    text-align: center;
    background-color: #f0f0f0;
    border: 2px dashed #000;
  }
</style>
