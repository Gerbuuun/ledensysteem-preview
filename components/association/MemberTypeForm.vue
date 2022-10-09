<template>
  <v-card class="modal" flat>
    <FormKit
        id="memberTypeForm"
        type="form"
        submit-label="Opslaan"
        :value="memberTypes.selected"
        @submit="submit"
    >
      <div class="form">
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
        />
        <FormKit
            type="text"
            label="Meervoud"
            name="plural"
            validation="required"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
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
import {useAssociationStore, useMemberTypeStore} from "~/stores/useStore";

const memberTypes = useMemberTypeStore();
const associations = useAssociationStore();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

async function submit(data: MemberType) {
  await memberTypes.submit(data);
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