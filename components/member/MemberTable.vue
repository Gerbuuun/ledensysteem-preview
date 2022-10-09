<template>
  <v-btn-group>
    <v-btn @click="openForm(true)" prepend-icon="mdi-plus">Nieuw</v-btn>
    <v-btn @click="generateRandomLid" prepend-icon="mdi-plus">Random</v-btn>
    <v-btn @click="openForm(false)" prepend-icon="mdi-pencil" :disabled="!members.selectedId">Aanpassen</v-btn>
    <v-btn @click="members.delete" prepend-icon="mdi-delete" :disabled="!members.selectedId">Verwijderen</v-btn>
  </v-btn-group>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">Naam</th>
      <th class="text-left">Geslacht</th>
      <th class="text-left">Geboortedatum</th>
      <th class="text-left">Email</th>
      <th class="text-left">Telefoon</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="member in members.all"
        :key="member.id"
        @click="members.select(member.id)"
        :style="members.selected?.id === member.id ? 'background-color: lightgray' : '' ?? ''"
    >
      <td>{{ member.firstName }} {{ member.insertion ?? '' }} {{ member.lastName }}</td>
      <td>{{ member.gender === 'Male' ? 'Man' : 'Vrouw' }}</td>
      <td>{{ new Date(member.birthday).toLocaleDateString() }}</td>
      <td>{{ member.email }}</td>
      <td>{{ member.phoneNumber }}</td>
    </tr>
    </tbody>
  </v-table>

  <v-divider style="margin-bottom: 1rem" />

  <v-dialog v-model="showForm">
    <v-card class="dialog">
      <v-card-title>{{ !members.isNew ? 'Lid Bewerken: ' + members.selected?.name : 'Lid Aanmaken' }}</v-card-title>
      <MemberForm @submit="showForm = false" />
      <v-btn prepend-icon="mdi-close" flat color="grey" @click="showForm = false">Sluiten</v-btn>
    </v-card>
  </v-dialog>

  <v-card v-if="members.selectedId" class="card" variant="outlined">
    <v-card-title>{{ members.selected.firstName }} {{ members.selected.insertion ?? ''}} {{ members.selected.lastName }}</v-card-title>
    <v-table>
      <tbody>
      <tr>
        <td>ID</td>
        <td>{{ members.selected.id }}</td>
      </tr>
      <tr>
        <td>Initialen</td>
        <td>{{ members.selected.initials }}</td>
      </tr>
      <tr>
        <td>Naam</td>
        <td>{{ members.selected.firstName }} {{ members.selected.insertion ?? ''}} {{ members.selected.lastName }}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ members.selected.email }}</td>
      </tr>
      <tr>
        <td>Telefoon</td>
        <td>{{ members.selected.phoneNumber }}</td>
      </tr>
      <tr>
        <td>Adres</td>
        <td>{{ members.selected.address }} {{ members.selected.number }} {{ members.selected.city }}, {{ members.selected.country }}</td>
      </tr>
      <tr>
        <td>Postcode</td>
        <td>{{ members.selected.zipcode }}</td>
      </tr>
      <tr>
        <td>IBAN</td>
        <td>{{ members.selected.iban }}</td>
      </tr>
      <tr>
        <td>Geboortedatum</td>
        <td>{{ new Date(members.selected.birthday).toDateString() }}</td>
      </tr>
      <tr>
        <td>Geslacht</td>
        <td>{{ members.selected.gender === 'Male' ? 'Man' : 'Vrouw' }}</td>
      </tr>
      <tr>
        <td>Lidmaatschappen</td>
        <td>
          <span v-for="t in members.selected.associations" :key="t.name" class="type">{{ t.association.name }}</span>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-card-title v-else>Klik op een lid om details te zien.</v-card-title>
</template>

<script setup lang="ts">
import {useAssociationStore, useMemberStore} from "~/stores/useStore";
import {reset} from "@formkit/vue";
import {faker} from "@faker-js/faker";

const members = useMemberStore();
const associations = useAssociationStore();
await associations.loadMany(associations.ids);
await members.loadAll();

const showForm = ref(false);

function openForm(isNew: boolean) {
  showForm.value = false;
  if (isNew) {
    members.select(null);
    reset('memberForm');
  }
  showForm.value = true;
}

async function generateRandomLid() {
  faker.setLocale('nl');
  members.select(null);
  const associationId = faker.helpers.arrayElement(associations.ids);
  const data = {
    title: undefined,
    initials: 'T.E.S.T',
    firstName: faker.name.firstName(),
    insertion: faker.helpers.maybe(() => faker.helpers.arrayElement(['van', 'de', 'het', 'van de', 'van het']), { probability: 0.5 }),
    lastName: faker.name.lastName(),
    address: faker.address.street(),
    number: faker.address.buildingNumber(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    country: faker.address.country(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number('+316########'),
    gender: faker.helpers.arrayElement(['Male', 'Female']),
    iban: faker.finance.iban(),
    birthday: faker.date.birthdate(),
    associationId: associationId,
    startDate: faker.date.past(100),
    memberTypeId: faker.helpers.arrayElement(associations.entities[associationId].memberTypes.map(t => t.id)),
  }
  await members.submit(data);
}
</script>

<style scoped lang="sass">
.card
  margin: 1rem
  padding: 1rem
  display: flex
  flex-direction: column

.dialog
  padding: 1rem
  width: 1000px
  margin: auto
  overflow: scroll

.type
  margin: 0 1rem 0 0
</style>