<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug</button>
    <Card>
      <FormKit
          id="memberForm"
          name="memberForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Initialen"
            name="initials"
            :value="members.selected?.initials"
            validation="required"
        />
        <FormKit
            type="text"
            label="Voornaam"
            name="firstName"
            :value="members.selected.firstName"
            validation="required"
        />
        <FormKit
            type="text"
            label="Tussenvoegsel"
            name="insertion"
            :value="members.selected.insertion"
        />
        <FormKit
            type="text"
            label="Achternaam"
            name="lastName"
            :value="members.selected.lastName"
            validation="required"
        />
        <FormKit
            type="email"
            label="Email"
            name="email"
            :value="members.selected.email"
            validation="required"
        />
        <FormKit
            type="tel"
            label="Telefoonnummer"
            name="phoneNumber"
            :value="members.selected.phoneNumber"
            validation="required"
        />
        <FormKit
            type="text"
            label="IBAN"
            name="iban"
            :value="members.selected.iban"
            validation="required"
        />
        <FormKit
            type="text"
            label="Straat"
            name="address"
            :value="members.selected.address"
            validation="required"
        />
        <FormKit
            type="text"
            label="Huisnummer"
            name="number"
            :value="members.selected.number"
            validation="required"
        />
        <FormKit
            type="text"
            label="Plaats"
            name="city"
            :value="members.selected.city"
            validation="required"
        />
        <FormKit
            type="text"
            label="Postcode"
            name="zipcode"
            :value="members.selected.zipcode"
            validation="required"
        />
        <FormKit
            type="text"
            label="Land"
            name="country"
            :value="members.selected.country"
            validation="required"
        />
        <FormKit
            type="select"
            label="Geslacht"
            name="gender"
            :value="members.selected.gender"
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
            :value="dateConverter.toFormkitString(members.selected.birthday)"
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
import {navigateTo, useRoute} from "#app";

const members = useMemberStore();
const dateConverter = useDateConverter();

await members.init();
await members.select(useRoute().params.id as string);

async function submit(data: Member) {
  if (await members.update(data)) {
    navigateTo(`/leden/${members.selectedId}`);
  }
}
</script>