<template>
  <v-card style="overflow: scroll">
    <v-tabs v-model="tab" bg-color="blue" grow>
      <v-tab value="association" prepend-icon="mdi-domain">Vereniging</v-tab>
      <v-tab value="groups" prepend-icon="mdi-account-group">Groep</v-tab>
      <v-tab value="members" prepend-icon="mdi-account">Lid</v-tab>
      <v-tab value="preferences" prepend-icon="mdi-heart">Voorkeur</v-tab>
      <v-tab value="qualifications" prepend-icon="mdi-check-circle">Kwalificatie</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="association">
        <AssociationTable />
      </v-window-item>
      <v-window-item value="groups">
        <GroupTable />
      </v-window-item>
      <v-window-item value="members">
        <MemberTable />
      </v-window-item>
      <v-window-item value="preferences">

      </v-window-item>
      <v-window-item value="qualifications">

      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
const tab = ref();
</script>