<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo('/studies')"><Icon name="mdi:chevron-left"/>Terug naar Studies</button>
    <Card>
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
        />
        <FormKit
            type="select"
            label="Niveau"
            name="level"
            validation="required"
        >
          <option value="" selected disabled>Selecteer een niveau</option>
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
        >
          <option value="" selected disabled>Selecteer een institutie</option>
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
import {navigateTo} from "#app";

const studies = useStudyStore();

await studies.init();

async function submit(data: Study) {
  if (await studies.create(data)) {
    navigateTo('/studies');
  }
}
</script>
