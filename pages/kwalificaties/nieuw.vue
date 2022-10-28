<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
      <FormKit
          id="qualificationForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="select"
            label="Kwalificatie"
            name="qualificationId"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een kwalificatie</option>
          <option v-for="a in qualificationOptions.all" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Opmerkingen"
            name="remarks"
        />
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
import {useMemberQualificationStore} from "~/stores/useMemberQualificationStore";
import {useQualificationStore} from "~/stores/useQualificationStore";
import {useMemberStore} from "~/stores/useMemberStore";

const qualifications = useMemberQualificationStore();
const qualificationOptions = useQualificationStore();
const members = useMemberStore();

await qualifications.init();
await qualificationOptions.init();
await members.init();

await members.select(useRoute().query.id as string);

async function submit(data: MemberQualification) {
  if (await qualifications.create(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>