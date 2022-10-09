<template>
  <v-card class="modal" flat>
    <FormKit
        id="memberForm"
        type="form"
        submit-label="Opslaan"
        @submit="submit"
    >
      <div class="form">
        <FormKit
            type="text"
            label="Initialen"
            name="initials"
            :value="members.selected.initials"
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
            placeholder="+316XXXXXXXX"
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
            :options="[{ value: 'Male', label: 'Man' }, { value: 'Female', label: 'Vrouw' }]"
        />
        <FormKit
            type="date"
            label="Geboortedatum"
            name="birthday"
            :value="members.selected.birthday"
            validation="required"
        />
        <FormKit
            v-if="!members.selectedId"
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            placeholder="Selecteer een vereniging"
            :options="associationOptions"
            @change="filterMemberTypes"
        />
        <FormKit
            v-if="!members.selectedId"
            type="select"
            label="Lid-type"
            name="memberTypeId"
            validation="required"
            placeholder="Selecteer een lid-type"
            :options="memberTypeOptions"
        />
        <FormKit
            v-if="!members.selectedId"
            type="date"
            label="Lid sinds"
            name="startDate"
            validation="required"
        />
        <FormKit
            v-if="!members.selectedId"
            type="date"
            label="Lid tot"
            name="stopDate"
        />
      </div>
    </FormKit>
  </v-card>
</template>

<script setup lang="ts">
import {useAssociationStore, useMemberStore, useMemberTypeStore} from "~/stores/useStore";
import {computed, ref} from "@vue/reactivity";

const members = useMemberStore();
const types = useMemberTypeStore();
const associations = useAssociationStore();
await members.loadAll();
await types.loadAll();
await associations.loadAll();
await associations.loadMany(associations.ids);
const associationOptions = computed<{ value: string, label: string }[]>(() => associations.all.map(a => ({ value: a.id, label: a.name })));
const memberTypeOptions = ref<{ value: string, label: string, attrs?: any }[]>([{ value: null, label: 'Selecteer eerst een vereniging', attrs: { disabled: true } }]);

function filterMemberTypes(event) {
  associations.select(event.target.value);
  memberTypeOptions.value = associations.selected.memberTypes.map(t => ({ value: t.id, label: t.name }));
}

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

async function submit(data: Association) {
  await associations.submit(data);
  emit('submit');
}
</script>

<style scoped lang="sass">
.modal
  width: 100%
  padding: 1rem

.form
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-template-rows: repeat(2, 1fr)
  grid-column-gap: 1rem
  grid-row-gap: 0

.input
  max-width: 100% !important
</style>