<template>
  <div class="background">
    <everything-table class="card"></everything-table>
    <div class="toaster">
      <TransitionGroup name="alerts">
        <template
            v-for="alert in messages.all"
            :key="alert"
        >
          <v-alert :text="alert.text" :type="alert.type" density="compact" />
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import EverythingTable from "./components/EverythingTabs";
import useAlertStore from "./stores/useAlertStore";

const messages = useAlertStore();
</script>

<style scoped lang="sass">
.background
  background-color: gray
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

.card
  width: 90vw
  height: 80vh

.toaster
  position: absolute
  display: flex
  flex-direction: column
  gap: 0.5rem
  left: 1rem
  bottom: 1rem



.alerts-move, /* apply transition to moving elements */
.alerts-enter-active,
.alerts-leave-active
  transition: all 0.5s ease

.alerts-enter-from
  opacity: 0
  transform: translateY(30px)

.alerts-leave-to
  opacity: 0
  transform: translateX(-30px)

</style>