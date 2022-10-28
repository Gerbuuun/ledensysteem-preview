<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/kwalificaties`)"><Icon name="mdi:chevron-left"/>Terug naar kwalificaties</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteQualification"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="qualificationOptionForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
            :value="qualifications.selected?.name"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="qualifications.selected?.description"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useQualificationStore } from "~/stores/useQualificationStore";
import { navigateTo, useRoute } from "#app";

const qualifications = useQualificationStore();

await qualifications.init();
await qualifications.select(useRoute().params.id as string);

async function submit(data: Qualification) {
  if (await qualifications.update(data)) {
    navigateTo(`/kwalificaties`);
  }
}

async function deleteQualification() {
  await qualifications.delete();
  await navigateTo('/kwalificaties');
}
</script>