<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteMembership"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="associationMembershipForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="memberships.selected?.associationId"
            disabled
        >
          <option :value="memberships.selected?.associationId">{{ memberships.selected?.association.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Lid-type"
            name="memberTypeId"
            validation="required"
            :value="memberships.selected?.memberTypeId"
        >
          <option v-for="a in types.all.filter(t => t.associationId === memberships.selected?.associationId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="date"
            label="Sinds"
            name="startDate"
            validation="required"
            :value="dateConverter.toFormkitString(memberships.selected?.startDate)"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Tot"
            name="stopDate"
            :value="dateConverter.toFormkitString(memberships.selected?.stopDate)"
            max="9999-12-31"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {navigateTo, useRoute} from "#app";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useMemberTypeStore} from "~/stores/useMemberTypeStore";
import {useMemberStore} from "~/stores/useMemberStore";
import {useAssociationMembershipStore} from "~/stores/useAssociationMembershipStore";

const associations = useAssociationStore();
const members = useMemberStore();
const types = useMemberTypeStore();
const memberships = useAssociationMembershipStore();
const dateConverter = useDateConverter();

await associations.init();
await members.init();
await types.init();
await memberships.init();

await memberships.select(useRoute().params.id as string);
await members.select(memberships.selected.memberId);

async function submit(data: AssociationMembership) {
  if (await memberships.update(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}

async function deleteMembership() {
  if (await memberships.delete()) {
    await navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>