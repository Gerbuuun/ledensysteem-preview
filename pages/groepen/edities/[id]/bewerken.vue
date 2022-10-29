<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/groepen/${groups.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteEdition"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="groupEditionForm"
          type="form"
          :actions="false"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="hidden"
            label="Groep"
            name="groupId"
            validation="required"
            :value="editions.selected?.groupId"
        />
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
            :value="editions.selected?.name"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="editions.selected?.description"
        />
        <FormKit
            type="submit"
            label="Opslaan"
        />
        <FormKit
            type="checkbox"
            label="Is Actief"
            name="isActive"
            :value="editions.selected?.isActive"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {navigateTo, useRoute} from "#app";
import {useMemberStore} from "~/stores/useMemberStore";
import {useGroupStore} from "~/stores/useGroupStore";
import {useGroupMembershipStore} from "~/stores/useGroupMembershipStore";
import {useGroupEditionStore} from "~/stores/useGroupEditionStore";

const members = useMemberStore();
const groups = useGroupStore();
const editions = useGroupEditionStore();
const memberships = useGroupMembershipStore();
const dateConverter = useDateConverter();

await members.init();
await groups.init();
await memberships.init();
await editions.init();

await editions.select(useRoute().params.id as string);
await groups.select(editions.selected.groupId);

async function submit(data: GroupEdition) {
  if (await editions.update(data)) {
    await navigateTo(`/groepen/${groups.selectedId}`);
  }
}

async function deleteEdition() {
  if (await editions.delete()) {
    await navigateTo(`/groepen/${groups.selectedId}`);
  }
}
</script>