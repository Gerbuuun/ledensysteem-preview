import {createStore} from "~/stores/createStore";

export const useMemberStudyStore = createStore<MemberStudy>({
  id: 'memberStudies',
  base: 'studies',
  single: 'study',
  hasFindOneEndpoint: false,
});