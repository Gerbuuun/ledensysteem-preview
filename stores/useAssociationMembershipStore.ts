import {createStore} from "~/stores/createStore";

export const useAssociationMembershipStore = createStore<AssociationMembership>({
  id: 'associationMemberships',
  base: 'associations/memberships',
  single: 'associations/membership',
  hasFindOneEndpoint: false,
});
