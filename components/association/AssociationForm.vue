<template>
  <v-card class="modal" flat>
    <FormKit
        id="associationForm"
        type="form"
        submit-label="Opslaan"
        @submit="submit"
    >
      <div class="form">
        <FormKit
            type="text"
            label="Naam"
            name="name"
            :value="associations.selected.name"
            validation="required"
            wrapper-class="input"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="associations.selected.description"
            wrapper-class="input"
        />
        <FormKit
            type="date"
            label="Oprichtingsdatum"
            name="startDate"
            :value="associations.selected.startDate"
            validation="required"
            wrapper-class="input"
        />
        <FormKit
            type="date"
            label="Ontbindingsdatum"
            name="stopDate"
            :value="associations.selected.stopDate"
            wrapper-class="input"
        />
      </div>
    </FormKit>
  </v-card>
</template>

<script setup lang="ts">
import {useAssociationStore} from "~/stores/useStore";

const associations = useAssociationStore();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

async function submit(data: Association) {
  await associations.submit(data);
  emit('submit');
}
</script>

<style scoped lang="sass">
.modal
  width: 100%
  padding: 1rem

.form
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: repeat(2, 1fr)
  grid-column-gap: 1rem
  grid-row-gap: 0

.input
  max-width: 100% !important
</style>