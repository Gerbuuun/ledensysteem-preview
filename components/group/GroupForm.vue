<template>
  <v-card class="modal" flat>
    <FormKit
        id="groupForm"
        type="form"
        submit-label="Opslaan"
        :value="groups.selected"
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
            label="Beschrijving"
            name="description"
        />
        <FormKit
            type="checkbox"
            label="Is Actief"
            name="isActive"
        />
        <FormKit
            type="date"
            label="Oprichtingsdatum"
            name="startDate"
        />
        <FormKit
            type="date"
            label="Laatst Actief"
            name="lastActive"
        />
        <FormKit
            type="select"
            label="Leden"
            name="memberIds"
            validation="required|min:2"
        />
        <FormKit
            v-if="!groups.selectedId"
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            placeholder="Selecteer een vereniging"
            :options="associationOptions"
            @change="filterGroupTypes"
        />
        <FormKit
            v-if="!groups.selectedId"
            type="select"
            label="Groep-type"
            name="groupTypeId"
            validation="required"
            placeholder="Selecteer een groep-type"
            :options="groupTypeOptions"
            @change="filterGroupSubtypes"
        />
        <FormKit
            v-if="!groups.selectedId"
            type="select"
            label="Groep-subtype"
            name="groupSubtypeId"
            placeholder="Selecteer een groep-subtype"
            :options="groupSubtypeOptions"
        />
      </div>
    </FormKit>
  </v-card>
</template>

<script setup lang="ts">
import {useAssociationStore, useGroupSubtypeStore, useGroupTypeStore, useMemberStore} from "~/stores/useStore";
import {computed, ref} from "@vue/reactivity";

const groups = useMemberStore();
const types = useGroupTypeStore();
const subtypes = useGroupSubtypeStore();
const associations = useAssociationStore();
await groups.loadAll();
await types.loadAll();
await subtypes.loadAll();
await associations.loadAll();
const associationOptions = computed<{ value: string, label: string }[]>(() => associations.all.map(a => ({ value: a.id, label: a.name })));
const groupTypeOptions = ref<{ value: string, label: string, attrs?: any }[]>([{ value: null, label: 'Selecteer eerst een vereniging', attrs: { disabled: true } }]);
const groupSubtypeOptions = ref<{ value: string, label: string, attrs?: any }[]>([{ value: null, label: 'Selecteer eerst een groep-type', attrs: { disabled: true } }]);

function filterGroupTypes(event) {
  associations.select(event.target.value);
  groupTypeOptions.value = associations.selected.groupTypes.map(t => ({ value: t.id, label: t.name }));
}
function filterGroupSubtypes(event) {
  subtypes.select(event.target.value);
  groupTypeOptions.value = types.selected.subtypes.map(t => ({ value: t.id, label: t.name }));
}

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