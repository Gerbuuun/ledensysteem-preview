<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="hero">
      <div class="hero-content text-center text-primary-content-100">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Voorkeuren</h1>
          <p class="py-6">
            Voorkeuren spreekt voor zich.
            Leden kunnen voor bepaalde dingen aangeven wat hun voorkeur is.
            Voor elke vereniging kan worden aangegeven welke dingen dat zijn.
          </p>
          <p>
            Voor Oud Proteus-Eretes zou je een optie kunnen geven 'Ik wil het venster ontvangen' of 'Proteus-Eretes mag contact met mij opnemen voor acquisitie'.
            Elk lid van Oud Proteus-Eretes kan dan zelf aangeven of hij/zij dit wilt of niet.
          </p>
          <p class="pt-6">
            Voor Proteus-Eretes zou de optie 'Ik ben beschikbaar als stuur' handig kunnen zijn voor ervaren wedstrijdstuurtjes.
            Dan is deze informatie centraal beschikbaar i.p.v. dat door elke sectie een lijst wordt bijgehouden.
          </p>
        </div>
      </div>
    </div>

    <Card>
      <EntityTable
          :headings="['Naam', 'Beschrijving', 'Vereniging']"
          :store="preferences"
          :entities="preferences.all"
          :select-link="{ path: `/voorkeuren/opties/${preferences.selectedId}/bewerken` }"
          :form-link="{ path: '/voorkeuren/opties/nieuw' }"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.description }}</td>
        <td>{{ entity.association.name }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {usePreferenceStore} from "~/stores/usePreferenceStore";

const preferences = usePreferenceStore();

await preferences.init();
</script>