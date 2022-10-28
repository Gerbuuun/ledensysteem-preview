<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar lid</button>
    <Card>
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
        />
        <FormKit
            type="date"
            label="Start"
            name="startDate"
            validation="required"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Eind"
            name="stopDate"
            max="9999-12-31"
        />
        <FormKit
            type="select"
            label="Studie"
            name="studyId"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een studie</option>
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
            :value="members.selectedId"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {navigateTo, useRoute} from "#app";
import {useMemberStore} from "~/stores/useMemberStore";
import {useMemberStudyStore} from "~/stores/useMemberStudyStore";
import {useStudyStore} from "~/stores/useStudyStore";

const members = useMemberStore();
const studies = useMemberStudyStore();
const studyOptions = useStudyStore();

await members.init();
await studies.init();
await studyOptions.init();

await members.select(useRoute().query.id as string);

async function submit(data: MemberType) {
  if (await studies.create(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>
