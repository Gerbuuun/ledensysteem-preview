<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="hero">
      <div class="hero-content text-center text-primary-content-100">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Leden</h1>
          <p class="py-6">
            Een lid is een persoon.<br/>
            Deze persoon heeft persoonsgegevens zoals email, telefoon, adres, etc.
            Ook kan een persoon 'studies', 'voorkeuren', 'kwalificaties', 'contactpersonen', en 'socials' hebben.
            Elk van deze wordt uitgelegd onder de desbetreffende pagina's.
            Daarnaast kan een persoon lidmaatschappen aan verenigingen of groepen hebben.
          </p>
          <p>
            Via 'lidmaatschappen' verbinden we personen aan een vereniging.
            Hier kan dan aangegeven worden welk type lid de persoon is en van/tot welke datum deze persoon lid is/was.
          </p>
          <p class="py-6">
            Klik op een van de leden om meer informatie te zien.
          </p>
        </div>
      </div>
    </div>

    <Card>
      <EntityTable
          :headings="['Naam', 'Email', 'Telefoon', 'Adres', 'Plaats']"
          :store="members"
          :entities="members.all"
          :select-link="`/leden/${members.selectedId}`"
          form-link="/leden/nieuw"
          v-slot="{ entity }"
      >
        <td>{{ entity.firstName }} {{ entity.insertion ?? '' }} {{ entity.lastName }}</td>
        <td>{{ entity.email }}</td>
        <td>{{ entity.phoneNumber }}</td>
        <td>{{ entity.address }} {{ entity.number }}</td>
        <td>{{ entity.city }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useMemberStore} from "~/stores/useMemberStore";
import EntityTable from "~/components/EntityTable.vue";

const members = useMemberStore();

await members.init();
</script>