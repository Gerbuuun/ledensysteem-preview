<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo('/leden')"><Icon name="mdi:chevron-left"/>Leden</button>
    <Card>
      <button class="btn gap-2" @click="randomPerson"><Icon name="mdi:dice-3"/>Willekeurig persoon</button>
      <FormKit
          id="memberForm"
          name="memberForm"
          type="form"
          submit-label="Nieuw Lid Aanmaken"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Initialen"
            name="initials"
            validation="required"
        />
        <FormKit
            type="text"
            label="Voornaam"
            name="firstName"
            validation="required"
        />
        <FormKit
            type="text"
            label="Tussenvoegsel"
            name="insertion"
        />
        <FormKit
            type="text"
            label="Achternaam"
            name="lastName"
            validation="required"
        />
        <FormKit
            type="email"
            label="Email"
            name="email"
            validation="required"
        />
        <FormKit
            type="tel"
            label="Telefoonnummer"
            name="phoneNumber"
            validation="required"
        />
        <FormKit
            type="text"
            label="IBAN"
            name="iban"
            validation="required"
        />
        <FormKit
            type="text"
            label="Straat"
            name="address"
            validation="required"
        />
        <FormKit
            type="text"
            label="Huisnummer"
            name="number"
            validation="required"
        />
        <FormKit
            type="text"
            label="Plaats"
            name="city"
            validation="required"
        />
        <FormKit
            type="text"
            label="Postcode"
            name="zipcode"
            validation="required"
        />
        <FormKit
            type="text"
            label="Land"
            name="country"
            validation="required"
        />
        <FormKit
            type="select"
            label="Geslacht"
            name="gender"
            validation="required"
        >
          <option value="" selected disabled>Selecteer geslacht</option>
          <option value="Male">Man</option>
          <option value="Female">Vrouw</option>
        </FormKit>
        <FormKit
            type="date"
            label="Geboortedatum"
            name="birthday"
            validation="required"
            max="9999-12-31"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useMemberStore} from "~/stores/useMemberStore";
import {useDateConverter} from "~/composables/useDateConverter";
import {faker} from "@faker-js/faker";
import {reset} from "@formkit/vue";
import {navigateTo} from "#app";

const members = useMemberStore();
const dateConverter = useDateConverter();

async function submit(data: Member) {
  if (await members.create(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}

function randomPerson() {
  reset('memberForm', {
    title: undefined,
    initials: faker.random.alpha().toUpperCase(),
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
    birthday: dateConverter.toFormkitString(faker.date.birthdate().toString()),
  });
}
</script>