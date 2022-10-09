<template>
  <v-btn-group>
    <v-btn @click="openForm(true)" prepend-icon="mdi-plus">Nieuw</v-btn>
    <v-btn @click="openForm(false)" prepend-icon="mdi-pencil" :disabled="!memberTypes.selectedId">Aanpassen</v-btn>
    <v-btn @click="memberTypes.delete" prepend-icon="mdi-delete" :disabled="!memberTypes.selectedId">Verwijderen</v-btn>
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
        v-for="memberType in memberTypes.all.filter(t => t.associationId === associations.selectedId)"
        :key="memberType.id"
        @click="memberTypes.select(memberType.id)"
        :style="memberTypes.selectedId === memberType.id ? 'background-color: lightgray' : '' ?? ''"
    >
      <td>{{ memberType.name }}</td>
      <td>{{ memberType.plural }}</td>
      <td>{{ memberType.description }}</td>
    </tr>
    </tbody>
  </v-table>

  <v-divider style="margin-bottom: 1rem" />

  <v-dialog v-model="showForm">
    <v-card class="dialog">
      <v-card-title>{{ !memberTypes.isNew ? 'Lid-type Bewerken: ' + memberTypes.selected?.name : 'Lid-type Aanmaken' }}</v-card-title>
      <MemberTypeForm @submit="showForm = false" />
      <v-btn prepend-icon="mdi-close" flat color="grey" @click="showForm = false">Sluiten</v-btn>
    </v-card>
  </v-dialog>

  <v-card v-if="memberTypes.selectedId" class="card" variant="outlined">
    <v-card-title>{{ memberTypes.selected.name }}</v-card-title>
    <v-table>
      <tbody>
      <tr>
        <td>ID</td>
        <td>{{ memberTypes.selected.id }}</td>
      </tr>
      <tr>
        <td>Naam</td>
        <td>{{ memberTypes.selected.name }}</td>
      </tr>
      <tr>
        <td>Meervoud</td>
        <td>{{ memberTypes.selected.plural }}</td>
      </tr>
      <tr>
        <td>Beschrijving</td>
        <td>{{ memberTypes.selected.description }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-card-title v-else>Klik op een lid type om details te zien.</v-card-title>
</template>

<script setup lang="ts">
import {useAssociationStore, useMemberTypeStore} from "~/stores/useStore";
import {reset} from "@formkit/vue";
import MemberTypeForm from "~/components/association/MemberTypeForm.vue";

const memberTypes = useMemberTypeStore();
const associations = useAssociationStore();
await memberTypes.loadAll();

const showForm = ref(false);

function openForm(isNew: boolean) {
  if (isNew) {
    memberTypes.select(null);
    reset('memberTypeForm');
  }
  showForm.value = true;
}
</script>

<style scoped lang="sass">
.card
  margin: 0 1rem
  display: flex
  flex-direction: column

.dialog
  padding: 1rem
  width: 50vw
  align-self: center

.type
  margin: 0 1rem 0 0
</style>