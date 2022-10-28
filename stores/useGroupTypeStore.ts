import {createStore} from "~/stores/createStore";

export const useGroupTypeStore = createStore<GroupType>({
  id: 'groupTypes',
  base: 'groups/types',
  single: 'groups/type',
  hasFindOneEndpoint: false,
});
