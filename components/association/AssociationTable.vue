<template>
  <v-btn-group>
    <v-btn @click="openForm(true)" prepend-icon="mdi-plus">Nieuw</v-btn>
    <v-btn @click="openForm(false)" prepend-icon="mdi-pencil" :disabled="!associations.selectedId">Aanpassen</v-btn>
    <v-btn @click="associations.delete" prepend-icon="mdi-delete" :disabled="!associations.selectedId">Verwijderen</v-btn>
  </v-btn-group>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Naam</th>
        <th class="text-left">Beschrijving</th>
        <th class="text-left">Oprichting</th>
        <th class="text-left">Ontbinding</th>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="association in associations.all"
          :key="association.id"
          @click="associations.select(association.id)"
          :style="associations.selectedId === association.id ? 'background-color: lightgray' : '' ?? ''"
      >
        <td>{{ association.name }}</td>
        <td>{{ association.description }}</td>
        <td>{{ new Date(association.startDate).toLocaleDateString() }}</td>
        <td>{{ association.stopDate ? new Date(association.stopDate).toLocaleDateString() : '-' }}</td>
      </tr>
    </tbody>
  </v-table>

  <v-divider style="margin-bottom: 1rem" />

  <v-dialog v-model="showForm">
    <v-card class="dialog">
      <v-card-title>{{ !associations.isNew ? 'Vereniging Bewerken: ' + associations.selected?.name : 'Vereniging Aanmaken' }}</v-card-title>
      <association-form @submit="showForm = false" />
      <v-btn prepend-icon="mdi-close" flat color="grey" @click="showForm = false">Sluiten</v-btn>
    </v-card>
  </v-dialog>

  <v-card v-if="associations.selectedId" class="card" variant="flat">
    <v-card-title>{{ associations.selected.name }}</v-card-title>
    <v-table>
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
          <td>{{ new Date(associations.selected.startDate).toDateString() }}</td>
        </tr>
        <tr>
          <td>Ontbindingsdatum</td>
          <td>{{ new Date(associations.selected.stopDate).toDateString() }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-tabs v-model="tab" bg-color="orange" grow>
      <v-tab value="memberTypes">Lid Typen</v-tab>
      <v-tab value="groupTypes">Groep Typen</v-tab>
      <v-tab value="groupSubtypes">Groep Subtypen</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="memberTypes">
        <MemberTypeTable />
      </v-window-item>
      <v-window-item value="groupTypes">
        <GroupTypeTable />
      </v-window-item>
      <v-window-item value="groupSubtypes">
      </v-window-item>
    </v-window>
  </v-card>

  <v-card-title v-else>Klik op een vereniging om details te zien.</v-card-title>
</template>

<script setup lang="ts">
import {useAssociationStore} from "~/stores/useStore";
import {reset} from "@formkit/vue";
import MemberTypeTable from "~/components/association/MemberTypeTable.vue";
import GroupTypeTable from "~/components/association/GroupTypeTable.vue";

const associations = useAssociationStore();
await associations.loadAll();

const showForm = ref(false);
const tab = ref();

function openForm(isNew: boolean) {
  showForm.value = false;
  if (isNew) {
    associations.select(null);
    reset('associationForm');
  }
  showForm.value = true;
}
</script>

<style scoped lang="sass">
.card
  margin: 1rem
  padding-bottom: 1rem
  display: flex
  flex-direction: column
  border: solid darkgray 1px

.dialog
  padding: 1rem
  max-width: 1000px
  margin: auto

.type
  margin: 0 1rem 0 0
</style>