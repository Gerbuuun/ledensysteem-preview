<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo('/verenigingen')"><Icon name="mdi:chevron-left"/>Terug naar verenigingen</button>
    <Card>
      <h2 class="text-3xl">{{ associations.selected.name }}</h2>
      <table class="table table-normal w-full">
        <tbody>
        <tr>
          <td>ID</td>
          <td>{{ associations.selected.id }}</td>
        </tr>
        <tr>
          <td>Naam</td>
          <td>{{ associations.selected.name }}</td>
        </tr>
        <tr>
          <td>Beschrijving</td>
          <td>{{ associations.selected.description }}</td>
        </tr>
        <tr>
          <td>Oprichtingsdatum</td>
          <td>{{ dateConverter.toDateString(associations.selected.startDate) }}</td>
        </tr>
        <tr>
          <td>Ontbindingsdatum</td>
          <td>{{ dateConverter.toDateString(associations.selected.stopDate) }}</td>
        </tr>
        </tbody>
      </table>

      <div class="btn-group">
        <button class="btn gap-2" @click="navigateTo(`/verenigingen/${associations.selectedId}/bewerken`)"><Icon name="mdi:pencil" />Aanpassen</button>
        <button class="btn gap-2" @click="deleteAssociation"><Icon name="mdi:delete" />Verwijderen</button>
      </div>

      <div class="divider" />

      <h2 class="card-title">Lid typen</h2>
      <EntityTable
          :headings="['Naam', 'Meervoud', 'Beschrijving']"
          :store="memberTypes"
          :entities="memberTypes.all.filter(t => t.associationId === associations.selectedId)"
          :select-link="{ path: `/leden/typen/${memberTypes.selectedId}/bewerken` }"
          :form-link="{ path: '/leden/typen/nieuw', query: { id: associations.selectedId } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.plural }}</td>
        <td>{{ entity.description }}</td>
      </EntityTable>

      <div class="divider" />

      <h2 class="card-title">Groep typen</h2>
      <EntityTable
          :headings="['Naam', 'Meervoud', 'Beschrijving']"
          :store="groupTypes"
          :entities="groupTypes.all.filter(t => t.associationId === associations.selectedId)"
          :select-link="{ path: `/groepen/typen/${groupTypes.selectedId}/bewerken` }"
          :form-link="{ path: '/groepen/typen/nieuw', query: { id: associations.selectedId } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.plural }}</td>
        <td>{{ entity.description }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {useRoute, navigateTo} from "#app";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useMemberTypeStore} from "~/stores/useMemberTypeStore";
import {useGroupTypeStore} from "~/stores/useGroupTypeStore";

const associations = useAssociationStore();
const memberTypes = useMemberTypeStore();
const groupTypes = useGroupTypeStore();
const dateConverter = useDateConverter();

await associations.init();
await memberTypes.init();
await groupTypes.init();

await associations.select(useRoute().params.id as string);

async function deleteAssociation() {
  await navigateTo('/verenigingen');
  await associations.delete();
}
</script>