<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen`)"><Icon name="mdi:chevron-left"/>Terug naar Verenigingen</button>
    <Card>
      <FormKit
          id="associationForm"
          name="associationForm"
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
        <FormKit
            type="date"
            label="Oprichtingsdatum"
            name="startDate"
            validation="required"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Ontbindingsdatum"
            name="stopDate"
            max="9999-12-31"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useAssociationStore} from "~/stores/useAssociationStore";
import {navigateTo} from "#app";

const associations = useAssociationStore();

await associations.init();

async function submit(data: Association) {
  if (await associations.create(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>