<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo('/studies')"><Icon name="mdi:chevron-left"/>Terug naar Studies</button>
    <Card>
      <div class="btn-group">
        <button class="btn gap-2" @click="deleteStudy"><Icon name="mdi:chevron-left"/>Verwijderen</button>
      </div>
      <FormKit
          id="studyOptionForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
            :value="studies.selected?.name"
        />
        <FormKit
            type="select"
            label="Niveau"
            name="level"
            validation="required"
            :value="studies.selected?.level"
        >
          <option>Associate Degree</option>
          <option>Bachelor of Science</option>
          <option>Master of Science</option>
          <option>Bachelor of Arts</option>
          <option>Master of Arts</option>
          <option>Bachelor of Laws</option>
          <option>Master of Laws</option>
          <option>Doctoraat</option>
        </FormKit>
        <FormKit
            type="select"
            label="Institutie"
            name="institution"
            validation="required"
            :value="studies.selected?.institution"
        >
          <option>Technische Universiteit Delft</option>
          <option>Haagse Hogeschool</option>
          <option>Hogeschool InHolland</option>
          <option>Universiteit Leiden</option>
          <option>Erasmus Universiteit</option>
        </FormKit>
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useStudyStore} from "~/stores/useStudyStore";
import {navigateTo, useRoute} from "#app";

const studies = useStudyStore();

await studies.init();
await studies.select(useRoute().params.id as string);

async function submit(data: Study) {
  if (await studies.update(data)) {
    navigateTo('/studies');
  }
}

async function deleteStudy() {
  if (await studies.delete()) {
    await navigateTo('/studies');
  }
}
</script>
