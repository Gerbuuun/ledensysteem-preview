<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar Vereniging</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteType"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="groupTypeForm"
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
            :value="groupTypes.selected?.name"
        />
        <FormKit
            type="text"
            label="Meervoud"
            name="plural"
            validation="required"
            :value="groupTypes.selected?.plural"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="groupTypes.selected?.description"
        />
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="groupTypes.selected?.associationId"
            disabled
        >
          <option :value="groupTypes.selected?.associationId">{{ associations.selected.name }}</option>
        </FormKit>
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useGroupTypeStore} from "~/stores/useGroupTypeStore";

const associations= useAssociationStore();
const groupTypes = useGroupTypeStore();

await associations.init();
await groupTypes.init();

await groupTypes.select(useRoute().params.id as string);
await associations.select(groupTypes.selected.associationId);

async function submit(data: GroupType) {
  if (await groupTypes.update(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}

async function deleteType() {
  if (await groupTypes.delete()) {
    await navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>
