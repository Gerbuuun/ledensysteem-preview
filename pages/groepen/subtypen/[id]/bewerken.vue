<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar Vereniging</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteType"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="groupSubtypeForm"
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
            :value="groupSubtypes.selected?.name"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="groupSubtypes.selected?.description"
        />
        <FormKit
            type="select"
            label="Groep-type"
            name="associationId"
            validation="required"
            :value="groupSubtypes.selected?.groupTypeId"
        >
          <option v-for="t in groupTypes.all.filter(a => a.associationId === associations.selectedId)" :key="t.id" :value="t.id">{{ t.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="groupSubtypes.selected?.associationId"
            disabled
        >
          <option :value="groupSubtypes.selected?.associationId" selected>{{ associations.selected?.name }}</option>
        </FormKit>
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useGroupTypeStore} from "~/stores/useGroupTypeStore";
import {useGroupSubtypeStore} from "~/stores/useGroupSubtypeStore";

const associations= useAssociationStore();
const groupTypes = useGroupTypeStore();
const groupSubtypes = useGroupSubtypeStore();

await associations.init();
await groupTypes.init();
await groupSubtypes.init();

await groupSubtypes.select(useRoute().params.id as string);
await associations.select(groupSubtypes.selected.associationId);

async function submit(data: GroupSubtype) {
  if (await groupSubtypes.update(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}

async function deleteType() {
  if (await groupSubtypes.delete()) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>