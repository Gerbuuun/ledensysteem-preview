<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="hero">
      <div class="hero-content text-center text-primary-content-100">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Groepen</h1>
          <p class="py-6">
            Een groep is een verzameling van 'lidmaatschappen' en 'edities'.
            Een 'editie' is een verzameling van leden binnen de groep.
            Neem bijvoorbeeld het bestuur. Dit is een groep leden die elk jaar verandert.
            In plaats van elk jaar weer een nieuwe groep aan te maken, is er nu maar één groep.
            Binnen de groep kun je dan aangeven, met behulp van een editie, van welk bestuur een persoon is.
          </p>
          <p>
            Via 'lidmaatschappen' verbinden we personen aan een groep.
            Hier kan dan aangegeven worden welke functie de persoon heeft, indien van toepassing welke editie, en van/tot welke datum deze persoon lid is/was.
          </p>
        </div>
      </div>
    </div>

    <Card>
      <EntityTable
          :headings="['Naam', 'Type', 'Vereniging', 'Is Actief']"
          :store="groups"
          :entities="groups.all"
          :select-link="`/groepen/${groups.selectedId}`"
          :form-link="'/groepen/nieuw'"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.type.name }}</td>
        <td>{{ entity.association.name }}</td>
        <td><Icon :name="entity.isActive ? 'mdi:check' : 'mdi:cross'" /></td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useGroupStore} from "~/stores/useGroupStore";

const groups = useGroupStore();

await groups.init();
</script>