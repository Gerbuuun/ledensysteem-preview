import {createStore} from "~/stores/createStore";

export const useGroupSubtypeStore = createStore<GroupSubtype>({
  id: 'groupSubtypes',
  base: 'groups/subtypes',
  single: 'groups/subtype',
  hasFindOneEndpoint: false,
});
