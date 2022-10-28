<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
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
            @change="associations.select($event.target.value)"
        >
          <option value="" selected disabled>Selecteer een vereniging</option>
          <option v-for="a in associations.all" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Lid-type"
            name="memberTypeId"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een lid-type</option>
          <option v-for="a in types.all.filter(t => t.associationId === associations.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="date"
            label="Sinds"
            name="startDate"
            validation="required"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Tot"
            name="stopDate"
            max="9999-12-31"
        />
        <FormKit
            type="hidden"
            label="Member"
            name="memberId"
            :value="members.selectedId"
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

await members.select(useRoute().query.id as string);

async function submit(data: AssociationMembership) {
  if (await memberships.create(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>