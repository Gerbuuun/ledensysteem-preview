<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="hero">
      <div class="hero-content text-center text-primary-content-100">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Studies</h1>
          <p class="py-6">
            Een 'studie' is een studie die je kunt volgen (of kon volgen) aan een instituut.
            Voor nu zijn er alleen de studies van de TU Delft toegevoegd maar alles is mogelijk.
          </p>
        </div>
      </div>
    </div>

    <Card>
      <EntityTable
          :headings="['Naam', 'Niveau', 'Institutie']"
          :store="studies"
          :entities="studies.all"
          :select-link="`/studies/opties/${studies.selectedId}/bewerken`"
          form-link="/studies/opties/nieuw"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.level }}</td>
        <td>{{ entity.institution }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useStudyStore} from "~/stores/useStudyStore";

const studies = useStudyStore();

await studies.init();
</script>