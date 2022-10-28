import {createStore} from "~/stores/createStore";

export const useMemberTypeStore = createStore<MemberType>({
  id: 'memberTypes',
  base: 'members/types',
  single: 'members/type',
  hasFindOneEndpoint: false,
});
