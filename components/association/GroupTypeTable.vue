<template>
  <v-btn-group>
    <v-btn @click="openForm(true)" prepend-icon="mdi-plus">Nieuw</v-btn>
    <v-btn @click="openForm(false)" prepend-icon="mdi-pencil" :disabled="!groupTypes.selectedId">Aanpassen</v-btn>
    <v-btn @click="groupTypes.delete" prepend-icon="mdi-delete" :disabled="!groupTypes.selectedId">Verwijderen</v-btn>
  </v-btn-group>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">Naam</th>
      <th class="text-left">Meervoud</th>
      <th class="text-left">Beschrijving</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="groupType in groupTypes.all.filter(t => t.associationId === associations.selectedId)"
        :key="groupType.id"
        @click="groupTypes.select(groupType.id)"
        :style="groupTypes.selectedId === groupType.id ? 'background-color: lightgray' : '' ?? ''"
    >
      <td>{{ groupType.name }}</td>
      <td>{{ groupType.plural }}</td>
      <td>{{ groupType.description }}</td>
    </tr>
    </tbody>
  </v-table>

  <v-divider style="margin-bottom: 1rem" />

  <v-dialog v-model="showForm">
    <v-card class="card">
      <v-card-title>{{ !groupTypes.isNew ? 'Groep-type Bewerken: ' + groupTypes.selected?.name : 'Groep-type Aanmaken' }}</v-card-title>
      <GroupTypeForm @submit="showForm = false" />
      <v-btn prepend-icon="mdi-close" flat color="grey" @click="showForm = false">Sluiten</v-btn>
    </v-card>
  </v-dialog>

  <v-card v-if="groupTypes.selectedId" class="card" variant="outlined">
    <v-card-title>{{ groupTypes.selected.name }}</v-card-title>
    <v-table>
      <tbody>
      <tr>
        <td>ID</td>
        <td>{{ groupTypes.selected.id }}</td>
      </tr>
      <tr>
        <td>Naam</td>
        <td>{{ groupTypes.selected.name }}</td>
      </tr>
      <tr>
        <td>Meervoud</td>
        <td>{{ groupTypes.selected.plural }}</td>
      </tr>
      <tr>
        <td>Beschrijving</td>
        <td>{{ groupTypes.selected.description }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-card-title v-else>Klik op een groep type om details te zien.</v-card-title>
</template>

<script setup lang="ts">
import {useAssociationStore, useGroupTypeStore, useMemberTypeStore} from "~/stores/useStore";
import {reset} from "@formkit/vue";
import GroupTypeForm from "~/components/association/GroupTypeForm.vue";

const groupTypes = useGroupTypeStore();
const associations = useAssociationStore();
await groupTypes.loadAll();

const showForm = ref(false);

function openForm(isNew: boolean) {
  if (isNew) {
    groupTypes.select(null);
    reset('groupTypeForm');
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

.type
  margin: 0 1rem 0 0
</style>