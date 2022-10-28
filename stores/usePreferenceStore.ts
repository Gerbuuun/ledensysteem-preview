import {createStore} from "~/stores/createStore";

export const usePreferenceStore = createStore<Preference>({
  id: 'preferences',
  base: 'preferences/options',
  single: 'preferences/option',
  hasFindOneEndpoint: false,
});