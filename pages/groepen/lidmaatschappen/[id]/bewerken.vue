<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(url)"><Icon name="mdi:chevron-left"/>Terug</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteMembership"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="groupMembershipForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="select"
            label="Groep"
            name="groupId"
            validation="required"
            :value="memberships.selected?.groupId"
            disabled
        >
          <option :value="memberships.selected?.groupId" selected>{{ groups.selected.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Lid"
            name="memberId"
            validation="required"
            :value="memberships.selected?.memberId"
            disabled
        >
          <option :value="memberships.selected?.memberId" selected>{{ members.selected.firstName }} {{ members.selected.insertion }} {{ members.selected.lastName }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Functie"
            name="function"
            :value="memberships.selected?.function"
        />
        <FormKit
            type="select"
            label="Editie"
            name="editionId"
            :value="memberships.selected?.editionId ?? undefined"
        >
          <option value="">Geen</option>
          <option v-for="a in editions.all.filter(e => e.groupId === groups.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="date"
            label="Sinds"
            name="startDate"
            validation="required"
            max="9999-12-31"
            :value="dateConverter.toFormkitString(memberships.selected?.startDate)"
        />
        <FormKit
            type="date"
            label="Tot"
            name="stopDate"
            max="9999-12-31"
            :value="dateConverter.toFormkitString(memberships.selected?.stopDate)"
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
import {computed} from "@vue/reactivity";

const members = useMemberStore();
const groups = useGroupStore();
const memberships = useGroupMembershipStore();
const editions = useGroupEditionStore();
const dateConverter = useDateConverter();

await members.init();
await groups.init();
await memberships.init();
await editions.init();

await memberships.select(useRoute().params.id as string);
await members.select(memberships.selected.memberId);
await groups.select(memberships.selected.groupId);
await editions.select(memberships.selected.editionId ?? null);

const url = computed(() => useRoute().query.from === 'groepen' ? `/groepen/${groups.selectedId}` : `/leden/${members.selectedId}`);

async function submit(data: GroupMembership) {
  if (await memberships.update(data)) {
    await navigateTo(url.value);
  }
}

async function deleteMembership() {
  if (await memberships.delete()) {
    await navigateTo(url.value);
  }
}
</script>