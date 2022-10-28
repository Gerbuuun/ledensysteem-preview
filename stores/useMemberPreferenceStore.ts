import {createStore} from "~/stores/createStore";

export const useMemberPreferenceStore = createStore<MemberPreference>({
  id: 'memberPreferences',
  base: 'preferences',
  single: 'preference',
  hasFindOneEndpoint: false,
});