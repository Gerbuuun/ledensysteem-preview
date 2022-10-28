<template>
  <div class="hero">
    <div class="hero-content text-center text-primary-content-100">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">404</h1>
        <p class="py-6">
          Deze pagina bestaat niet.
        </p>
        <p>
          <button class="btn gap-2" @click="$router.go(-1)"><Icon name="mdi:chevron-left" />Terug</button>
        </p>
      </div>
    </div>
  </div>
</template>