<template>
  <v-btn-group>
    <v-btn @click="openForm(true)" prepend-icon="mdi-plus">Nieuw</v-btn>
    <v-btn @click="openForm(false)" prepend-icon="mdi-pencil" :disabled="!groups.selectedId">Aanpassen</v-btn>
    <v-btn @click="groups.delete" prepend-icon="mdi-delete" :disabled="!groups.selectedId">Verwijderen</v-btn>
  </v-btn-group>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">Naam</th>
      <th class="text-left">Beschrijving</th>
      <th class="text-left">Oprichting</th>
      <th class="text-left">Is Actief</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="group in groups.all"
        :key="group.id"
        @click="groups.select(group.id)"
        :style="groups.selectedId === group.id ? 'background-color: lightgray' : '' ?? ''"
    >
      <td>{{ group.name }}</td>
      <td>{{ group.description }}</td>
      <td>{{ new Date(group.startDate).toLocaleDateString() }}</td>
      <td><v-icon v-if="group.isActive">mdi-check</v-icon><v-icon v-else>mdi-delete</v-icon></td>
    </tr>
    </tbody>
  </v-table>

  <v-divider style="margin-bottom: 1rem" />

  <v-dialog v-model="showForm">
    <v-card class="dialog">
      <v-card-title>{{ !groups.isNew ? 'Groep Bewerken: ' + groups.selected?.name : 'Groep Aanmaken' }}</v-card-title>
      <GroupForm @submit="showForm = false" />
      <v-btn prepend-icon="mdi-close" flat color="grey" @click="showForm = false">Sluiten</v-btn>
    </v-card>
  </v-dialog>

  <v-card v-if="groups.selectedId" class="card" variant="outlined">
    <v-card-title>{{ groups.selected.name }}</v-card-title>
    <v-table>
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
        <td>{{ new Date(groups.selected.startDate).toDateString() }}</td>
      </tr>
      <tr>
        <td>Laatst Actief</td>
        <td>{{ new Date(groups.selected.lastActive).toDateString() }}</td>
      </tr>
      <tr>
        <td>Groep Type</td>
        <td>{{ groups.selected.type.name }}</td>
      </tr>
      <tr>
        <td>Vereniging</td>
        <td>{{ groups.selected.association.name }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-card-title v-else>Klik op een groep om details te zien.</v-card-title>
</template>

<script setup lang="ts">
import {useGroupStore} from "~/stores/useStore";
import {reset} from "@formkit/vue";

const groups = useGroupStore();
await groups.loadAll();

const showForm = ref(false);

function openForm(isNew: boolean) {
  showForm.value = false;
  if (isNew) {
    groups.select(null);
    reset('associationForm');
  }
  showForm.value = true;
}
</script>

<style scoped lang="sass">
.card
  margin: 0 1rem
  padding: 1rem
  display: flex
  flex-direction: column

.dialog
  padding: 1rem
  width: 1000px
  margin: auto

.type
  margin: 0 1rem 0 0
</style>