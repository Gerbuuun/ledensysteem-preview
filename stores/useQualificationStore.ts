import {createStore} from "~/stores/createStore";

export const useQualificationStore = createStore<Qualification>({
  id: 'qualifications',
  base: 'qualifications/options',
  single: 'qualifications/option',
  hasFindOneEndpoint: false,
});