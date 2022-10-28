<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/kwalificaties`)"><Icon name="mdi:chevron-left"/>Terug naar kwalificaties</button>
    <Card>
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
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useQualificationStore } from "~/stores/useQualificationStore";
import { navigateTo } from "#app";

const qualifications = useQualificationStore();

async function submit(data: Qualification) {
  if (await qualifications.create(data)) {
    navigateTo(`/kwalificaties`);
  }
}
</script>