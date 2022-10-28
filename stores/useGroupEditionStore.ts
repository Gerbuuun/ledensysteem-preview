import {createStore} from "~/stores/createStore";

export const useGroupEditionStore = createStore<GroupEdition>({
  id: 'groupEditions',
  base: 'groups/editions',
  single: 'groups/edition',
  hasFindOneEndpoint: false,
});