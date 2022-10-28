<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/groepen`)"><Icon name="mdi:chevron-left"/>Terug naar groepen</button>
    <Card>
      <FormKit
          id="groupForm"
          type="form"
          :actions="false"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Naam"
            name="name"
            validation="required"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
        />
        <FormKit
            type="date"
            label="Oprichtingsdatum"
            name="startDate"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Laatst Actief"
            name="lastActive"
            max="9999-12-31"
        />
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            @change="associations.select($event.target.value)"
        >
          <option value="" selected disabled>Selecteer een vereniging</option>
          <option v-for="a in associations.all" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Groep-type"
            name="groupTypeId"
            validation="required"
            @change="types.select($event.target.value)"
        >
          <option value="" selected disabled>Selecteer een groep-type</option>
          <option v-for="a in types.all.filter(t => t.associationId === associations.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Groep-subtype"
            name="groupSubtypeId"
        >
          <option value="" selected>Geen</option>
          <option v-for="a in subtypes.all.filter(t => t.associationId === associations.selectedId && t.groupTypeId === types.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="submit"
            label="Opslaan"
            outer-class="$reset col-span-2"
        />
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {navigateTo} from "#app";
import {useGroupStore} from "~/stores/useGroupStore";
import {useGroupTypeStore} from "~/stores/useGroupTypeStore";
import {useGroupSubtypeStore} from "~/stores/useGroupSubtypeStore";
import {useAssociationStore} from "~/stores/useAssociationStore";
import {useMemberStore} from "~/stores/useMemberStore";

const groups = useGroupStore();
const types = useGroupTypeStore();
const subtypes = useGroupSubtypeStore();
const associations = useAssociationStore();
const members = useMemberStore();
const dateConverter = useDateConverter();

await groups.init();
await types.init();
await subtypes.init();
await associations.init();
await members.init();

async function submit(data: Group) {
  if (await groups.create(data)) {
    navigateTo(`/groepen/${groups.selectedId}`);
  }
}
</script>
