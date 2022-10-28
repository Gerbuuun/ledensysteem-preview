<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(url)"><Icon name="mdi:chevron-left"/>Terug</button>
    <Card>
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
            :value="groups.selectedId ?? ''"
        >
          <option value="" selected disabled>Selecteer een groep</option>
          <option v-for="a in groups.all" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Lid"
            name="memberId"
            validation="required"
            :value="members.selectedId ?? ''"
        >
          <option value="" disabled>Selecteer een lid</option>
          <option v-for="a in members.all" :key="a.id" :value="a.id">{{ a.firstName }} {{ a.insertion }} {{ a.lastName }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Functie"
            name="function"
        />
        <FormKit
            type="select"
            label="Editie"
            name="editionId"
        >
          <option value="" selected>Geen</option>
          <option v-for="a in editions.all.filter(e => e.groupId === groups.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
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

if (useRoute().query.from === 'groepen') {
  await groups.select(useRoute().query.id as string);
  await members.select(null);
} else {
  await members.select(useRoute().query.id as string);
  await groups.select(null);
}

const url = computed(() => useRoute().query.from === 'groepen' ? `/groepen/${groups.selectedId}` : `/leden/${members.selectedId}`);

async function submit(data: GroupMembership) {
  if (await memberships.create(data)) {
    navigateTo(url.value);
  }
}
</script>