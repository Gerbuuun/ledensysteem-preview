<template>
  <div class="grid grid-cols-1 gap-2">
    <div class="btn-group">
      <button class="btn gap-2" @click="reload"><Icon name="mdi:refresh" />Vernieuwen</button>
      <button class="btn gap-2" @click="create"><Icon name="mdi:plus" />Nieuw</button>
    </div>

    <table class="table table-compact w-full">
      <thead>
      <tr>
        <th v-for="h in headings" :key="h">{{ h }}</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="entity in entities.slice(page * pageSize, (page + 1) * pageSize)"
          :key="entity.id"
          @click="select(entity.id)"
          class="hover"
      >
        <slot :entity="entity">
          <td v-for="h in headings" :key="h">No Data Specified</td>
        </slot>
      </tr>
      <tr v-if="entities.length < 1">
        <td v-for="h in headings" :key="h">-</td>
      </tr>
      </tbody>
    </table>

    <div class="btn-group" v-if="entities.length > pageSize">
      <button class="btn" @click="page--" :disabled="page <= 0">Vorige</button>
      <button class="btn" @click="page++" :disabled="(page + 1) * pageSize > entities.length">Volgende</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {navigateTo} from "#app";
import {RouteLocationRaw} from "vue-router";

const props = defineProps<{
  store: any,
  entities: any[],
  headings: string[],
  formLink: RouteLocationRaw,
  selectLink: RouteLocationRaw,
}>();

const pageSize = ref(15);
const page = ref(0);

async function select(id: string) {
  await props.store.select(id);
  await navigateTo(props.selectLink);
}

async function create() {
  await navigateTo(props.formLink);
}

async function reload() {
  await props.store.reload();
}
</script>