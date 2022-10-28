import {createStore} from "~/stores/createStore";

export const useGroupMembershipStore = createStore<GroupMembership>({
  id: 'groupMemberships',
  base: 'groups/memberships',
  single: 'groups/membership',
  hasFindOneEndpoint: false,
});