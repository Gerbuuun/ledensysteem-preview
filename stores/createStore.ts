import {defineStore} from "pinia";
import {useHttpClient} from "~/composables/useHttpClient";
import useAlertStore from "~/stores/useAlertStore";

export const createStore = <T extends { id?: string }>(params: {
  id: string,
  base: string,
  single: string,
  hasFindOneEndpoint: boolean,
  onCreate?: (response: T) => void,
  onUpdate?: (response: T) => void,
  onDelete?: (response: T) => void,
}) => {

  interface StoreState {
    ids: string[];
    loadedIds: string[],
    entities: Map<string, T>;
    selectedId: string | null;
    isLoaded: boolean;
  }

  return defineStore(params.id, {
    state: (): StoreState => ({
      ids: [],
      loadedIds: [],
      entities: new Map<string, T>(),
      selectedId: null,
      isLoaded: false,
    }),

    getters: {
      all: (state): T[] => state.ids.map(id => state.entities.get(id)),
      selected: (state): T | null => (state.selectedId && state.entities.get(state.selectedId)) || null,
    },

    actions: {
      async fetchData() {
        const response = await useHttpClient().apiRequest<T[]>(params.base);
        if (response) {
          this.ids = response.map(a => a.id);
          response.forEach(a => this.entities.set(a.id, a));
        }
      },

      async init() {
        if (this.isLoaded) return;
        await this.fetchData();
        this.loaded = true;
      },

      async reload() {
        this.selectedId = null;
        this.loadedIds = [];
        await this.fetchData();
        this.loaded = true;
      },

      async loadSelected() {
        if (this.loadedIds.includes(this.selectedId)) return;
        const response = await useHttpClient().apiRequest<T>(`${params.single}/${this.selectedId}`);
        if (response) {
          this.entities.set(response.id, response);
          this.loadedIds.push(response.id);
        }
      },

      async create(data: T): Promise<boolean> {
        Object.keys(data).forEach(k => { if (data[k] === '') delete data[k] });
        const response = await useHttpClient().apiRequest<T>(params.base, { body: data, method: 'POST' });
        if (response) {
          this.entities.set(response.id, response);
          this.ids.push(response.id);
          this.selectedId = response.id;
          useAlertStore().createSuccessAlert('Aanmaken was succesvol!');

          if (params.onCreate) params.onCreate(response);

          return true;
        }
        return false;
      },

      async update(data: T): Promise<boolean> {
        Object.keys(data).forEach(k => { if (data[k] === '') data[k] = null });
        const response = await useHttpClient().apiRequest<T>(`${params.single}/${this.selectedId}`, { body: data,  method: 'PATCH' });
        if (response) {
          this.entities.set(this.selectedId, response);
          useAlertStore().createSuccessAlert('Bewerken was succesvol!');

          if (params.onUpdate) params.onUpdate(response);

          return true;
        }
        return false;
      },

      async delete(): Promise<boolean> {
        const response = await useHttpClient().apiRequest<T>(`${params.single}/${this.selectedId}`, { method: 'DELETE' });
        if (response) {
          this.selectedId = null;
          this.ids.splice(this.ids.indexOf(response.id), 1);
          this.entities.delete(response.id);
          useAlertStore().createSuccessAlert('Verwijderen was succesvol!');

          if (params.onDelete) params.onDelete(response);

          return true;
        }
        return false;
      },

      select(id: string) {
        this.selectedId = id;
        if (this.selectedId && params.hasFindOneEndpoint) this.loadSelected();
      },
    },
  });
}
