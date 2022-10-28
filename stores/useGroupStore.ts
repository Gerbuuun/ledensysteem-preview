import {createStore} from "~/stores/createStore";

export const useGroupStore = createStore<Group>({
  id: 'groups',
  base: 'groups',
  single: 'group',
  hasFindOneEndpoint: true,
});