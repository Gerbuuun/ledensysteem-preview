<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteQualification"><Icon name="mdi:delete" />Verwijderen</button>
      </div>
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
            :value="qualifications.selected?.qualificationId"
            disabled
        >
          <option :value="qualifications.selected?.qualificationId">{{ qualificationOptions.selected.name }}</option>
        </FormKit>
        <FormKit
            type="text"
            label="Opmerkingen"
            name="remarks"
            :value="qualifications.selected?.remarks"
        />
        <FormKit
            type="date"
            label="Sinds"
            name="startDate"
            validation="required"
            :value="dateConverter.toFormkitString(qualifications.selected?.startDate)"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Tot"
            name="stopDate"
            :value="dateConverter.toFormkitString(qualifications.selected?.stopDate)"
            max="9999-12-31"
        />
        <FormKit
            type="hidden"
            label="Lid"
            name="memberId"
            validation="required"
            :value="qualifications.selected?.memberId"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useDateConverter} from "~/composables/useDateConverter";
import {useMemberQualificationStore} from "~/stores/useMemberQualificationStore";
import {useQualificationStore} from "~/stores/useQualificationStore";
import {useMemberStore} from "~/stores/useMemberStore";

const qualifications = useMemberQualificationStore();
const qualificationOptions = useQualificationStore();
const members = useMemberStore();
const dateConverter = useDateConverter();

await qualifications.init();
await qualificationOptions.init();
await members.init();

await qualifications.select(useRoute().params.id as string);
await qualificationOptions.select(qualifications.selected.qualificationId);
await members.select(qualifications.selected.memberId);

async function submit(data: MemberQualification) {
  if (await qualifications.update(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}

async function deleteQualification() {
  if (await qualifications.delete()) {
    await navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>