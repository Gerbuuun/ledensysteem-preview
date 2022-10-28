<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo('/leden')"><Icon name="mdi:chevron-left"/>Terug naar Leden</button>
    <Card>
      <h2 class="text-3xl">{{ members.selected.firstName }} {{ members.selected.insertion ?? ''}} {{ members.selected.lastName }}</h2>
      <table class="table table-normal w-full">
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
          <td>{{ members.selected.address }} {{ members.selected.number }}, {{ members.selected.city }}</td>
        </tr>
        <tr>
          <td>Land</td>
          <td>{{ members.selected.country }}</td>
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
          <td>{{ dateConverter.toDateString(members.selected.birthday) }}</td>
        </tr>
        <tr>
          <td>Geslacht</td>
          <td>{{ members.selected.gender === 'Male' ? 'Man' : 'Vrouw' }}</td>
        </tr>
        </tbody>
      </table>

      <div class="btn-group">
        <button class="btn gap-2" @click="navigateTo(`/leden/${members.selectedId}/bewerken`)"><Icon name="mdi:pencil"/>Aanpassen</button>
        <button class="btn gap-2" @click="deleteMember"><Icon name="mdi:delete"/>Verwijderen</button>
      </div>

      <div class="divider" />

      <h2 class="card-title">Lidmaatschappen</h2>
      <EntityTable
          :headings="['Vereniging', 'Lid Type', 'Lid sinds', 'Lid tot']"
          :store="associationMemberships"
          :entities="associationMemberships.all.filter(a => a.memberId === members.selectedId)"
          :select-link="{ path: `/verenigingen/lidmaatschappen/${associationMemberships.selectedId}/bewerken` }"
          :form-link="{ path: '/verenigingen/lidmaatschappen/nieuw', query: { id: members.selected.id } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.association.name }}</td>
        <td>{{ entity.memberType.name }}</td>
        <td>{{ dateConverter.toDateString(entity.startDate) }}</td>
        <td>{{ dateConverter.toDateString(entity.stopDate) }}</td>
      </EntityTable>

      <div class="divider" />

      <h2 class="card-title">Groepen</h2>
      <EntityTable
          :headings="['Groep', 'Groep Editie', 'Functie', 'Sinds', 'Tot']"
          :store="groupMemberships"
          :entities="groupMemberships.all.filter(m => m.memberId === members.selectedId)"
          :select-link="{ path: `/groepen/lidmaatschappen/${groupMemberships.selectedId}/bewerken`, query: { from: 'leden' } }"
          :form-link="{ path: '/groepen/lidmaatschappen/nieuw', query: { id: members.selectedId, from: 'leden' } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.group.name }}</td>
        <td>{{ entity.edition?.name ?? '-' }}</td>
        <td>{{ entity.function ?? '-' }}</td>
        <td>{{ dateConverter.toDateString(entity.startDate) }}</td>
        <td>{{ dateConverter.toDateString(entity.stopDate) }}</td>
      </EntityTable>

      <div class="divider" />

      <h2 class="card-title">Studies</h2>
      <EntityTable
          :headings="['Studie', 'Niveau', 'Instituut', 'Start', 'Stop']"
          :store="studies"
          :entities="studies.all.filter(s => s.memberId === members.selectedId)"
          :select-link="{ path: `/studies/${studies.selectedId}/bewerken` }"
          :form-link="{ path: '/studies/nieuw', query: { id: members.selected.id } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.study.name }}</td>
        <td>{{ entity.study.level }}</td>
        <td>{{ entity.study.institution }}</td>
        <td>{{ dateConverter.toDateString(entity.startDate) }}</td>
        <td>{{ dateConverter.toDateString(entity.stopDate) }}</td>
      </EntityTable>

      <div class="divider" />

      <h2 class="card-title">Voorkeuren</h2>
      <EntityTable
          :headings="['Naam', 'Voorkeur']"
          :store="preferences"
          :entities="preferences.all.filter(p => p.memberId === members.selectedId)"
          :select-link="{ path: `/voorkeuren/${preferences.selectedId}/bewerken` }"
          :form-link="{ path: '/voorkeuren/nieuw', query: { id: members.selected.id } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.preference.name }}</td>
        <td>{{ entity.value }}</td>
      </EntityTable>

      <div class="divider" />

      <h2 class="card-title">Kwalificaties</h2>
      <EntityTable
          :headings="['Naam', 'Sinds', 'Tot']"
          :store="qualifications"
          :entities="qualifications.all.filter(q => q.memberId === members.selectedId)"
          :select-link="{ path: `/kwalificaties/${qualifications.selectedId}/bewerken` }"
          :form-link="{ path: '/kwalificaties/nieuw', query: { id: members.selected.id } }"
          v-slot="{ entity }"
      >
        <td>{{ entity.qualification.name }}</td>
        <td>{{ dateConverter.toDateString(entity.startDate) }}</td>
        <td>{{ dateConverter.toDateString(entity.stopDate) }}</td>
      </EntityTable>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {navigateTo, useRoute} from "#app";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useMemberStore} from "~/stores/useMemberStore";
import {useAssociationMembershipStore} from "~/stores/useAssociationMembershipStore";
import {useGroupMembershipStore} from "~/stores/useGroupMembershipStore";
import {useMemberStudyStore} from "~/stores/useMemberStudyStore";
import {useMemberPreferenceStore} from "~/stores/useMemberPreferenceStore";
import {useMemberQualificationStore} from "~/stores/useMemberQualificationStore";

const associations = useAssociationStore();
const members = useMemberStore();
const associationMemberships = useAssociationMembershipStore();
const groupMemberships = useGroupMembershipStore();
const studies = useMemberStudyStore();
const preferences = useMemberPreferenceStore();
const qualifications = useMemberQualificationStore();
const dateConverter = useDateConverter();

await associations.init();
await associationMemberships.init();
await members.init();
await groupMemberships.init();
await studies.init();
await preferences.init();
await qualifications.init();

await members.select(useRoute().params.id as string);

async function deleteMember() {
  await navigateTo('/leden');
  await members.delete();
}
</script>
