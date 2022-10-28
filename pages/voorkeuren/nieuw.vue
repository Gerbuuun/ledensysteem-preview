<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
      <FormKit
          id="preferenceForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="select"
            label="Type"
            name="preferenceId"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een voorkeur</option>
          <option v-for="a in preferenceOptions.all" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Voorkeur"
            name="value"
        />
        <FormKit
            type="hidden"
            label="Lid"
            name="memberId"
            validation="required"
            :value="members.selectedId"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useMemberPreferenceStore} from "~/stores/useMemberPreferenceStore";
import {usePreferenceStore} from "~/stores/usePreferenceStore";
import {useMemberStore} from "~/stores/useMemberStore";

const preferences = useMemberPreferenceStore();
const preferenceOptions = usePreferenceStore();
const members = useMemberStore();

await preferences.init();
await preferenceOptions.init();
await members.init();

await members.select(useRoute().query.id as string);

async function submit(data: MemberPreference) {
  if (await preferences.create(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>