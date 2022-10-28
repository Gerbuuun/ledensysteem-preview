<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug</button>
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
            :value="associations.selected.name"
            validation="required"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="associations.selected.description"
        />
        <FormKit
            type="date"
            label="Oprichtingsdatum"
            name="startDate"
            :value="dateConverter.toFormkitString(associations.selected.startDate)"
            validation="required"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Ontbindingsdatum"
            name="stopDate"
            :value="dateConverter.toFormkitString(associations.selected.stopDate)"
            max="9999-12-31"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useAssociationStore} from "~/stores/useAssociationStore";
import {navigateTo, useRoute} from "#app";
import {useDateConverter} from "~/composables/useDateConverter";

const associations = useAssociationStore();
const dateConverter = useDateConverter();

await associations.init();
await associations.select(useRoute().params.id as string);

async function submit(data: Association) {
  if (await associations.update(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>