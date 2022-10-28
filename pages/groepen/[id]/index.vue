<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/groepen`)"><Icon name="mdi:chevron-left"/>Terug naar groepen</button>
    <Card>
      <h2 class="text-3xl">{{ groups.selected.name }}</h2>
      <table class="table table-normal w-full">
        <tbody>
        <tr>
          <td>ID</td>
          <td>{{ groups.selected.id }}</td>
        </tr>
        <tr>
          <td>Naam</td>
          <td>{{ groups.selected.name }}</td>
        </tr>
        <tr>
          <td>Beschrijving</td>
          <td>{{ groups.selected.description }}</td>
        </tr>
        <tr>
          <td>Oprichtingsdatum</td>
          <td>{{ dateConverter.toDateString(groups.selected.startDate) }}</td>
        </tr>
        <tr>
          <td>Laatst Actief</td>
          <td>{{ dateConverter.toDateString(groups.selected.lastActive) }}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{{ groups.selected.type.name }}</td>
        </tr>
        <tr>
          <td>Subtype</td>
          <td>{{ groups.selected.subtype?.name ?? '-' }}</td>
        </tr>
        <tr>
          <td>Vereniging</td>
          <td>{{ groups.selected.association.name }}</td>
        </tr>
        </tbody>
      </table>

      <div class="btn-group">
        <button class="btn gap-2" @click="navigateTo(`/groepen/${groups.selectedId}/bewerken`)"><Icon name="mdi:pencil"/>Aanpassen</button>
        <button class="btn gap-2" @click="deleteGroup"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>

      <div class="divider" />

      <h2 class="card-title">Lidmaatschappen</h2>
      <EntityTable
          :headings="['Lid', 'Editie', 'Functie', 'Sinds', 'Tot']"
          :store="memberships"
          :entities="memberships.all.filter(m => m.groupId === groups.selectedId)"
          :select-link="{ path: `/groepen/lidmaatschappen/${memberships.selectedId}/bewerken`, query: { from: 'groepen' } }"
          :form-link="{ path: '/groepen/lidmaatschappen/nieuw', query: { from: 'groepen', id: groups.selectedId } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.member.firstName }} {{ entity.member.insertion }} {{ entity.member.lastName }}</td>
        <td>{{ entity.edition?.name ?? '-' }}</td>
        <td>{{ entity.function ?? '-' }}</td>
        <td>{{ dateConverter.toDateString(entity.startDate) }}</td>
        <td>{{ dateConverter.toDateString(entity.stopDate) }}</td>
      </EntityTable>

      <div class="divider" />

      <h2 class="card-title">Edities</h2>
      <EntityTable
          :headings="['Naam', 'Beschrijving', 'Is Actief']"
          :store="editions"
          :entities="editions.all.filter(e => e.groupId === groups.selectedId)"
          :select-link="{ path: `/groepen/edities/${editions.selectedId}/bewerken` }"
          :form-link="{ path: '/groepen/edities/nieuw', query: { id: groups.selectedId } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.name }}</td>
        <td>{{ entity.description }}</td>
        <td><Icon :name="entity.isActive ? 'mdi:check' : 'mdi:close'" /></td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {navigateTo, useRoute} from "#app";
import {useGroupStore} from "~/stores/useGroupStore";
import {useGroupMembershipStore} from "~/stores/useGroupMembershipStore";
import {useGroupEditionStore} from "~/stores/useGroupEditionStore";

const groups = useGroupStore();
const memberships = useGroupMembershipStore();
const editions = useGroupEditionStore();
const dateConverter = useDateConverter();

await groups.init();
await memberships.init();
await editions.init();
await groups.select(useRoute().params.id as string);

async function deleteGroup() {
  await navigateTo('/groepen');
  await groups.delete();
}
</script>