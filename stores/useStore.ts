import {defineStore} from "pinia";
import {useHttpClient} from "~/composables/useHttpClient";
import useAlertStore from "~/stores/useAlertStore";
import {UnwrapRef} from "@vue/runtime-core";

interface BaseEntity {
  id?: string;
}

const createStore = <T extends BaseEntity>(id: string, endpoints: { base: string, single: string }) => {
  interface StoreState {
    ids: string[];
    entities: { [id: string]: T };
    selectedId: string | null;
    newEntity: T;
  }

  return defineStore(id, {
    state: (): StoreState => ({
      ids: [],
      entities: {},
      selectedId: null,
      newEntity: {} as T,
    }),

    getters: {
      all: (state): T[] => state.ids.map(id => state.entities[id]),
      selected: (state): T | UnwrapRef<T> => (state.selectedId && state.entities[state.selectedId]) || state.newEntity,
      isNew: (state): boolean => !state.selectedId,
    },

    actions: {
      async loadAll() {
        const data = await useHttpClient().apiRequest<T[]>(endpoints.base);
        if (data) {
          this.ids = data.map(a => a.id);
          data.forEach(a => this.entities[a.id] = a);
        }
      },

      async loadSelected() {
        const data = await useHttpClient().apiRequest<T>(`${endpoints.single}/${this.selectedId}`);
        if (data) {
          this.entities[data.id] = data;
        }
      },

      async loadMany(ids: string[]) {
        for (const id of ids) {
          const data = await useHttpClient().apiRequest<T>(`${endpoints.single}/${id}`);
          if (data) {
            this.entities[data.id] = data;
          }
        }
      },

      async create() {
        const data = await useHttpClient().apiRequest<T>(endpoints.base,{ data: this.newEntity, method: 'POST' });
        if (data) {
          this.entities[data.id] = data;
          this.ids.push(data.id);
          this.newEntity = {};
          this.selectedId = null;
          useAlertStore().createSuccessAlert('Aanmaken was succesvol!');
        }
      },

      async update() {
        const data = await useHttpClient().apiRequest<T>(`${endpoints.single}/${this.selectedId}`, { data: this.selected,  method: 'PATCH' });
        if (data) {
          this.entities[this.selectedId] = data;
          this.selectedId = null;
          useAlertStore().createSuccessAlert('Bewerken was succesvol!');
        }
      },

      async delete() {
        const data = await useHttpClient().apiRequest<T>(`${endpoints.single}/${this.selectedId}`, {method: 'DELETE'});
        if (data) {
          this.selectedId = null;
          this.ids.splice(this.ids.indexOf(data.id), 1);
          delete this.entities[data.id];
          useAlertStore().createSuccessAlert('Verwijderen was succesvol!');
        }
      },

      async submit(data) {
        if (this.isNew) {
          this.newEntity = data;
          await this.create();
        } else {
          this.entities[this.selectedId] = data;
          await this.update();
        }
      },

      select(id: string) {
        this.selectedId = id;
        if (this.selectedId) this.loadSelected();
      },
    },
  });
}

export const useAssociationStore  = createStore<Association> ('associations',  { base: 'associations',    single: 'association' });
export const useMemberTypeStore   = createStore<MemberType>  ('memberTypes',   { base: 'members/types',   single: 'members/type' });
export const useGroupTypeStore    = createStore<GroupType>   ('groupTypes',    { base: 'groups/types',    single: 'groups/type' });
export const useGroupSubtypeStore = createStore<GroupSubtype>('groupSubtypes', { base: 'groups/subtypes', single: 'groups/subtype' });
export const useGroupStore        = createStore<Group>       ('groups',        { base: 'groups',          single: 'group' });
export const useMemberStore       = createStore<Member>      ('members',       { base: 'members',         single: 'member' });