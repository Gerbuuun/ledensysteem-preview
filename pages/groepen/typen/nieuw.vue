<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar Vereniging</button>
    <Card>
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
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="associations.selectedId"
            disabled
        >
          <option :value="associations.selectedId">{{ associations.selected.name }}</option>
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
await associations.select(useRoute().query.id as string);

async function submit(data: GroupType) {
  if (await groupTypes.create(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>
