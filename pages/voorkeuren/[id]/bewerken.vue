<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deletePreference"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
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
            :value="preferences.selected?.preferenceId"
            disabled
        >
          <option :value="preferences.selected?.preferenceId">{{ preferences.selected?.preference.name }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Voorkeur"
            name="value"
            :value="preferences.selected?.value"
        />
        <FormKit
            type="hidden"
            label="Lid"
            name="memberId"
            validation="required"
            :value="preferences.selected?.memberId"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useMemberPreferenceStore} from "~/stores/useMemberPreferenceStore";
import {useMemberStore} from "~/stores/useMemberStore";

const preferences = useMemberPreferenceStore();
const members = useMemberStore();

await preferences.init();
await members.init();

await preferences.select(useRoute().params.id as string);
await members.select(preferences.selected.memberId);

async function submit(data: MemberPreference) {
  if (await preferences.update(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}

async function deletePreference() {
  if (await preferences.delete()) {
    await navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>