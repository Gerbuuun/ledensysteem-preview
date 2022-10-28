import {createStore} from "~/stores/createStore";

export const useMemberQualificationStore = createStore<MemberQualification>({
  id: 'memberQualifications',
  base: 'qualifications',
  single: 'qualification',
  hasFindOneEndpoint: false,
});