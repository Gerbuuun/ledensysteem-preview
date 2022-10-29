<template>
  <div>
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open Menu</label>

        <div class="w-3/5 h-full p-5">
          <slot />
        </div>

      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
          <li><NuxtLink to="/verenigingen"><Icon name="mdi:domain" />Verenigingen</NuxtLink></li>
          <li><NuxtLink to="/groepen"><Icon name="mdi:user-group"/>Groepen</NuxtLink></li>
          <li><NuxtLink to="/leden"><Icon name="mdi:user-circle"/>Leden</NuxtLink></li>
          <li><NuxtLink to="/voorkeuren"><Icon name="mdi:checkbox-marked-circle-outline"/>Voorkeuren</NuxtLink></li>
          <li><NuxtLink to="/kwalificaties"><Icon name="mdi:certificate"/>Kwalificaties</NuxtLink></li>
          <li><NuxtLink to="/studies"><Icon name="mdi:book-open-page-variant"/>Studies</NuxtLink></li>
        </ul>
      </div>
    </div>

    <div class="toast toast-end">
      <template v-for="alert in messages.all" :key="alert">
        <div class="alert alert-error shadow-lg" v-if="alert.type === 'error'">
          <div>
            <span>{{ alert.text }}</span>
          </div>
        </div>
        <div class="alert alert-success shadow-lg" v-else-if="alert.type === 'success'">
          <div>
            <span>{{ alert.text }}</span>
          </div>
        </div>
        <div class="alert alert-info shadow-lg" v-else>
          <div>
            <span>{{ alert.text }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import useAlertStore from "../stores/useAlertStore";

const messages = useAlertStore();
</script>