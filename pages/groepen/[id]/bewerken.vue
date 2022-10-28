<template>
  <div class="grid grid-cols-1 gap-4">
    <button class="btn gap-2" @click="navigateTo(`/groepen/${groups.selectedId}`)"><Icon name="mdi:chevron-left"/>Terug naar groep</button>
    <Card>
      <FormKit
          id="groupForm"
          type="form"
          submit-label="Opslaan"
          @submit="submit"
          form-class="$reset grid grid-cols-2 gap-2"
      >
        <FormKit
            type="text"
            label="Naam"
            name="name"
            :value="groups.selected.name"
            validation="required"
        />
        <FormKit
            type="text"
            label="Beschrijving"
            name="description"
            :value="groups.selected.description"
        />
        <FormKit
            type="checkbox"
            label="Is Actief"
            name="isActive"
            :value="groups.selected.isActive"
        />
        <FormKit
            type="date"
            label="Oprichtingsdatum"
            name="startDate"
            :value="dateConverter.toFormkitString(groups.selected.startDate)"
            max="9999-12-31"
        />
        <FormKit
            type="date"
            label="Laatst Actief"
            name="lastActive"
            :value="dateConverter.toFormkitString(groups.selected.lastActive)"
            max="9999-12-31"
        />
        <FormKit
            type="select"
            label="Vereniging"
            name="associationId"
            validation="required"
            :value="groups.selected.associationId"
            disabled
        >
          <option :value="groups.selected.associationId">{{ associations.selected.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Groep-type"
            name="groupTypeId"
            validation="required"
            :value="groups.selected.groupTypeId"
            @change="types.select($event.target.value)"
        >
          <option value="" selected disabled>Selecteer een groep-type</option>
          <option v-for="a in types.all.filter(t => t.associationId === associations.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
        <FormKit
            type="select"
            label="Groep-subtype"
            name="groupSubtypeId"
            :value="groups.selected.groupSubtypeId"
        >
          <option value="" selected>Geen</option>
          <option v-for="a in subtypes.all.filter(t => t.associationId === associations.selectedId && t.groupTypeId === types.selectedId)" :key="a.id" :value="a.id">{{ a.name }}</option>
        </FormKit>
      </FormKit>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {useDateConverter} from "~/composables/useDateConverter";
import {navigateTo, useRoute} from "#app";
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

await groups.select(useRoute().params.id as string);
await associations.select(groups.selected.associationId);
await types.select(groups.selected.groupTypeId);

async function submit(data: Group) {
  if (await groups.update(data)) {
    navigateTo(`/groepen/${groups.selectedId}`);
  }
}
</script>
