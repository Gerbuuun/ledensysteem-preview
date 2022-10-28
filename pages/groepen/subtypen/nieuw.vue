<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar Vereniging</button>
    <Card>
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
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
        />
        <FormKit
            type="select"
            label="Type"
            name="groupTypeId"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een groep-type</option>
          <option v-for="t in groupTypes.all.filter(a => a.associationId === associations.selectedId)" :key="t.id" :value="t.id">{{ t.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="associations.selectedId"
            disabled
        >
          <option :value="associations.selectedId" selected>{{ associations.selected.name }}</option>
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

await associations.select(useRoute().query.id as string);

async function submit(data: GroupSubtype) {
  if (await groupSubtypes.create(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>