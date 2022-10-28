import {createStore} from "~/stores/createStore";

export const useMemberStore = createStore<Member>({
  id: 'members',
  base: 'members',
  single: 'member',
  hasFindOneEndpoint: true,
});
