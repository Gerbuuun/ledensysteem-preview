<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/voorkeuren`)"><Icon name="mdi:chevron-left"/>Terug naar voorkeuren</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deletePreference"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="preferenceOptionForm"
          type="form"
          :actions="false"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
            :value="preferences.selected?.name"
        />
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="preferences.selected?.associationId"
            disabled
        >
          <option :value="preferences.selected?.associationId">{{ preferences.selected?.association.name }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="preferences.selected?.description"
        />
        <FormKit
            type="submit"
            label="Opslaan"
            outer-class="$reset col-span-2"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useRoute } from "#app";
import {usePreferenceStore} from "~/stores/usePreferenceStore";

const preferences = usePreferenceStore();

await preferences.init();
await preferences.select(useRoute().params.id as string);

async function submit(data: Preference) {
  if (await preferences.update(data)) {
    navigateTo(`/voorkeuren`);
  }
}

async function deletePreference() {
  await preferences.delete();
  await navigateTo('/voorkeuren');
}
</script>