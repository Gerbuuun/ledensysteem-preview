<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar Vereniging</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteType"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="memberTypeForm"
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
            :value="memberTypes.selected?.name"
        />
        <FormKit
            type="text"
            label="Meervoud"
            name="plural"
            validation="required"
            :value="memberTypes.selected?.plural"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="memberTypes.selected?.description"
        />
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="memberTypes.selected?.associationId"
            disabled
        >
          <option :value="memberTypes.selected?.associationId">{{ associations.selected.name }}</option>
        </FormKit>
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useMemberTypeStore} from "~/stores/useMemberTypeStore";

const associations = useAssociationStore();
const memberTypes = useMemberTypeStore();

await associations.init();
await memberTypes.init();

await memberTypes.select(useRoute().params.id as string);
await associations.select(memberTypes.selected.associationId);

async function submit(data: MemberType) {
  if (await memberTypes.update(data)) {
    navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}

async function deleteType() {
  if (await memberTypes.delete()) {
    await navigateTo(`/verenigingen/${associations.selectedId}`);
  }
}
</script>
