<template>
  <v-card class="modal" flat>
    <FormKit
        id="groupTypeForm"
        type="form"
        submit-label="Opslaan"
        @submit="submit"
    >
      <div class="form">
        <FormKit
            type="text"
            label="Naam"
            name="name"
            :value="groupTypes.selected.name"
            validation="required"
        />
        <FormKit
            type="text"
            label="Meervoud"
            name="plural"
            :value="groupTypes.selected.plural"
            validation="required"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="groupTypes.selected.description"
        />
        <FormKit
            type="hidden"
            name="associationId"
            validation="required"
            :value="associations.selectedId"
        />
      </div>
    </FormKit>
  </v-card>
</template>

<script setup lang="ts">
import {useAssociationStore, useGroupTypeStore} from "~/stores/useStore";

const groupTypes = useGroupTypeStore();
const associations= useAssociationStore();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

async function submit(data: GroupType) {
  await groupTypes.submit(data);
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