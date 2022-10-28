<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/voorkeuren`)"><Icon name="mdi:chevron-left"/>Terug naar voorkeuren</button>
    <Card>
      <FormKit
          id="preferenceOptionForm"
          type="form"
          :actions="false"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            validation="required"
        />
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een vereniging</option>
          <option v-for="a in associations.all" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
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
import {useAssociationStore} from "~/stores/useAssociationStore";

const preferences = usePreferenceStore();
const associations = useAssociationStore();

await preferences.init();
await preferences.select(useRoute().params.id as string);
await associations.init();

async function submit(data: Preference) {
  if (await preferences.create(data)) {
    navigateTo(`/voorkeuren`);
  }
}
</script>