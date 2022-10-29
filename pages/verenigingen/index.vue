<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="hero">
      <div class="hero-content text-center text-primary-content-100">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Verenigingen</h1>
          <p class="py-6">
            Een vereniging is een verzameling van 'groepen' en 'lidmaatschappen'.
            Denk bij 'groepen' aan ploegen, commissies, jaargroepen, of wat je ook maar kunt verzinnen.
            Voor elke vereniging kan aangegeven worden welke type groepen er bestaan binnen de vereniging.
          </p>
          <p>
            Via 'lidmaatschappen' verbinden we personen aan een vereniging.
            Hier kan dan aangegeven worden welk type lid de persoon is en van/tot welke datum deze persoon lid is/was.
          </p>
          <p class="py-6">
            Klik op Proteus-Eretes om een uitgebreid voorbeeld te zien.
          </p>
        </div>
      </div>
    </div>

    <Card>
      <EntityTable
          :headings="['Naam', 'Beschrijving', 'Oprichting', 'Ontbinding']"
          :store="associations"
          :entities="associations.all"
          :select-link="{ path: `/verenigingen/${associations.selectedId}` }"
          :form-link="{ path: '/verenigingen/nieuw' }"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.description }}</td>
        <td>{{ dateConverter.toDateString(entity.startDate) }}</td>
        <td>{{ dateConverter.toDateString(entity.stopDate) }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "~/components/Card.vue";
import { useDateConverter } from "~/composables/useDateConverter";
import { useAssociationStore } from "~/stores/useAssociationStore";

const associations = useAssociationStore();
const dateConverter = useDateConverter();

await associations.init();
</script>