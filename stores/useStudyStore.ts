import {createStore} from "~/stores/createStore";

export const useStudyStore = createStore<Study>({
  id: 'studies',
  base: 'studies/options',
  single: 'studies/option',
  hasFindOneEndpoint: false,
});