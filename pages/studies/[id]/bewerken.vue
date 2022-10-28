<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteStudy"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>
      <FormKit
          id="studyForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Studienummer"
            name="studyNumber"
            :value="studies.selected?.studyNumber"
        />
        <FormKit
            type="date"
            label="Start"
            name="startDate"
            validation="required"
            :value="dateConverter.toFormkitString(studies.selected?.startDate)"
        />
        <FormKit
            type="date"
            label="Eind"
            name="stopDate"
            :value="dateConverter.toFormkitString(studies.selected?.stopDate)"
        />
        <FormKit
            type="select"
            label="Studie"
            name="studyId"
            validation="required"
            :value="studies.selected?.studyId"
        >
          <option value="" disabled>Selecteer een studie</option>
          <optgroup label="Bachelor of Science">
            <option v-for="s in studyOptions.all.filter(a => a.level === 'Bachelor of Science')" :key="s.id" :value="s.id">{{ s.name }} - {{ s.institution }}</option>
          </optgroup>
          <optgroup label="Master of Science">
            <option v-for="s in studyOptions.all.filter(a => a.level === 'Master of Science')" :key="s.id" :value="s.id">{{ s.name }} - {{ s.institution }}</option>
          </optgroup>
          <optgroup label="Anders">
            <option v-for="s in studyOptions.all.filter(a => a.level !== 'Master of Science' && a.level !== 'Bachelor of Science')" :key="s.id" :value="s.id">{{ s.level }} - {{ s.name }} - {{ s.institution }}</option>
          </optgroup>
        </FormKit>
        <FormKit
            type="hidden"
            label="Lid"
            name="memberId"
            validation="required"
            :value="studies.selected?.memberId"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useDateConverter} from "~/composables/useDateConverter";
import {useMemberStore} from "~/stores/useMemberStore";
import {useMemberStudyStore} from "~/stores/useMemberStudyStore";
import {useStudyStore} from "~/stores/useStudyStore";

const members = useMemberStore();
const studies = useMemberStudyStore();
const studyOptions = useStudyStore();
const dateConverter = useDateConverter();

await members.init();
await studies.init();
await studyOptions.init();

await studies.select(useRoute().params.id as string);
await members.select(studies.selected.memberId);

async function submit(data: MemberType) {
  if (await studies.update(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}

async function deleteStudy() {
  await studies.delete();
  await navigateTo(`/leden/${members.selectedId}`);
}
</script>
