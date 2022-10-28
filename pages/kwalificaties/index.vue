<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="hero">
      <div class="hero-content text-center text-primary-content-100">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Kwalificaties</h1>
          <p class="py-6">
            Kwalificaties zijn diploma's, certificaten, of interne checks.
            Hieronder vallen bijvoorbeeld: EHBO, BHV, Vaarbewijs, etc.
            Maar dus ook checks die intern worden bijgehouden.
            Bijvoorbeeld: Skifftest of Materiaal Cursus.
          </p>
        </div>
      </div>
    </div>

    <Card>
      <EntityTable
          :headings="['Naam', 'Beschrijving']"
          :store="qualifications"
          :entities="qualifications.all"
          :select-link="`/kwalificaties/opties/${qualifications.selectedId}/bewerken`"
          form-link="/kwalificaties/opties/nieuw"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.description }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useQualificationStore} from "~/stores/useQualificationStore";
import {useDateConverter} from "~/composables/useDateConverter";

const qualifications = useQualificationStore();
const dateConverter = useDateConverter();

await qualifications.init();
</script>