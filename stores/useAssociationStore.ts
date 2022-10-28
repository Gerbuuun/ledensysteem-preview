import {createStore} from "~/stores/createStore";

export const useAssociationStore = createStore<Association>({
  id: 'associations',
  base: 'associations',
  single: 'association',
  hasFindOneEndpoint: true,
});
